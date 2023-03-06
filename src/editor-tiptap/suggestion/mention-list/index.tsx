import "./styles.css";

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

type EventProps = {
  event: {
    key: "ArrowUp" | "ArrowDown" | "Enter";
  };
};

export type ForwardPropsType = {
  command: any;
  items: string[];
};
export default forwardRef((props: ForwardPropsType, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];

    if (item) {
      props.command({ id: item });
    }
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: EventProps) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="items">
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            className={`item ${index === selectedIndex ? "is-selected" : ""}`}
            key={index}
            onClick={() => selectItem(index)}
          >
            <span>{item.slice(0, 1)}</span> {item}
          </button>
        ))
      ) : (
        <div className="item">No result</div>
      )}
    </div>
  );
});
