import React, { useState, useEffect } from "react";
import VideoPlayer from "./VideoPlayer";
import videoData from "../data/videoData";

const userPreferences = {
  likedCategories: ["Tech", "Music", "Sports"],
  watchHistory: ["video1.mp4", "video5.mp4"],
  engagement: { "video1.mp4": 5, "video3.mp4": 2 },
};

const getForYouVideos = (videoData) => {
  return videoData
    .map((video) => ({
      ...video,
      score:
        (userPreferences.likedCategories.includes(video.category) ? 5 : 0) +
        (userPreferences.watchHistory.includes(video.videoUrl) ? 3 : 0) +
        (userPreferences.engagement[video.videoUrl] || 0) * 2,
    }))
    .sort((a, b) => b.score - a.score);
};

const ForYou = () => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    setRecommendedVideos(getForYouVideos(videoData));
  }, []);

  return <VideoPlayer videos={recommendedVideos} initialVideoIndex={0} />;
};

export default ForYou;
