import Tippy from "@tippyjs/react";
import { MouseEventHandler } from "react";
import { MentionIcon, SendIcon } from "../toolbar/components/icons";
import "./styles.css";

export type Props = {
  isEmpty?: boolean;
  isMentioned: MouseEventHandler<HTMLButtonElement>;
  isSubmit: MouseEventHandler<HTMLButtonElement>;
};

export const ToolbarBottom = ({ isEmpty, isMentioned, isSubmit }: Props) => {
  return (
    <div className="tractian-editor-toolbar-bottom-tt">
      <div className="toolbar-bottom-group-buttons">
        <Tippy content="Mencionar" className="tractian-editor-tooltip-tippy">
          <button onClick={isMentioned}>
            <MentionIcon />
          </button>
        </Tippy>
      </div>
      <button
        className={`${!isEmpty ? "is-blue" : ""}`}
        disabled={isEmpty}
        onClick={isSubmit}
      >
        <SendIcon />
      </button>
    </div>
  );
};
