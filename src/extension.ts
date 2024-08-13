import * as vscode from 'vscode';
import aiCommitController from './ai-commit-controller';
import { updateConfig } from './config'; // You'll need to create this function

let statusBarItem: vscode.StatusBarItem;

export async function activate(context: vscode.ExtensionContext) {
  try {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    context.subscriptions.push(statusBarItem);

    context.subscriptions.push(
      vscode.commands.registerCommand('extension.llm-auto-commit', async (arg) => {
        statusBarItem.text = "$(sync~spin) Generating commit message...";
        statusBarItem.show();
        try {
          await aiCommitController(arg);
        } finally {
          statusBarItem.hide();
        }
      })
    );

    context.subscriptions.push(
      vscode.commands.registerCommand('llm-auto-commit.generateCommitMessage', async () => {
        statusBarItem.text = "$(sync~spin) Generating commit message...";
        statusBarItem.show();
        try {
          await aiCommitController();
        } finally {
          statusBarItem.hide();
        }
      })
    );

    context.subscriptions.push(
      vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('llm-auto-commit')) {
          updateConfig();
        }
      })
    );
  } catch (error) {
    vscode.window.showErrorMessage(`Failed to activate LLM-AUTO-COMMIT: ${error.message}`);
  }
}

export function deactivate() {
  if (statusBarItem) {
    statusBarItem.dispose();
  }
}
