import { errMsg, infoMsg } from './utils';
import { generateCommitMsg } from './generate-commit-msg';

export default async function aiCommitController(arg) {
  try {
    infoMsg('Starting aiCommitController...');
    infoMsg(`Argument received: ${JSON.stringify(arg)}`);
    
    infoMsg('Calling generateCommitMsg...');
    await generateCommitMsg(arg);
    
    infoMsg('Commit message generation completed successfully');
  } catch (error) {
    errMsg('Generate commit message failed', error);
    console.error('Full error object:', error);
  }
}
