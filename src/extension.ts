import * as vscode from 'vscode';
import aiCommitController from './ai-commit-controller';
import { updateConfig } from './config';
import { errMsg, infoMsg } from './utils';

let statusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {
  try {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    context.subscriptions.push(statusBarItem);

    const registerCommand = (commandId: string) => {
      const disposable = vscode.commands.registerCommand(commandId, async (arg) => {
        statusBarItem.text = "$(sync~spin) Generating commit message...";
        statusBarItem.show();
        try {
          infoMsg(`Executing command: ${commandId}`);
          await aiCommitController(arg);
          infoMsg(`Command ${commandId} executed successfully`);
        } catch (error) {
          errMsg(`Error executing ${commandId}`, error);
          vscode.window.showErrorMessage(`Failed to generate commit message: ${error.message}`);
        } finally {
          statusBarItem.hide();
        }
      });
      context.subscriptions.push(disposable);
      return disposable;
    };

    const disposable = registerCommand('llm-auto-commit.generateCommitMessage');
    
    if (!disposable) {
      throw new Error('Failed to register command: llm-auto-commit.generateCommitMessage');
    }

    // Create and register the Source Control button
    const scmButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    scmButton.command = 'llm-auto-commit.generateCommitMessage';
    scmButton.text = "$(git-commit) Generate Commit";
    scmButton.tooltip = "Generate commit message using LLM";
    scmButton.show();
    context.subscriptions.push(scmButton);

    context.subscriptions.push(
      vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('llm-auto-commit')) {
          updateConfig();
        }
      })
    );

    infoMsg('LLM-AUTO-COMMIT extension activated');
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to activate LLM-AUTO-COMMIT: ${error.message}`);
    console.error('Activation error:', error);
  }
}

export function deactivate() {
  if (statusBarItem) {
    statusBarItem.dispose();
  }
  infoMsg('LLM-AUTO-COMMIT extension deactivated');
}
