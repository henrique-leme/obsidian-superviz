import { useEffect, useRef, useState } from "react";
import { useRealtime, useFormElements } from "@superviz/react-sdk";
import getCaretCoordinates from "textarea-caret";
interface MarkdownEditorProps {
  userName: string;
  channelName: string;
}

function MarkdownEditor({ userName, channelName }: MarkdownEditorProps) {
  const { publish, subscribe, unsubscribe } = useRealtime(channelName);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState<{
    top: number;
    left: number;
    userName: string;
  } | null>(null);

  const { enableRealtimeSync, enableOutline } = useFormElements();

  useEffect(() => {
    if (editorRef.current) {
      enableRealtimeSync(editorRef.current.id);
      enableOutline(editorRef.current.id);
    }

    let isLocalChange = false;

    const handleTextUpdated = (data: { data: { content: string } }) => {
      console.log(
        "Recebido evento 'text-updated' com conteúdo:",
        data?.data?.content
      );
      if (data?.data?.content && !isLocalChange) {
        if (editorRef.current) {
          editorRef.current.value = data.data.content;
        }
      } else {
        console.warn("Texto atualizado recebido sem conteúdo válido.", data);
      }
    };

    const handleCursorUpdated = (data: {
      userName: string;
      position: { top: number; left: number };
    }) => {
      console.log("Recebido evento 'cursor-updated' com dados:", data);
      if (data?.position && data?.userName) {
        setCursorPosition({
          top: data.position.top,
          left: data.position.left,
          userName: data.userName,
        });
      } else {
        console.warn("Posição do cursor recebida sem dados válidos.", data);
      }
    };

    // Inscrevendo nos eventos do canal
    subscribe("text-updated", handleTextUpdated);
    subscribe("cursor-updated", handleCursorUpdated);

    const handleEditorInput = () => {
      if (editorRef.current) {
        const newText = editorRef.current.value;
        console.log("Texto no editor foi alterado:", newText);

        isLocalChange = true;
        console.log("Publicando evento 'text-updated' com conteúdo:", newText);
        publish("text-updated", { content: newText });
        isLocalChange = false;
      }
    };

    const handleCursorMovement = () => {
      if (editorRef.current) {
        const cursorPosition = editorRef.current.selectionStart;
        const coordinates = getCaretCoordinates(
          editorRef.current,
          cursorPosition
        );
        console.log("Movimento do cursor detectado. Coordenadas:", coordinates);
        setCursorPosition({
          top: coordinates.top,
          left: coordinates.left,
          userName: userName,
        });
        console.log("Publicando evento 'cursor-updated' com dados:", {
          userName,
          position: { top: coordinates.top, left: coordinates.left },
        });
        publish("cursor-updated", {
          userName,
          position: { top: coordinates.top, left: coordinates.left },
        });
      }
    };

    const editor = editorRef.current;
    if (editor) {
      console.log("Adicionando listeners para eventos 'input' e 'keyup'.");
      editor.addEventListener("input", handleEditorInput);
      editor.addEventListener("keyup", handleCursorMovement);
    }

    return () => {
      if (editor) {
        console.log("Removendo listeners dos eventos 'input' e 'keyup'.");
        editor.removeEventListener("input", handleEditorInput);
        editor.removeEventListener("keyup", handleCursorMovement);
      }
      unsubscribe("text-updated", handleTextUpdated);
      unsubscribe("cursor-updated", handleCursorUpdated);
    };
  }, [
    publish,
    subscribe,
    unsubscribe,
    channelName,
    enableRealtimeSync,
    enableOutline,
    userName, // Adicionado userName como dependência do efeito
  ]);

  return (
    <div className="flex justify-center items-start bg-gray-900 text-white min-h-screen pt-10">
      <div className="w-full max-w-7xl h-[600px] p-8 bg-gray-800 rounded-lg shadow-lg relative">
        {cursorPosition && (
          <div
            className="absolute text-sm bg-blue-500 text-white rounded px-2 py-1"
            style={{ top: cursorPosition.top, left: cursorPosition.left }}
          >
            {cursorPosition.userName}
          </div>
        )}
        <textarea
          ref={editorRef}
          id="markdown-editor"
          className="w-full h-full bg-transparent border-none outline-none text-lg resize-none font-mono"
          placeholder="Start typing your markdown..."
        />
      </div>
    </div>
  );
}

export default MarkdownEditor;
