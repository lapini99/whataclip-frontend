import React, { ReactNode, ChangeEvent } from 'react';

interface VideoFilePickerProps {
  showVideo: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
}

function VideoFilePicker({ showVideo, handleChange, children }: VideoFilePickerProps) {
  const FileInput = (): React.JSX.Element => (
    <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-center text-black">
        Upload Your Video
      </h1>
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-500 transition-colors cursor-pointer"
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const files = Array.from(e.dataTransfer.files);
          if (files.length > 0) {
            const event = {
              target: { files: files as unknown as FileList }
            } as ChangeEvent<HTMLInputElement>;
            handleChange(event);
          }
        }}
        onClick={() => document.getElementById('videoFileInput')?.click()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="mt-4 text-lg font-medium text-gray-600">Drag and drop your video here</p>
        <p className="mt-2 text-sm text-gray-500">or</p>
        
        <button 
          type="button" 
          className="mt-4"
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById('videoFileInput')?.click();
          }}
        >
          Choose File
        </button>
        <p className="mt-4 text-xs text-gray-400">MP4, MOV, WebM up to 500MB</p>
      </div>
      <input 
        type="file" 
        id="videoFileInput" 
        accept="video/*"
        className="hidden" 
        onChange={handleChange}
      />
    </div>
  );

  return showVideo ? (
    <>
      {children}
      <FileInput />
    </>
  ) : (
    <FileInput />
  );
}

export default VideoFilePicker;