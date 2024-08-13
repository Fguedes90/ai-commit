<a name="readme-top"></a>

<div align="center">

<img height="120" src="https://github.com/Sitoi/ai-commit/blob/main/images/logo.png?raw=true">

<h1>LLM-AUTO-COMMIT</h1>

Use LLM APIs to review Git changes, generate conventional commit messages that meet the conventions, simplify the commit process, and keep the commit conventions consistent.

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

![](https://github.com/sitoi/ai-commit/blob/main/aicommit.gif?raw=true)

</div>

## ✨ Features

- 🤯 Support generating commit messages based on git diffs using ChatGPT / Azure API.
- 🗺️ Support multi-language commit messages.
- 😜 Support adding Gitmoji.
- 📝 Support Conventional Commits specification.

## 📦 Installation

1. Search for "LLM-AUTO-COMMIT" in VSCode and click the "Install" button.
2. Install it directly from the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Sitoi.llm-auto-commit).

> **Note**\
> Make sure your node version >= 16

## 🤯 Usage

1. Ensure that you have installed and enabled the "LLM-AUTO-COMMIT" extension.
2. In VSCode settings, locate the "llm-auto-commit" configuration options and configure them as needed.
3. Make changes in your project and add the changes to the staging area (git add).
4. Next to the commit message input box in the "Source Control" panel, click the "LLM-AUTO-COMMIT" icon button. After clicking, the extension will generate a commit message and populate it in the input box.
5. Review the generated commit message, and if you are satisfied, proceed to commit your changes.

> **Note**\
> If the code exceeds the maximum token length, consider adding it to the staging area in batches.

### ⚙️ Configuration

In the VSCode settings, locate the "llm-auto-commit" configuration options and configure them as needed:

| Configuration      |  Type   |    Default    | Required |                                            Notes                                             |
| :----------------- | :-----: | :-----------: | :------: | :------------------------------------------------------------------------------------------: |
| OPENAI_API_KEY     | string  |     None      |   Yes    |                 [OpenAI token](https://platform.openai.com/account/api-keys)                 |
| OPENAI_BASE_URL    | string  |     None      |    No    |     If using Azure, use: https://{resource}.openai.azure.com/openai/deployments/{model}      |
| OPENAI_MODEL       | string  | gpt-3.5-turbo |   Yes    |                                         OpenAI MODEL                                         |
| AI_COMMIT_LANGUAGE | string  |      en       |   Yes    |                                    Supports 19 languages                                     |

## ⌨️ Local Development

You can use Github Codespaces for online development:

[![][github-codespace-shield]][github-codespace-link]

Alternatively, you can clone the repository and run the following commands for local development:

```bash
$ git clone https://github.com/sitoi/ai-commit.git
$ cd ai-commit
$ npm install
```

Open the project folder in VSCode. Press F5 to run the project. This will open a new Extension Development Host window and launch the plugin within it.

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

