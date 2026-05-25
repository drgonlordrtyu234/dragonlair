import React from "react";
import "./styles/ShareSection.css";
import { Close, Link, Share } from "@mui/icons-material";

const ShareSection = ({ onClose }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="share-section">
      <div className="share-header">
        <h3>Share</h3>
        <Close className="close-icon" onClick={onClose} />
      </div>
      <div className="share-options">
        <button onClick={handleCopyLink}>
          <Link /> Copy Link
        </button>
        <button>
          <Share /> Share to Other Apps
        </button>
      </div>
    </div>
  );
};

export default ShareSection;
