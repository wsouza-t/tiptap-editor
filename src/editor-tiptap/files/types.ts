import { ReactNode } from "react";

export type UploadFilesType = {
  url?: string;
  format: string;
  icon?: ReactNode;
} & File;
