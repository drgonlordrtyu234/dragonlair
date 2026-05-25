import React, { useState, useRef, useEffect, useReducer, useCallback } from "react";
import "./styles/VideoPlayer.css";
import "./styles/animations.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaEllipsisH,
  FaChevronUp,
  FaChevronDown,
  FaPlay,
  FaPause,
  FaExpand,
} from "react-icons/fa";

const videoReducer = (state, action) => {
  switch (action.type) {
    case "SET_PLAYING":
      return state.map((video, index) =>
        index === action.index ? { ...video, playing: action.playing } : { ...video, playing: false }
      );
    case "SET_PROGRESS":
      return state.map((video, index) =>
        index === action.index
          ? { ...video, progress: action.progress, duration: action.duration }
          : video
      );
    case "INIT":
      return action.payload;
    default:
      return state;
  }
};

const VideoPlayer = ({ videos = [], initialVideoIndex = 0 }) => {
  const videoRefs = useRef([]);
  const containerRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);
  const [showOptions, setShowOptions] = useState(null);

  const [videoStates, dispatch] = useReducer(videoReducer, []);

  useEffect(() => {
    dispatch({
      type: "INIT",
      payload: videos.map(() => ({ playing: false, progress: 0, duration: 0 })),
    });
  }, [videos]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos]);

  useEffect(() => {
    playVideoAtIndex(currentVideoIndex);
  }, [currentVideoIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentVideoIndex]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowDown") {
        handleNext();
      } else if (event.key === "ArrowUp") {
        handlePrev();
      } else if (event.key === "Enter" || event.code === "Space") {
        handlePlayPause(currentVideoIndex, event);
      }
    },
    [currentVideoIndex]
  );

  const playVideoAtIndex = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          video.currentTime = 0;
          video.play().catch(() => {});
          dispatch({ type: "SET_PLAYING", index, playing: true });
        } else {
          video.pause();
          dispatch({ type: "SET_PLAYING", index: i, playing: false });
        }
      }
    });

    scrollToVideo(index);
  };

  const handlePlayPause = (index, event) => {
    event.stopPropagation();
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play();
      dispatch({ type: "SET_PLAYING", index, playing: true });
    } else {
      video.pause();
      dispatch({ type: "SET_PLAYING", index, playing: false });
    }

    scrollToVideo(index);
  };

  const handleMoreOptions = (index, event) => {
    event.stopPropagation();
    setShowOptions((prev) => (prev === index ? null : index));
  };

  const handleSaveVideo = (index, event) => {
    event.stopPropagation();
    const video = videoRefs.current[index];
    if (!video) return;

    const videoSrc = video.querySelector("source").src;
    const a = document.createElement("a");
    a.href = videoSrc;
    a.download = `video-${index + 1}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    alert("Video saved!");
  };

  const handleReportVideo = (index, event) => {
    event.stopPropagation();
    alert(`Reported video ${index + 1}`);
    setShowOptions(null);
  };

  const handleFullscreen = (index, event) => {
    event.stopPropagation();
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  const handleTimeUpdate = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    dispatch({
      type: "SET_PROGRESS",
      index,
      progress: (video.currentTime / video.duration) * 100,
      duration: video.duration,
    });
  };

  const scrollToVideo = (index) => {
    if (!videoRefs.current[index]) return;

    setTimeout(() => {
      videoRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100); // Slight delay to ensure smoothness

    setCurrentVideoIndex(index);
  };

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="video-container" ref={containerRef}>
      {videos.length === 0 ? (
        <p>No videos available</p>
      ) : (
        <>
          {currentVideoIndex > 0 && (
            <button className="nav-btn up" onClick={handlePrev}>
              <FaChevronUp size={30} />
            </button>
          )}

          <div className="video-list">
            {videos.map((video, index) => {
              const videoState = videoStates[index] || { playing: false, progress: 0 };

              return (
                <div key={index} className="video-wrapper">
                  <button className="control-btn play-btn" onClick={(e) => handlePlayPause(index, e)}>
                    {videoState.playing ? <FaPause /> : <FaPlay />}
                  </button>

                  <button className="control-btn fullscreen-btn" onClick={(e) => handleFullscreen(index, e)}>
                    <FaExpand />
                  </button>

                  <button className="control-btn options-btn" onClick={(e) => handleMoreOptions(index, e)}>
                    <FaEllipsisH />
                  </button>

                  {showOptions === index && (
                    <div className="options-menu">
                      <button onClick={(e) => handleReportVideo(index, e)}>Report Video</button>
                      <button onClick={(e) => handleSaveVideo(index, e)}>Save Video</button>
                    </div>
                  )}

                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="video"
                    loop
                    playsInline
                    muted
                    autoPlay={index === currentVideoIndex}
                    onClick={(e) => handlePlayPause(index, e)}
                    onTimeUpdate={() => handleTimeUpdate(index)}
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                  </video>

                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${videoState.progress}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
