import React, { ChangeEventHandler } from "react";
import Slider from "react-slick";
import "./MediaFilesText.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CloseIcon, FileIcon } from "../toolbar/components/icons";
import { UploadFilesType } from "./types";

type Props = {
  handleFile: ChangeEventHandler<HTMLInputElement>;
  handleRemove(value: number): () => void;
  previewFiles: UploadFilesType[];
};

export const CarouselFiles = ({
  handleFile,
  handleRemove,
  previewFiles,
}: Props) => {
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: false,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 2,
    variableWidth: true,
  };

  return (
    <div className="MediaFilesText">
      <input
        type="file"
        id="MediaFilesText-input-file"
        multiple
        name="files[]"
        onChange={handleFile}
      />
      <div className="MediaFilesText__container">
        <Slider {...settings}>
          {previewFiles
            ? previewFiles.map((file, index) => {
                return (
                  <div key={index}>
                    {file && file.type === "file" ? (
                      <div className="MediaFilesText__container__file MediaFilesText--container">
                        <FileIcon />
                        <label className="MediaFilesText__container__file__name">
                          {file.name}
                        </label>
                        <label className="MediaFilesText__container__file__extension">
                          .{file.name.split(".")[1]}
                        </label>
                        <span className="MediaFilesText__container__file__remove">
                          <button onClick={() => handleRemove(index)}>
                            <CloseIcon />
                          </button>
                        </span>
                      </div>
                    ) : (
                      <div className="MediaFilesText__container__media MediaFilesText--container">
                        {file && file.url && file.format === "image" ? (
                          <img src={file.url} alt={file.name} />
                        ) : null}
                        {file && file.icon ? (
                          <span className="MediaFilesText__container__media__remove">
                            <button onClick={() => handleRemove(index)}>
                              <CloseIcon />
                            </button>
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })
            : null}
        </Slider>
      </div>
    </div>
  );
};
