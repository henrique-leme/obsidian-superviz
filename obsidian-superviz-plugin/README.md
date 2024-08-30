Aqui está o README ajustado para incluir as instruções detalhadas de como rodar o plugin dentro do Obsidian:

---

# Obsidian SuperViz Plugin

<p align="center">
  <img src="https://img.shields.io/static/v1?label=Obsidian&message=plugin&color=blue&style=for-the-badge&logo=obsidian"/>
  <img src="https://img.shields.io/static/v1?label=TypeScript&message=language&color=blue&style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/static/v1?label=Yjs&message=real-time%20collaboration&color=purple&style=for-the-badge&logo=none"/>
  <img src="https://img.shields.io/static/v1?label=SuperViz&message=collaboration&color=red&style=for-the-badge&logo=none"/>
</p>

## Project Status: ⚠️ In Development

### Description

**Obsidian SuperViz Plugin** is a proof of concept (POC) for a real-time collaborative Markdown editor, seamlessly integrated into Obsidian. It allows multiple users to edit `.md` files simultaneously through a plugin that connects to a collaborative web interface. This project aims to facilitate real-time documentation, note-taking during meetings, and collaborative brainstorming directly within the Obsidian environment. The plugin was developed by **Henrique Leme** as a demonstration of the potential for combining **SuperViz** and **Yjs** technologies within Obsidian.

### ⚙️ Features

- **Real-Time Collaboration**: Utilizes **Yjs** for conflict-free real-time collaboration within Obsidian, allowing multiple users to work on the same Markdown document.
- **Presence Tracking**: Integration with **SuperViz** to track and display the real-time presence of collaborators, showing who is editing the document.
- **Video Conference Integration**: Allows users to initiate real-time **video conferencing** directly from the Obsidian plugin, enhancing communication during collaboration.
- **Session Recording**: Ability to record collaborative sessions for later reference, ensuring important discussions are preserved.
- **Transcriptions**: Post-session transcription generation to easily review and summarize meeting discussions.

### 📚 Project Vision

The vision for this project is to evolve into a robust tool for teams to collaborate in real-time within Obsidian, streamlining the documentation process, enhancing meeting productivity, and fostering dynamic brainstorming sessions. Combining the synchronization capabilities of **Yjs** with the collaborative features of **SuperViz**, this plugin lays the foundation for a comprehensive real-time collaborative experience.

### 📝 Table of Contents

- [Getting Started](#getting-started)
- [How to Run](#how-to-run)
- [Development](#development)
- [Authors](#authors)

## 🚀 Getting Started

Follow these instructions to set up the plugin on your local Obsidian environment for development and testing.

### 📋 Prerequisites

Ensure you have the following installed:

- Git
- Node.js
- pnpm (ou npm)

### 🔧 Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/henrique-leme/obsidian-superviz-plugin.git
   ```

2. Navigate to the project directory:

   ```sh
   cd obsidian-superviz-plugin
   ```

3. Install dependencies:

   ```sh
   pnpm install
   ```

4. Build the plugin:

   ```sh
   pnpm build
   ```

### ⚙️ How to Run

1. **Prepare the Plugin Folder in Obsidian:**

   - Navigate to the `.obsidian/plugins/` directory within your Obsidian vault.

   - Create a new folder for your plugin:

     ```sh
     mkdir /path/to/your/vault/.obsidian/plugins/obsidian-superviz-plugin
     ```

2. **Copy the Built Files:**

   - After building the plugin, copy the compiled files (`main.js`, `manifest.json`, and `styles.css` if applicable) into the newly created folder:

     ```sh
     cp -r dist/* /path/to/your/vault/.obsidian/plugins/obsidian-superviz-plugin/
     ```

3. **Activate the Plugin in Obsidian:**

   - Open Obsidian and go to `Settings -> Community plugins`.
   - Enable the **Obsidian SuperViz Plugin**.

4. **Open the Collaborative Editor:**

   - Use the plugin's sidebar icon or the shortcut `Ctrl + Shift + E` to open the collaborative editor.

## 🛠️ Built With

- **Plugin:**
  - [Obsidian API](https://github.com/obsidianmd/obsidian-api) - The API for building Obsidian plugins
  - [TypeScript](https://www.typescriptlang.org/) - The programming language
  - [Yjs](https://yjs.dev/) - The CRDT library for real-time collaboration
  - [SuperViz](https://superviz.com/) - The SDK for collaborative presence and video conferencing

## ✒️ Author

- **Henrique Leme** - _Developer_ - [GitHub](https://github.com/henrique-leme)

See the full list of [contributors](https://github.com/henrique-leme/obsidian-superviz-plugin/contributors) who participated in this project.

### 🔗 Link to the project: [Obsidian SuperViz Plugin](https://github.com/henrique-leme/obsidian-superviz-plugin)

---

Este README agora inclui todos os passos necessários para rodar o plugin no ambiente Obsidian, além das instruções básicas de instalação e configuração.