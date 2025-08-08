interface OutputVideoProps {
  handleDownload: () => void;
  videoSrc: string | null;
}

const OutputVideo = ({ handleDownload, videoSrc }: OutputVideoProps) => {
  return videoSrc ? (
    <article className="grid_txt_2">
      <div className="bord_g_2 p_2">
        <video src={videoSrc} autoPlay controls width="450"></video>
      </div>
      <button onClick={handleDownload} className="btn btn_g">
        {" "}
        download
      </button>
    </article>
  ) : null;
};

export default OutputVideo;