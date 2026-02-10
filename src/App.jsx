import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

import AppNavBar from "./pages/AppNavBar.jsx";
import Home from "./pages/Home.jsx";
import PopUp from "./pages/PopUp.jsx";
import ListView from "./pages/ListView.jsx";
import NewPost from "./pages/NewPost.jsx";
import DetailView from "./pages/DetailView.jsx";
import Profile from "./pages/profiles.jsx";

import "./index.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [postsLoaded, setPostsLoaded] = useState(false);

  const [user, setUser] = useState(null); // { email, name }
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [showPopUp, setShowPopUp] = useState(false);

  // Load posts once
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosts(savedPosts);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPostsLoaded(true);
  }, []);

  // Save posts after initial load
  useEffect(() => {
    if (!postsLoaded) return;
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts, postsLoaded]);

  // Load user once
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Save user when it changes (but don’t overwrite with null)
  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  function handleLogin() {
    const email = loginEmail.trim();
    if (!email.includes("@")) return;

    const name = email.split("@")[0];
    setUser({ email, name });

    setShowPopUp(false);
    setLoginEmail("");
    setLoginPassword("");
  }

  function addPost({ title, body }) {
    const author = user?.name ?? "Guest";

    const newPost = {
      id: Date.now(),
      title,
      body,
      author,
    };

    setPosts((prev) => [...prev, newPost]);
  }

  function deletePost(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <BrowserRouter>
      <AppNavBar onLoginClick={() => setShowPopUp(true)} />

      <PopUp showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
        <div className="popup-box">
          <input
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </div>
      </PopUp>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<ListView posts={posts} />} />
        <Route path="/create" element={<NewPost onAddPost={addPost} />} />
        <Route
          path="/post/:id"
          element={<DetailView posts={posts} onDeletePost={deletePost} />}
        />
        <Route
          path="/profile"
          element={
            <Profile user={user} posts={posts} onDeletePost={deletePost} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
