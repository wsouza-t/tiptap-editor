import Mention from "@tiptap/extension-mention";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenuBar } from "./menu-bar";
import suggestion from "./suggestion";

export const EditorTiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: {
          class: "mention",
        },
        suggestion,
      }),
    ],
    content: "<p>Hello World!</p>",
  });
  if (!editor) return null;
  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};
