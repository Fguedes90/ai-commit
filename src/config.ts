import * as vscode from 'vscode';

export const ConfigKeys = {
  OPENAI_API_KEY: 'OPENAI_API_KEY',
  OPENAI_BASE_URL: 'OPENAI_BASE_URL',
  OPENAI_MODEL: 'OPENAI_MODEL',
  AI_COMMIT_LANGUAGE: 'AI_COMMIT_LANGUAGE'
};

export function getConfig<T>(key: string): T {
  const config = vscode.workspace.getConfiguration('llm-auto-commit');
  return config.get<T>(key, null as unknown as T);
}
import * as vscode from 'vscode';

export function updateConfig() {
  // Implement the logic to update your configuration here
  // For example:
  const config = vscode.workspace.getConfiguration('llm-auto-commit');
  // Update any internal state based on the new configuration
  console.log('Configuration updated');
}
