interface OutputVideoProps {
  handleUpload: () => void;
  videoSrc: string | null;
}

const OutputVideo = ({ handleUpload, videoSrc }: OutputVideoProps) => {
  return videoSrc ? (
    <article className="grid_txt_2">
      <div className="bord_g_2 p_2">
        <video src={videoSrc} autoPlay controls width="450"></video>
      </div>
      {/* <button onClick={handleUpload} className="btn btn_g">
        {" "}
        Upload
      </button> */}
    </article>
  ) : null;
};

export default OutputVideo;