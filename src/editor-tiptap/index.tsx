import Link from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import suggestion from "./suggestion";
import { ToolBar } from "./toolbar";
import "./styles.css";
import { useCallback, useEffect, useRef, useState } from "react";
import Placeholder from "@tiptap/extension-placeholder";
import { ToolbarBottom } from "./toolbar-bottom";
import "antd/dist/antd.css";

export const EditorTiptap = () => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: "tractian-editor-tt-mention",
        },
        suggestion,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "os-link-editor",
        },
      }),
      Placeholder.configure({
        placeholder: "Comente algo e use @ para marcar uma pessoa...",
      }),
    ],
  });

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      isFocused &&
        editorRef.current &&
        !editorRef.current.contains(e.target as Node) &&
        setIsFocused(false);
    },
    [isFocused]
  );

  const handleSubmit = () => {
    console.log("Foi enviado", editor?.getHTML());
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (!editor) return null;
  return (
    <div
      ref={editorRef}
      className={`${
        isFocused ? "tractian-editor-tt-focused" : ""
      } tractian-editor-tt`}
      onClick={() => setIsFocused(true)}
    >
      <ToolBar editor={editor} />
      <EditorContent editor={editor} className="tractian-editor-tt-editable" />
      <ToolbarBottom
        isEmpty={editor?.isEmpty}
        isMentioned={() => editor.commands.insertContent("@")}
        isSubmit={handleSubmit}
      />
    </div>
  );
};
