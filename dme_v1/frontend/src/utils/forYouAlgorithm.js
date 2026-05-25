import videoData from "../data/videoData";

// Sample user preferences & watch history (replace with real user data)
const userPreferences = {
  likedCategories: ["Tech", "Music", "Sports"], // Preferred categories
  watchHistory: ["video1.mp4", "video5.mp4"], // Previously watched videos
  engagement: {
    "video1.mp4": 5, // Watched 5 times
    "video3.mp4": 2, // Watched 2 times
  },
};

/**
 * Rank videos based on:
 * - Category match (higher weight)
 * - Watch history (medium weight)
 * - Engagement (higher weight for frequently watched)
 */
export const getForYouVideos = () => {
  return videoData
    .map((video) => {
      let score = 0;

      // Boost score if video category matches user preferences
      if (userPreferences.likedCategories.includes(video.category)) {
        score += 5;
      }

      // Boost score if video was watched before (lower weight)
      if (userPreferences.watchHistory.includes(video.videoUrl)) {
        score += 3;
      }

      // Boost score for high engagement (repeat watches)
      if (userPreferences.engagement[video.videoUrl]) {
        score += userPreferences.engagement[video.videoUrl] * 2;
      }

      return { ...video, score };
    })
    .sort((a, b) => b.score - a.score); // Sort by highest score
};
