import { computePosition, flip, shift } from "@floating-ui/dom";
import { Editor } from "@tiptap/react";
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { CloseIcon } from "../icons";
import "./styles.css";

export const TooltipLink = ({
  editor,
  handleEdit,
}: {
  editor: Editor;
  handleEdit: MouseEventHandler<HTMLButtonElement>;
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState([0, 0]);
  const [isOpen, setIsOpen] = useState(false);

  const handlePositionTooltip = useCallback(
    ({ clientX, clientY }: { clientX: number; clientY: number }) => {
      const virtualEl = {
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: clientX,
            y: clientY,
            top: clientY,
            left: clientX,
            right: clientX,
            bottom: clientY,
          };
        },
      };
      computePosition(virtualEl, tooltipRef.current as HTMLElement, {
        middleware: [flip(), shift()],
        placement: "top-start",
      }).then(({ x, y }) => {
        setTooltipPosition([x - 30, y - 20]);
      });
    },
    []
  );

  const { ranges } = editor.state.selection;
  const from = Math.min(...ranges.map((range) => range.$from.pos));
  const to = Math.max(...ranges.map((range) => range.$to.pos));

  const handleOpenEditLink = useCallback(
    (e: MouseEvent) => {
      if (
        !isOpen &&
        to === from &&
        editor.isActive("link") &&
        editor.getAttributes("link").href &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        handlePositionTooltip(e);
        return;
      }

      if (
        isOpen &&
        !editor.isActive("link") &&
        !editor.getAttributes("link").href &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setTooltipPosition([0, 0]);
        return;
      }
    },
    [tooltipPosition, editor, isOpen, tooltipRef.current, to, from]
  );

  const handleClose = () => {
    setIsOpen(false);
    editor.commands.focus();
    editor.commands.setTextSelection({ to, from });
  };

  const handleRemoveLink = () => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setIsOpen(false);
  };

  const handleEditLink = () => {
    handleEdit;
    setIsOpen(false);
  };

  const preventArrows = useCallback(
    (e: KeyboardEvent) => {
      if (
        (e.key === "ArrowLeft" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowDown") &&
        isOpen
      ) {
        e.preventDefault();
      }
    },
    [isOpen]
  );

  useEffect(() => {
    if (
      !isOpen &&
      to === from &&
      editor.isActive("link") &&
      editor.getAttributes("link").href
    ) {
      setIsOpen(true);
    }
    document.addEventListener("click", handleOpenEditLink);
    return () => {
      document.removeEventListener("click", handleOpenEditLink);
    };
  }, [editor.isActive("link"), tooltipPosition, to, from]);

  useEffect(() => {
    document.addEventListener("keydown", preventArrows);
    return () => {
      document.removeEventListener("keydown", preventArrows);
    };
  }, []);

  return (
    <>
      {isOpen && to === from && editor.isActive("link") ? (
        <div className="tractian-editor-tooltip-link-tt-portal">
          <div
            ref={tooltipRef}
            className={`${
              isOpen ? "tractian-editor-tooltip-link-tt-open" : ""
            } tractian-editor-tooltip-link-tt`}
            style={{ left: tooltipPosition[0], top: tooltipPosition[1] }}
          >
            <button
              onClick={() => handleClose()}
              className="tractian-editor-tooltip-link-tt-close"
            >
              <CloseIcon />
            </button>
            <h2>Informações do link</h2>
            <a href={editor.getAttributes("link").href}>
              {editor.getAttributes("link").href}
            </a>
            <div>
              <button onClick={() => handleEditLink()}>Editar</button>
              <button className="is-red" onClick={handleRemoveLink}>
                Remover
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
