import { useEffect, useRef, useState } from "react";
import { useRealtime, useFormElements } from "@superviz/react-sdk";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import getCaretCoordinates from "textarea-caret";
import { throttle } from "lodash";

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
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(channelName, ydoc);

    const yText = ydoc.getText("markdown");

    if (editorRef.current) {
      enableRealtimeSync(editorRef.current.id);
      enableOutline(editorRef.current.id);
    }

    let isLocalChange = false;

    const updateEditorContent = () => {
      if (editorRef.current && !isLocalChange) {
        isLocalChange = true;
        editorRef.current.value = yText.toString();
        isLocalChange = false;
      }
    };

    yText.observe(updateEditorContent);

    const handleTextUpdated = (data: { data: { content: string } }) => {
      if (data?.data?.content && !isLocalChange) {
        if (editorRef.current) {
          editorRef.current.value = data.data.content;
        }
      }
    };

    const handleCursorUpdated = (data: {
      userName: string;
      position: { top: number; left: number };
    }) => {
      if (data?.position && data?.userName) {
        setCursorPosition({
          top: data.position.top,
          left: data.position.left,
          userName: data.userName,
        });
      }
    };

    subscribe("text-updated", handleTextUpdated);
    subscribe("cursor-updated", handleCursorUpdated);

    const throttledHandleEditorInput = throttle(() => {
      if (editorRef.current) {
        const newText = editorRef.current.value;

        if (yText.toString() !== newText) {
          isLocalChange = true;
          yText.delete(0, yText.length);
          yText.insert(0, newText);
          publish("text-updated", { content: newText });
          isLocalChange = false;
        }
      }
    }, 100); // Ajuste o intervalo conforme necessário

    const throttledHandleCursorMovement = throttle(() => {
      if (editorRef.current) {
        const cursorPosition = editorRef.current.selectionStart;
        const coordinates = getCaretCoordinates(
          editorRef.current,
          cursorPosition
        );
        setCursorPosition({
          top: coordinates.top,
          left: coordinates.left,
          userName: userName,
        });
        publish("cursor-updated", {
          userName,
          position: { top: coordinates.top, left: coordinates.left },
        });
      }
    }, 100); // Ajuste o intervalo conforme necessário

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("input", throttledHandleEditorInput);
      editor.addEventListener("keyup", throttledHandleCursorMovement);
    }

    return () => {
      if (editor) {
        editor.removeEventListener("input", throttledHandleEditorInput);
        editor.removeEventListener("keyup", throttledHandleCursorMovement);
      }
      unsubscribe("text-updated", handleTextUpdated);
      unsubscribe("cursor-updated", handleCursorUpdated);
      provider.destroy();
    };
  }, [
    publish,
    subscribe,
    unsubscribe,
    channelName,
    enableRealtimeSync,
    enableOutline,
    userName,
  ]);

  return (
    <div className="flex justify-center items-start bg-gray-900 text-white min-h-screen pt-10">
      <div className="w-full max-w-7xl h-[600px] p-8 bg-gray-800 rounded-lg shadow-lg relative">
        {cursorPosition && (
          <div
            className="absolute text-sm bg-blue-500 text-white rounded px-2 py-1"
            style={{ top: cursorPosition.top - 20, left: cursorPosition.left }}
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
