import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import ForYou from "./components/ForYou";

// Other pages
const Following = () => <h1>Following</h1>;
const Discover = () => <h1>Discover</h1>;
const Blogs = () => <h1>Blogs</h1>;
const Live = () => <h1>Live</h1>;
const Writers = () => <h1>Writers</h1>;
const Readers = () => <h1>Readers</h1>;
const Gaming = () => <h1>Gaming</h1>;

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<ForYou />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/following" element={<Following />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/live" element={<Live />} />
          <Route path="/writers" element={<Writers />} />
          <Route path="/readers" element={<Readers />} />
          <Route path="/gaming" element={<Gaming />} />
          
          {/* Redirect unknown routes to ForYou */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
