'use client';

import { useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import * as helpers from "./helpers";
import VideoFilePicker from "./VideoFilePicker";
import OutputVideo from "./OutputVideo";
import RangeInput from "./RangeInput";

interface VideoMeta {
  name: string;
  duration: number;
  videoWidth: number;
  videoHeight: number;
}

const ffmpeg = new FFmpeg();

export default function VideoEditor(): React.JSX.Element {
  const [inputVideoFile, setInputVideoFile] = useState<File | null>(null);
  const [trimmedVideoFile, setTrimmedVideoFile] = useState<string | null>(null);
  const [trimIsProcessing, setTrimIsProcessing] = useState<boolean>(false);
  const [videoMeta, setVideoMeta] = useState<VideoMeta | null>(null);
  const [URL, setURL] = useState<string | null>(null);
  const [rStart, setRstart] = useState<number>(0); // 0%
  const [rEnd, setRend] = useState<number>(10); // 10%
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState<boolean>(false);

  // Mock function for getThumbnails - replace with actual implementation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getThumbnails = async (meta: VideoMeta): Promise<string[]> => {
    setThumbnailIsProcessing(true);
    try {
      // This is a placeholder - implement actual thumbnail generation logic
      const thumbnailArray: string[] = [];
      // For now, return empty array - you'll need to implement actual FFmpeg thumbnail generation
      return thumbnailArray;
    } finally {
      setThumbnailIsProcessing(false);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    console.log(file);
    setInputVideoFile(file);
    const base64URL = await helpers.readFileAsBase64(file);
    setURL(base64URL as string);
  };

  const handleLoadedData = async (e: React.SyntheticEvent<HTMLVideoElement>): Promise<void> => {
    const el = e.target as HTMLVideoElement;
    if (!inputVideoFile) return;
    
    const meta: VideoMeta = {
      name: inputVideoFile.name,
      duration: el.duration,
      videoWidth: el.videoWidth,
      videoHeight: el.videoHeight,
    };
    console.log({ meta });
    const thumbnails = await getThumbnails(meta);
    setThumbnails(thumbnails);
    setVideoMeta(meta);
  };

  const handleUpdateRange = (func: (value: number) => void) => {
    return (event: React.FormEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      func(Number(target.value));
    };
  };

  const handleTrim = async (): Promise<void> => {
    if (!videoMeta || !inputVideoFile) return;
    
    setTrimIsProcessing(true);
    const startTime = ((rStart / 100) * videoMeta.duration).toFixed(2);
    const offset = ((rEnd / 100) * videoMeta.duration - Number(startTime)).toFixed(2);
    try {
      // Load FFmpeg if not already loaded
      if (!ffmpeg.loaded) {
        await ffmpeg.load();
      }
      
      await ffmpeg.writeFile(inputVideoFile.name, await fetchFile(inputVideoFile));
      await ffmpeg.exec([
        "-ss",
        helpers.toTimeString(startTime),
        "-i",
        inputVideoFile.name,
        "-t",
        helpers.toTimeString(offset),
        "-c:v",
        "copy",
        "ping.mp4"
      ]);
      const data = await ffmpeg.readFile("ping.mp4");
      console.log(data);
      const dataURL = await helpers.readFileAsBase64(
        new Blob([data], { type: "video/mp4" }) as File
      );
      setTrimmedVideoFile(dataURL as string);
    } catch (error) {
      console.log(error);
    } finally {
      setTrimIsProcessing(false);
    }
  };

  return (
    <main className="videoeditor">
      {videoMeta && (
        <>
          <RangeInput
            rEnd={rEnd}
            rStart={rStart}
            handleUpdaterStart={handleUpdateRange(setRstart)}
            handleUpdaterEnd={handleUpdateRange(setRend)}
            loading={thumbnailIsProcessing}
            videoMeta={videoMeta}
            control={
              <div className="u-center">
                <button
                  onClick={handleTrim}
                  className="btn btn_b"
                  disabled={trimIsProcessing}
                >
                  {trimIsProcessing ? "trimming..." : "trim selected"}
                </button>
              </div>
            }
            thumbNails={thumbnails}
          />
        </>
      )}
      <div className="u-center">
        <button
          onClick={handleTrim}
          className="btn btn_b"
          disabled={trimIsProcessing}
        >
          {trimIsProcessing ? "trimming..." : "trim selected"}
        </button>
      </div>
      <section className="deck">
        <article className="grid_txt_2">
          <VideoFilePicker
            handleChange={handleChange}
            showVideo={!!inputVideoFile}
          >
            <div className="bord_g_2 p_2">
              <video
                src={inputVideoFile && URL ? URL : undefined}
                autoPlay
                controls
                muted
                onLoadedMetadata={handleLoadedData}
                width="450"
              ></video>
            </div>
          </VideoFilePicker>
        </article>
        <OutputVideo
          videoSrc={trimmedVideoFile}
          handleDownload={() => trimmedVideoFile && helpers.download(trimmedVideoFile)}
        />
      </section>
    </main>
  );
}