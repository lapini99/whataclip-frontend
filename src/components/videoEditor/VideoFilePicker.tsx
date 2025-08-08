import React, { ReactNode, ChangeEvent, JSX } from 'react';

interface VideoFilePickerProps {
  showVideo: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}

function VideoFilePicker({ showVideo, handleChange, children }: VideoFilePickerProps) {
  const FileInput = (): JSX.Element => (
    <label
      htmlFor="x"
      id={`${showVideo ? "file_picker_small" : ""}`}
      className={`file_picker `}
    >
      <span>choose file</span>
      <input onChange={handleChange} type="file" id="x" accept="video/mp4" />
    </label>
  );

  return showVideo ? (
    <>
      {" "}
      {children} <FileInput />
    </>
  ) : (
    <FileInput />
  );
}

export default VideoFilePicker;