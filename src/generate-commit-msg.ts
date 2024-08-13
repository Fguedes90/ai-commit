import { getDiffStaged } from './git-utils';
import { ConfigKeys, getConfig } from './config';
import * as vscode from 'vscode';
import * as fs from 'fs-extra';
import { errMsg, infoMsg } from './utils';
import { ChatGPTAPI } from './openai-utils';
import { getMainCommitPrompt } from './prompts';

const generateCommitMessageChatCompletionPrompt = async (diff: string) => {
  const INIT_MESSAGES_PROMPT = await getMainCommitPrompt();
  const chatContextAsCompletionRequest = [...INIT_MESSAGES_PROMPT];

  chatContextAsCompletionRequest.push({
    role: 'user',
    content: diff
  });
  return chatContextAsCompletionRequest;
};

export async function getRepo(arg) {
  const gitApi = vscode.extensions.getExtension('vscode.git').exports.getAPI(1);
  if (typeof arg === 'object' && arg.rootUri) {
    const resourceUri = arg.rootUri;
    const realResourcePath: string = fs.realpathSync(resourceUri!.fsPath);
    let i = 0;
    for (const x of gitApi.repositories) {
      if (
        realResourcePath.startsWith(x.rootUri.fsPath) &&
        x.rootUri.fsPath === gitApi.repositories[i].rootUri.fsPath
      ) {
        return gitApi.repositories[i];
      }
      i++;
    }
  }
  return gitApi.repositories[0];
}

export async function generateCommitMsg(arg) {
  try {
    infoMsg('Starting generateCommitMsg...');
    
    const repo = await getRepo(arg);
    infoMsg(`Repository obtained: ${repo ? 'Yes' : 'No'}`);
    
    const apiKey = getConfig<string>(ConfigKeys.OPENAI_API_KEY);
    infoMsg(`API Key obtained: ${apiKey ? 'Yes' : 'No'}`);

    if (!apiKey) {
      infoMsg('OpenAI API Key Not Set');
      return;
    }

    const diff = await getDiffStaged(repo);
    infoMsg(`Diff obtained, length: ${diff.length}`);

    infoMsg('gitRootPath: ' + repo.rootUri.fsPath);
    const scmInputBox = repo.inputBox as vscode.SourceControlInputBox;
    infoMsg(`SCM Input Box obtained: ${scmInputBox ? 'Yes' : 'No'}`);

    const messages = await generateCommitMessageChatCompletionPrompt(diff);
    infoMsg(`Chat completion prompt generated, messages count: ${messages.length}`);
    
    if (scmInputBox) {
      try {
        infoMsg('Calling ChatGPTAPI...');
        const commitMessage = await ChatGPTAPI(messages);
        if (commitMessage) {
          scmInputBox.value = commitMessage;
          infoMsg('Commit message generated successfully');
        } else {
          errMsg('Failed to generate commit message', 'Empty response from API');
        }
      } catch (err) {
        errMsg('API ERROR: ', err);
        console.error('Full API error:', err);
      }
    } else {
      errMsg('Unable to find the SCM input box.', '');
    }
  } catch (error) {
    errMsg('Error in generateCommitMsg: ', error);
    console.error('Full error in generateCommitMsg:', error);
  }
}
