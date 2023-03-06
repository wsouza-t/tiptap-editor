import { BubbleMenu, Editor } from "@tiptap/react";
import { Button } from "antd";
import { MouseEventHandler } from "react";
import "./styles.css";

export const TooltipLink = ({
  editor,
  handleEdit,
}: {
  editor: Editor;
  handleEdit: MouseEventHandler<HTMLButtonElement>;
}) => {
  const handleRemoveLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  };

  return (
    <BubbleMenu
      className="tractian-editor-tooltip-link-bubblemenu"
      tippyOptions={{ duration: 250 }}
      updateDelay={0}
      editor={editor}
      shouldShow={({ editor, state, from, to }) => {
        return from === to && editor.isActive("link");
      }}
    >
      <div className="tractian-editor-tooltip-link-tt">
        <h2>Informações do link</h2>
        <a href={editor.getAttributes("link").href}>
          {editor.getAttributes("link").href}
        </a>
        <div>
          <Button size="small" onClick={handleEdit}>
            Editar
          </Button>
          <Button size="small" type="primary" danger onClick={handleRemoveLink}>
            Remover
          </Button>
        </div>
      </div>
    </BubbleMenu>
  );
};
