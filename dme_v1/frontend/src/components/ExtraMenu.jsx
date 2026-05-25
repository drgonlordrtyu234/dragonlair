import React, { useRef, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/VideoPlayer.css";
import { FaHeart, FaCommentDots, FaShare, FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const VideoPlayer = ({ videos }) => {
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      let newIndex = currentIndex;
      videoRefs.current.forEach((video, index) => {
        if (video) {
          const rect = video.getBoundingClientRect();
          if (rect.top >= 50 && rect.bottom <= window.innerHeight - 50) {
            newIndex = index;
          }
        }
      });

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }, [currentIndex]);

  const togglePlayPause = () => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const video = videoRefs.current[currentIndex];
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextVideo = () => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container-fluid video-container">
      <div className="row justify-content-center">
        {videos.map((video, index) => (
          <div key={index} className="col-md-8 col-lg-6 video-wrapper">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video}
              loop
              className="video-player"
              playsInline
              muted={isMuted}
            />
            {/* Video Controls */}
            {index === currentIndex && (
              <div className="video-controls">
                <button className="btn btn-dark control-btn" onClick={prevVideo}>
                  <FaStepBackward />
                </button>
                <button className="btn btn-dark control-btn" onClick={togglePlayPause}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="btn btn-dark control-btn" onClick={nextVideo}>
                  <FaStepForward />
                </button>
                <button className="btn btn-dark control-btn" onClick={toggleMute}>
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              </div>
            )}
            {/* Floating Actions */}
            <div className="floating-actions">
              <button className="action-btn">
                <FaHeart />
              </button>
              <button className="action-btn">
                <FaCommentDots />
              </button>
              <button className="action-btn">
                <FaShare />
              </button>
            </div>
            {/* Progress Bar */}
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(index / videos.length) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
