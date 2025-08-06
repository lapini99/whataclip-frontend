'use client';

import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const ffmpeg = new FFmpeg();

export default function VideoEditor() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(30);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const loadFFmpeg = async () => {
    if (!ffmpeg.loaded) {
      await ffmpeg.load();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const trimVideo = async () => {
    if (!videoFile || end - start > 30) return alert('Máximo 30 segundos');

    await loadFFmpeg();
    const inputName = 'input.mp4';
    const outputName = 'output.mp4';

    ffmpeg.FS('writeFile', inputName, await fetchFile(videoFile));

    await ffmpeg.run(
      '-ss',
      `${start}`,
      '-t',
      `${end - start}`,
      '-i',
      inputName,
      '-c',
      'copy',
      outputName
    );

    const data = ffmpeg.FS('readFile', outputName);
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    setOutputUrl(url);
  };

  return (
    <div className="p-4 space-y-4">
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {videoFile && (
        <>
          <video
            ref={videoRef}
            controls
            src={URL.createObjectURL(videoFile)}
            width={400}
          ></video>

          <div>
            <label>Inicio (s): </label>
            <input
              type="number"
              value={start}
              min={0}
              onChange={(e) => setStart(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Fin (s): </label>
            <input
              type="number"
              value={end}
              min={start}
              onChange={(e) => setEnd(Number(e.target.value))}
            />
          </div>

          <button
            onClick={trimVideo}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Recortar vídeo
          </button>
        </>
      )}

      {outputUrl && (
        <div>
          <h3>Vídeo recortado:</h3>
          <video src={outputUrl} controls width={400}></video>
          <a href={outputUrl} download="recorte.mp4" className="block mt-2 text-orange-600">
            Descargar vídeo
          </a>
        </div>
      )}
    </div>
  );
}
