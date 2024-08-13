<a name="readme-top"></a>

<div align="center">

<img height="120" src="https://github.com/Sitoi/ai-commit/blob/main/images/logo.png?raw=true">

<h1>LLM-AUTO-COMMIT</h1>

Leverage LLM APIs to streamline your Git workflow: automatically review changes, generate conventional commit messages, and maintain consistent commit practices.

**English** · [简体中文](./README.zh_CN.md) · [Report Bug][github-issues-link] · [Request Feature][github-issues-link]

<!-- SHIELD GROUP -->

[![][github-contributors-shield]][github-contributors-link]
[![][github-forks-shield]][github-forks-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][vscode-marketplace-shield]][vscode-marketplace-link]
[![][total-installs-shield]][total-installs-link]
[![][avarage-rating-shield]][avarage-rating-link]
[![][github-license-shield]][github-license-link]

![LLM-AUTO-COMMIT Demo](https://github.com/sitoi/ai-commit/blob/main/aicommit.gif?raw=true)

</div>

## ✨ Features

- 🤖 Generate commit messages using ChatGPT or Azure API based on git diffs
- 🌍 Support for multi-language commit messages (19 languages available)
- 😄 Option to include Gitmoji in commit messages
- 📝 Adherence to Conventional Commits specification

## 📦 Installation

1. Open VSCode and search for "LLM-AUTO-COMMIT" in the Extensions view
2. Click the "Install" button
3. Alternatively, install directly from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Sitoi.llm-auto-commit)

> **Note:** Ensure your Node.js version is 16 or higher

## 🚀 Usage

1. Install and enable the "LLM-AUTO-COMMIT" extension
2. Configure the extension settings in VSCode (search for "llm-auto-commit" in settings)
3. Make changes to your project and stage them (git add)
4. In the "Source Control" panel, click the "LLM-AUTO-COMMIT" icon next to the commit message input box
5. Review the generated commit message and commit your changes if satisfied

> **Tip:** For large code changes exceeding the maximum token length, consider staging and committing in smaller batches

### ⚙️ Configuration

Configure the following options in VSCode settings under "llm-auto-commit":

| Setting            |  Type   |    Default    | Required |                                            Description                                        |
| :----------------- | :-----: | :-----------: | :------: | :-------------------------------------------------------------------------------------------: |
| OPENAI_API_KEY     | string  |     None      |   Yes    |                 [OpenAI API key](https://platform.openai.com/account/api-keys)                |
| OPENAI_BASE_URL    | string  |     None      |    No    |     For Azure: https://{resource}.openai.azure.com/openai/deployments/{model}                 |
| OPENAI_MODEL       | string  | gpt-3.5-turbo |   Yes    |                                    OpenAI model to use                                        |
| AI_COMMIT_LANGUAGE | string  |      en       |   Yes    |                              Commit message language (19 options)                             |

## 🛠️ Local Development

Use Github Codespaces for online development:

[![Open in GitHub Codespaces][github-codespace-shield]][github-codespace-link]

Or, clone the repository and set up locally:

```bash
git clone https://github.com/sitoi/ai-commit.git
cd ai-commit
npm install
```

Open the project in VSCode and press F5 to run. This opens a new Extension Development Host window with the plugin active.

## 🤝 Contributing

Contributions of all types are more than welcome, if you are interested in contributing code, feel free to check out our GitHub [Issues][github-issues-link] to get stuck in to show us what you’re made of.

[![][pr-welcome-shield]][pr-welcome-link]

### 💗 All Thanks To Our Contributors

[![][github-contrib-shield]][github-contrib-link]

## 🔗 Links

### Credits

- **auto-commit** - <https://github.com/lynxife/auto-commit>
- **opencommit** - <https://github.com/di-sukharev/opencommit>

---

## 📝 License

This project is [MIT](./LICENSE) licensed.

