import React, { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import getCaretCoordinates from "textarea-caret";
import { useRealtime } from "@superviz/react-sdk";

interface MarkdownEditorProps {
  userName: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ userName }) => {
  const { publish, subscribe, unsubscribe } = useRealtime();
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPosition, setCursorPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const ytext = ydoc.getText("md-content");

    let isLocalChange = false;

    const synchronizeEditorContent = () => {
      if (editorRef.current && !isLocalChange) {
        const content = ytext.toString();
        if (editorRef.current.value !== content) {
          editorRef.current.value = content;
        }
      }
    };

    const handleTextUpdated = (data: { content: string }) => {
      if (!isLocalChange) {
        isLocalChange = true;
        ydoc.transact(() => {
          ytext.delete(0, ytext.length);
          ytext.insert(0, data.content);
        });
        isLocalChange = false;
      }
    };

    subscribe("text-updated", handleTextUpdated);

    ytext.observe(() => {
      synchronizeEditorContent();
      if (!isLocalChange) {
        publish("text-updated", { content: ytext.toString() });
      }
    });

    const handleEditorInput = () => {
      if (editorRef.current) {
        const newText = editorRef.current.value;

        isLocalChange = true;
        ydoc.transact(() => {
          ytext.delete(0, ytext.length);
          ytext.insert(0, newText);
        });
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
        setCursorPosition({
          top: coordinates.top,
          left: coordinates.left,
        });
      }
    };

    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("input", handleEditorInput);
      editor.addEventListener("keyup", handleCursorMovement);
    }

    return () => {
      if (editor) {
        editor.removeEventListener("input", handleEditorInput);
        editor.removeEventListener("keyup", handleCursorMovement);
      }
      unsubscribe("text-updated", handleTextUpdated);
    };
  }, [publish, subscribe, unsubscribe]);

  return (
    <div className="flex justify-center items-start bg-gray-900 text-white min-h-screen pt-10">
      <div className="w-full max-w-7xl h-[600px] p-8 bg-gray-800 rounded-lg shadow-lg relative">
        {cursorPosition && (
          <div
            className="absolute text-sm bg-blue-500 text-white rounded px-2 py-1"
            style={{ top: cursorPosition.top, left: cursorPosition.left }}
          >
            {userName}
          </div>
        )}
        <textarea
          ref={editorRef}
          className="w-full h-full bg-transparent border-none outline-none text-lg resize-none font-mono"
          placeholder="Start typing your markdown..."
        />
      </div>
    </div>
  );
};

export default MarkdownEditor;
