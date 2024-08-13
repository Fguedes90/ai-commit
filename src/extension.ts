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
      context.subscriptions.push(
        vscode.commands.registerCommand(commandId, async (arg) => {
          statusBarItem.text = "$(sync~spin) Generating commit message...";
          statusBarItem.show();
          try {
            infoMsg(`Executing command: ${commandId}`);
            await aiCommitController(arg);
            infoMsg(`Command ${commandId} executed successfully`);
          } catch (error) {
            errMsg(`Error executing ${commandId}`, error);
          } finally {
            statusBarItem.hide();
          }
        })
      );
    };

    registerCommand('extension.llm-auto-commit');
    registerCommand('llm-auto-commit.generateCommitMessage');

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
  }
}

export function deactivate() {
  if (statusBarItem) {
    statusBarItem.dispose();
  }
  infoMsg('LLM-AUTO-COMMIT extension deactivated');
}
