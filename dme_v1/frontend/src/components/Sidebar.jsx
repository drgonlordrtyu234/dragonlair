import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaUserFriends, FaCompass, FaBlog, FaVideo, FaPenNib, FaBook, FaGamepad, FaBell, FaSearch } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Sidebar.css";
import logo from "../assets/logo.svg"; // Ensure the path is correct

const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== "/following") {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }, [location.pathname]);

  const menuItems = [
    { name: "For You", icon: <FaHome />, path: "/" },
    { name: "Following", icon: <FaUserFriends />, path: "/following" },
    { name: "Discover", icon: <FaCompass />, path: "/discover" },
    { name: "Blogs", icon: <FaBlog />, path: "/blogs" },
    { name: "Live", icon: <FaVideo />, path: "/live", notifications: 3 },
    { name: "Writers", icon: <FaPenNib />, path: "/writers" },
    { name: "Readers", icon: <FaBook />, path: "/readers" },
    { name: "Gaming", icon: <FaGamepad />, path: "/gaming" },
  ];

  return (
    <div ref={sidebarRef} className={`sidebar ${isExpanded ? "expanded" : "collapsed"} d-flex flex-column bg-black text-white vh-100 p-3`}>
      
      {/* Logo Only (No Company Name) */}
      <div className="d-flex justify-content-center mb-3">
        <img src={logo} alt="DME Logo" className="sidebar-logo" />
      </div>

      {/* Search Bar */}
      {isExpanded && (
        <div className="input-group mb-3">
          <span className="input-group-text bg-transparent border-0 text-white">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control bg-transparent text-white border-0"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && <span className="search-text">| Search</span>}
        </div>
      )}

      {/* Menu Items */}
      <nav className="menu flex-grow-1">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-container">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `menu-item d-flex align-items-center text-white text-decoration-none p-2 rounded mb-2 ${isActive ? "active-menu" : "bg-transparent"}`
              }
            >
              <div className="menu-icon fs-5 me-2">{item.icon}</div>
              {isExpanded && <span className="fs-6">{item.name}</span>}
              {item.notifications && <span className="badge bg-danger ms-auto">{item.notifications}</span>}
            </NavLink>
          </div>
        ))}
      </nav>

      {/* Separator */}
      <hr className="sidebar-divider border-light" />

      {/* Footer */}
      {isExpanded && (
        <div className="sidebar-footer text-center small">
          <p className="mb-1">DME Company Program</p>
          <p className="mb-0">Terms and Policies 2025</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
