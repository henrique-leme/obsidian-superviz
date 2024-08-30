import { Plugin, WorkspaceLeaf, ItemView } from "obsidian";

export default class CollaborativeEditingPlugin extends Plugin {
	async onload() {
		// Registra a nova view do editor colaborativo
		this.registerView(
			"collaborative-editor",
			(leaf) => new CollaborativeMarkdownView(leaf)
		);

		// Adiciona um ícone na barra lateral para abrir o editor colaborativo
		this.addRibbonIcon("edit", "Open Collaborative Editor", () => {
			this.openCollaborativeEditor();
		});

		// Registra o comando para abrir o editor colaborativo
		this.addCommand({
			id: "open-collaborative-editor",
			name: "Open Collaborative Editor",
			callback: () => {
				this.openCollaborativeEditor();
			},
			hotkeys: [
				{
					modifiers: ["Ctrl", "Shift"],
					key: "E",
				},
			],
		});
	}

	async onunload() {
		this.app.workspace.detachLeavesOfType("collaborative-editor");
	}

	private openCollaborativeEditor() {
		// Abre o editor colaborativo em uma nova aba
		const leaf = this.app.workspace.getLeaf(true);
		leaf.setViewState({
			type: "collaborative-editor",
			state: { url: "https://obsidian-superviz.vercel.app/" }, // Substitua pela URL do seu site
		});
		this.app.workspace.revealLeaf(leaf);
	}
}

class CollaborativeMarkdownView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return "collaborative-editor";
	}

	getDisplayText() {
		return "Collaborative Editor";
	}

	getIcon() {
		return "document";
	}

	async onOpen() {
		// Cria um iframe para carregar o website colaborativo com permissões para câmera e microfone
		const iframe = document.createElement("iframe") as HTMLIFrameElement;
		iframe.src = "https://obsidian-superviz.vercel.app/"; // Substitua pela URL do seu site
		iframe.style.width = "100%";
		iframe.style.height = "calc(100% - 10px)"; // Ajusta a altura para considerar o espaçamento
		iframe.style.border = "none";
		iframe.style.position = "absolute";
		iframe.style.top = "40px"; // Adiciona 10px de espaçamento no topo
		iframe.style.left = "0";
		iframe.style.right = "0";
		iframe.style.bottom = "0";
		iframe.style.overflow = "auto";
		iframe.style.boxSizing = "border-box";
		iframe.style.margin = "0";
		iframe.style.padding = "0";

		// Permissões de câmera e microfone
		iframe.allow = "camera; microphone;";

		// Escuta as mensagens enviadas pelo website para atualizar o conteúdo no Obsidian
		window.addEventListener("message", (event) => {
			if (event.data.type === "updateContent") {
				this.updateFileContent(event.data.content);
			}
		});

		this.containerEl.style.position = "relative"; // Assegura que o container seja o referencial do iframe
		this.containerEl.style.overflow = "hidden"; // Garante que o conteúdo fique dentro da view
		this.containerEl.style.margin = "0";
		this.containerEl.style.padding = "0";
		this.containerEl.appendChild(iframe);
	}

	async onClose() {
		// Limpeza de recursos se necessário
	}

	private async updateFileContent(content: string) {
		const file = this.app.workspace.getActiveFile();
		if (file) {
			await this.app.vault.modify(file, content);
		}
	}
}
