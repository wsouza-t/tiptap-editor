import { Editor } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  StrikeIcon,
} from "./components/icons";
import Tippy from "@tippyjs/react";
import { ToolbarListType } from "./types";
import "./styles.css";
import { Col, Input, InputRef, Modal, Row } from "antd";
import { TooltipLink } from "./components/tooltip-link";

export const ToolBar = ({ editor }: { editor: Editor }) => {
  const inputLinkRef = useRef<InputRef | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState<string | null>(null);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    setUrl(previousUrl);
    setIsModalOpen(true);

    // cancelled
    if (url === null || url === undefined) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
  }, [editor, url, isModalOpen]);

  const handleSaveUrl = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    setIsModalOpen(false);
    editor.chain().focus();
  }, [url]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!editor) {
    return null;
  }

  useEffect(() => {
    isModalOpen && inputLinkRef.current?.focus({ cursor: "start" });
  }, [isModalOpen]);

  const toolbarList: ToolbarListType = [
    {
      onClick: () => editor.chain().focus().toggleBold().run(),
      isDisabled: editor.can().chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold") ? "is-active" : "",
      icon: <BoldIcon />,
      description: "Negrito",
    },
    {
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isDisabled: editor.can().chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic") ? "is-active" : "",
      icon: <ItalicIcon />,
      description: "Itálico",
    },
    {
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isDisabled: editor.can().chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike") ? "is-active" : "",
      icon: <StrikeIcon />,
      description: "Tachado",
    },
    {
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isDisabled: !false,
      isActive: editor.isActive("bulletList") ? "is-active" : "",
      icon: <ListBulletsIcon />,
      description: "Lista com marcadores",
    },
    {
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isDisabled: !false,
      isActive: editor.isActive("orderedList") ? "is-active" : "",
      icon: <ListNumbersIcon />,
      description: "Lista numerada",
    },
    {
      onClick: setLink,
      isDisabled: !false,
      isActive: editor.isActive("link") ? "is-active" : "",
      icon: <LinkIcon />,
      description: "Adicionar Link",
    },
  ];
  return (
    <>
      <div className="tractian-editor-toolbar-tt">
        {toolbarList.map((item, index) => (
          <Tippy
            key={index}
            content={item.description}
            className="tractian-editor-tooltip-tippy"
          >
            <button
              onClick={item.onClick}
              disabled={!item.isDisabled}
              className={item.isActive}
            >
              {item.icon}
            </button>
          </Tippy>
        ))}
      </div>
      <Modal
        title="Ajustes do link"
        open={isModalOpen}
        onOk={() => handleSaveUrl()}
        onCancel={() => handleCloseModal()}
      >
        <Row>
          <Col xs={24}>
            <h4>Link</h4>

            <Input
              ref={inputLinkRef}
              placeholder="Cole ou digite o link"
              value={url as string}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Col>
        </Row>
      </Modal>
      <TooltipLink editor={editor} handleEdit={setLink} />
    </>
  );
};
