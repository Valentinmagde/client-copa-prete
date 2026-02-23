import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

// Define props interface
interface VideoProps {
  className?: string; // Optional since it might not always be provided
}

const Video: React.FC<VideoProps> = ({ className = "" }) => {
  const [toggler, setToggler] = useState<boolean>(false);

  const handleToggle = (): void => {
    setToggler((prev) => !prev);
  };

  return (
    <div className="Video-content">
      <a
        onClick={handleToggle}
        className="d-flex"
        href="#"
        role="button"
        tabIndex={0}
      >
        <i className={className}></i>
      </a>
      <FsLightbox
        toggler={toggler}
        sources={["https://www.youtube.com/watch?v=YLN1Argi7ik"]}
      />
    </div>
  );
};

export default Video;
