import { i18n, I18nLocals } from './i18n';

import { ConfigKeys, getConfig } from './config';

const language = getConfig<string>(ConfigKeys.AI_COMMIT_LANGUAGE);
const emoji_enabled = getConfig<boolean>(ConfigKeys.EMOJI_ENABLED);
const fullGitMojiSpec = getConfig<boolean>(ConfigKeys.FULL_GITMOJI_SPEC);

const translation = i18n[(language as I18nLocals) || 'en'];

export const IDENTITY = 'You are to act as the author of a commit message in git.';

const INIT_MAIN_PROMPT = (language: string) => ({
  role: 'system',
  content: `${IDENTITY} Your mission is to create clean and comprehensive commit messages as per the conventional commit convention
  
 ### Guidelines:
1. **Basic structure of a commit message:*
   <emoji> <type>[optional scope]: <description>
   [optional body]
   [optional footer(s)]


2. **Most common commit types with emojis:**
   - 🐛 fix: patches a bug
   - ✨ feat: introduces a new feature
   - 💥 BREAKING CHANGE: introduces an incompatible API change

3. **Other allowed types with emojis:**
   - 🏗️ build:, 🧹 chore:, 🚀 ci:, 📚 docs:, 💎 style:, ♻️ refactor:, ⚡ perf:, 🧪 test:

4. **Important rules:**
   - Use "!" after the type/scope to indicate a significant change.
   - The scope is not optional, you should always provide a scope.
   - The description should be concise and in the imperative mood.
   - The commit body should provide additional context.
   - Footers should follow the git trailer format.
   - You should always provide a type, even if it's a trivial change.
   - You should always provide a scope, even if it's a trivial change.
   - You should return a commit message in ${language}
   - You should return a commit message in the present tense.
   - You should return a commit message in the imperative mood.
   - You should return only the commit message, no other text.

5. **Examples of commit messages with emojis:**
   - ✨ feat(api): add endpoint for user listing
   - 🐛 fix: resolve JSON parsing error
   - 📚 docs: update README with new installation instructions
   - 💥 BREAKING CHANGE: remove support for Node.js 10

When generating a commit message, consider the context of the changes, the importance of the change, and its impact on the project. Be clear and concise, providing sufficient information for other developers to understand the nature of the change.
  I will send you an output of the 'git diff --staged' command, and you are to convert it into a commit message.
  Don't add any descriptions to the commit, only the commit message. Use the present tense. Lines must not be longer than 74 characters. Use ${language} for the commit message.`
});

export const INIT_DIFF_PROMPT = {
  role: 'user',
  content: `diff --git a/src/server.ts b/src/server.ts
      index ad4db42..f3b18a9 100644
      --- a/src/server.ts
      +++ b/src/server.ts
      @@ -10,7 +10,7 @@
      import {
          initWinstonLogger();
          
          const app = express();
          -const port = 7799;
          +const PORT = 7799;
          
          app.use(express.json());
          
          @@ -34,6 +34,6 @@
          app.use((_, res, next) => {
              // ROUTES
              app.use(PROTECTED_ROUTER_URL, protectedRouter);
              
              -app.listen(port, () => {
                  -  console.log(\`Server listening on port \${port}\`);
                  +app.listen(process.env.PORT || PORT, () => {
                      +  console.log(\`Server listening on port \${PORT}\`);
                  });`
};

export const getMainCommitPrompt = async () => {
  return [
    INIT_MAIN_PROMPT(translation.localLanguage),
    INIT_DIFF_PROMPT,
  ];
};
