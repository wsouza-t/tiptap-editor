import { MouseEventHandler, ReactNode } from "react";

export type ToolbarListType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
  isActive: string;
  icon: ReactNode;
  description: string;
}[];
