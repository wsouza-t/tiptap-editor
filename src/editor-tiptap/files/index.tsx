import { useState } from "react";
import { FileIcon } from "../toolbar/components/icons";
import { UploadFilesType } from "./types";

export const useUploadFiles = () => {
  const [previewFiles, setPreviewFiles] = useState<UploadFilesType[]>([]);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleFile = (e: any) => {
    const files = e.target.files;
    const fillArr = new Array(files.length);
    const dataFiles = [...fillArr, ...previewFiles];
    setPreviewFiles(dataFiles);

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        const fullName = files[i].name;
        const nameFind = dataFiles.find((value) =>
          value ? `${value.name}.${value.ext}` === fullName : undefined
        );
        if (!nameFind) {
          const lastIndex = fullName.lastIndexOf(".");
          const name = fullName.substring(0, lastIndex);
          const ext = fullName.substring(lastIndex + 1);
          let format = "";

          if ("pdf" === ext.toLowerCase()) {
            format = "pdf";
          }
          if (["doc", "docx"].includes(ext.toLowerCase())) {
            format = "word";
          }
          if (["xls", "xlsx", "csv"].includes(ext.toLowerCase())) {
            format = "excel";
          }
          if (["ppt", "pptx"].includes(ext.toLowerCase())) {
            format = "powerPoint";
          }
          if (
            ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
              ext.toLowerCase()
            )
          ) {
            format = "imageFile";
          }
          if (
            ["mp4", "avi", "mov", "wmv", "flv", "webm"].includes(
              ext.toLowerCase()
            )
          ) {
            format = "videoFile";
          }
          if (
            ["mp3", "wav", "wma", "ogg", "aac", "flac"].includes(
              ext.toLowerCase()
            )
          ) {
            format = "audioFile";
          }
          if (
            ["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "tgz"].includes(
              ext.toLowerCase()
            )
          ) {
            format = "zipFile";
          }
          if ("txt" === ext.toLowerCase()) {
            format = "plaintText";
          }
          if ("svg" === ext.toLowerCase()) {
            format = "svgFile";
          }

          let file = {
            name: name,
            ext: ext,
            icon: <FileIcon />,
            type: "file",
            format: format,
            url: "",
            file: files[i],
          };

          dataFiles[files.length - 1 - i] = file;
          let preview = [...dataFiles];
          setPreviewFiles(preview);
        } else {
          dataFiles.splice(files.length - 1 - i, 1);
          let preview = [...dataFiles];
          setPreviewFiles(preview);
        }
        setIsDisabled(false);
      };
      try {
        reader.readAsDataURL(files[i]);
      } catch (error: any) {
        console.log(error.code);
      }
    }
  };
  const handleRemove = (index: number) => {
    const dataFiles = [...previewFiles];
    dataFiles.splice(index, 1);
    setPreviewFiles(dataFiles);
    setIsDisabled(false);
    if (dataFiles.length === 0) {
      setIsDisabled(true);
    }
  };
  return { handleFile, handleRemove, isDisabled, previewFiles };
};
