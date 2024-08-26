# Obsidian SuperViz

<p align="center">
  <img src="https://img.shields.io/static/v1?label=React&message=library&color=blue&style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/static/v1?label=TypeScript&message=language&color=blue&style=for-the-badge&logo=typescript"/>
  <img src="https://img.shields.io/static/v1?label=Vite&message=build-tool&color=green&style=for-the-badge&logo=vite"/>
  <img src="https://img.shields.io/static/v1?label=Yjs&message=real-time%20collaboration&color=purple&style=for-the-badge&logo=none"/>
  <img src="https://img.shields.io/static/v1?label=SuperViz&message=collaboration&color=red&style=for-the-badge&logo=none"/>
  <img src="https://img.shields.io/static/v1?label=TailwindCSS&message=framework&color=indigo&style=for-the-badge&logo=tailwind-css"/>
</p>

## Project Status: ⚠️ In Development

### Description

**Obsidian SuperViz** is a proof of concept (POC) for a real-time collaborative Markdown editor, deeply inspired by the minimalist and dark aesthetic of Obsidian. Its primary goal is to enable seamless collaboration between multiple users who can simultaneously edit `.md` files, both through a modern web interface and an integrated plugin within Obsidian. Although not fully polished, the project is a functional prototype designed to facilitate real-time documentation, capture meeting notes, and collaboratively brainstorm and develop ideas in a dynamic and connected environment. The project was developed solely by **My Myself and I** in just **one day**, showcasing the rapid development process.

### ⚙️ Features

- **Real-Time Collaboration**: Powered by **Yjs** for conflict-free real-time collaboration, allowing multiple users to work on the same document simultaneously.
- **Presence Tracking**: Integration with **SuperViz** to display real-time presence of users, showing who is editing the document and their exact position within the text.
- **Video Conference**: Real-time **video conferencing** integrated directly into the platform for enhanced communication during collaboration.
- **Video Conference Recording**: Sessions can be recorded for later reference, ensuring that no important details are lost.
- **Transcriptions**: After the video conference, users can generate **transcriptions** of the session, making it easy to review discussions and summarize key points.

### 📚 Project Vision

Though still a POC, the vision behind this project is to create a robust, real-time collaborative editor that simplifies the documentation process for teams, facilitates more dynamic meeting notes, and enhances brainstorming sessions. By combining the real-time synchronization power of **Yjs** with the collaboration features of **SuperViz**, the project lays the groundwork for a future tool that can be widely used across various team workflows.

### 📝 Table of Contents

- [Getting Started](#getting-started)
- [How to Run](#how-to-run)
- [Development](#development)
- [Authors](#authors)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 📋 Prerequisites

Ensure you have the following installed:

- Git
- Node.js
- pnpm

### 🔧 Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/obsidian-superviz.git
   ```

2. Navigate to the project directory:

   ```sh
   cd obsidian-superviz/obsidian-superviz-front
   ```

3. Copy the environment configuration file:

   ```sh
   cp .env.example .env
   ```

4. Install dependencies:

   ```sh
   pnpm install
   ```

## ⚙️ How to Run

1. Start the development server:

   ```sh
   pnpm dev
   ```

## 📦 Deployment

- Deployment instructions will be provided in the future.

## 🛠️ Built With

- **Client:**
  - [React](https://reactjs.org/) - The library for building user interfaces
  - [TypeScript](https://www.typescriptlang.org/) - The programming language
  - [Vite](https://vitejs.dev/) - The build tool
  - [Yjs](https://yjs.dev/) - The CRDT library for real-time collaboration
  - [SuperViz](https://superviz.com/) - The SDK for collaborative presence and video conferencing
  - [TailwindCSS](https://tailwindcss.com/) - The CSS framework

## ✒️ Author

- **My Myself and I** - _Developer_ - [GitHub](https://github.com/henrique-leme)

See the full list of [contributors](https://github.com/yourusername/obsidian-superviz/contributors) who participated in this project.

### 🔗 Link to the project: [Obsidian SuperViz](https://obsidian-superviz.vercel.app/)
