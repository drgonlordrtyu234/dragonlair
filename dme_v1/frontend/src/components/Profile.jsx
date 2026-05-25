import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div
      className="position-fixed top-0 end-0 m-3 p-1 bg-dark rounded-circle shadow"
      style={{
        cursor: "pointer",
        zIndex: 1000,
        width: "50px",
        height: "50px",
        overflow: "hidden",
      }}
      onClick={() => navigate("/profileinfo")}
    >
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="Profile"
        className="w-100 h-100 rounded-circle"
      />
    </div>
  );
};

export default Profile;
