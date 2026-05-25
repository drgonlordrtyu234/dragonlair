import { useState } from "react";
import { FaUserPlus, FaPlus, FaUserEdit, FaCog } from "react-icons/fa";
import { FiGrid, FiHeart, FiFolder } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/dashboard.css";

const DashBoard = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [projects, setProjects] = useState([]);

  return (
    <div className="container-fluid bg-dark text-white py-5 position-relative">
      <div className="container">
        {/* Profile Header */}
        <div className="text-center position-relative">
          <div
            className="bg-gradient text-white d-flex align-items-center justify-content-center position-relative"
            style={{
              height: "200px",
              background: `url(https://source.unsplash.com/1200x400/?landscape) center/cover no-repeat`,
            }}
          >
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="User Avatar"
              className="rounded-circle border border-white position-absolute"
              style={{
                width: "120px",
                height: "120px",
                top: "130px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          </div>
          <div className="mt-5">
            <h5>@username</h5>
            <p className="text-secondary">John Doe</p>
            <p className="text-light">🚀 Web3 Developer | Passion for Decentralization</p>
          </div>
          <div className="d-flex justify-content-center gap-2 mt-3">
            <button className="follow-button">
              <FaUserPlus className="me-2" /> Follow
            </button>
            <button className="edit-profile">
              <FaUserEdit size={18} />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="d-flex justify-content-center text-center mt-4">
          <div className="mx-4">
            <h3>10K</h3>
            <p className="text-secondary">Followers</p>
          </div>
          <div className="mx-4">
            <h3>500</h3>
            <p className="text-secondary">Following</p>
          </div>
          <div className="mx-4">
            <h3>25K</h3>
            <p className="text-secondary">Likes</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <ul className="nav nav-pills nav-justified mt-4 border-bottom">
          <li className="nav-item">
            <button
              className={`nav-link tab-button ${activeTab === "posts" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("posts")}
            >
              <FiGrid className="me-1" /> Posts
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link tab-button ${activeTab === "liked" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("liked")}
            >
              <FiHeart className="me-1" /> Liked
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link tab-button ${activeTab === "projects" ? "active-tab" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              <FiFolder className="me-1" /> Projects
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "posts" && <div className="text-center text-secondary">No posts yet.</div>}
          {activeTab === "liked" && <div className="text-center text-secondary">No liked content.</div>}
          {activeTab === "projects" && (
            <div className="text-center">
              {projects.length === 0 ? (
                <div className="text-secondary">
                  No projects yet.{" "}
                  <button className="btn btn-link" onClick={() => alert("Create Project")}>
                    <FaPlus className="me-1" /> Create a project
                  </button>
                </div>
              ) : (
                <div className="row">
                  {projects.map((project, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card bg-secondary text-white p-3">
                        <h5>{project.name}</h5>
                        <p>{project.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating Settings Button */}
      <button className="floating-settings-btn" onClick={() => alert("Open Settings")}>
        <FaCog size={24} />
      </button>
    </div>
  );
};

export default DashBoard;
