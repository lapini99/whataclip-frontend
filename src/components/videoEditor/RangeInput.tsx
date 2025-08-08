import React, { ReactNode, FormEvent } from "react";
import Image from "next/image";
import * as helpers from "./helpers";

interface VideoMeta {
  duration: number;
}

interface RangeInputProps {
  thumbNails: string[];
  rEnd: number;
  rStart: number;
  handleUpdaterStart: (event: FormEvent<HTMLInputElement>) => void;
  handleUpdaterEnd: (event: FormEvent<HTMLInputElement>) => void;
  loading: boolean;
  control: ReactNode;
  videoMeta: VideoMeta;
}

export default function RangeInput({
  thumbNails,
  rEnd,
  rStart,
  handleUpdaterStart,
  handleUpdaterEnd,
  loading,
  control,
  videoMeta,
}: RangeInputProps): React.JSX.Element | null {
  const RANGE_MAX: number = 100;
  
  if (loading) {
    return (
      <center>
        <h2> processing thumbnails.....</h2>
      </center>
    );
  }

  return (
    <>
      <div className="range_pack">
        <div className="image_box">
          {thumbNails.length > 0 ? (
            thumbNails.map((imgURL, id) => (
              <Image 
                src={imgURL} 
                alt={`sample_video_thumbnail_${id}`} 
                key={id}
                width={100}
                height={60}
                style={{ objectFit: 'cover' }}
              />
            ))
          ) : (
            <div 
              style={{ 
                width: '100%', 
                height: '60px', 
                backgroundColor: '#f0f0f0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#666',
                fontSize: '14px'
              }}
            >
              Video preview will appear here
            </div>
          )}
          <div
            className="clip_box"
            style={{
              width: `calc(${rEnd - rStart}% )`,
              left: `${rStart}%`,
            }}
            data-start={helpers.toTimeString(
              (rStart / RANGE_MAX) * videoMeta.duration,
              false
            )}
            data-end={helpers.toTimeString(
              (rEnd / RANGE_MAX) * videoMeta.duration,
              false
            )}
          >
            <span className="clip_box_des"></span>
            <span className="clip_box_des"></span>
          </div>
          <input
            className="range"
            type="range"
            min={0}
            max={RANGE_MAX}
            onInput={handleUpdaterStart}
            value={rStart}
          />
          <input
            className="range"
            type="range"
            min={0}
            max={RANGE_MAX}
            onInput={handleUpdaterEnd}
            value={rEnd}
          />
        </div>
      </div>
      {control}
    </>
  );
}