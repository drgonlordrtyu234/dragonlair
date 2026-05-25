import React from "react";
import "./styles/CommentsSection.css";
import { Close } from "@mui/icons-material";

const CommentsSection = ({ onClose }) => {
  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3>Comments</h3>
        <Close className="close-icon" onClick={onClose} />
      </div>
      <div className="comments-list">
        <p>User1: Amazing video!</p>
        <p>User2: Love this content 🔥</p>
        <p>User3: Keep posting! ❤️</p>
      </div>
      <div className="comment-input">
        <input type="text" placeholder="Write a comment..." />
        <button>Send</button>
      </div>
    </div>
  );
};

export default CommentsSection;
