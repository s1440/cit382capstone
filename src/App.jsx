import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavBar from "./pages/AppNavBar";
//youtube video
//when the URL is '/' then render the home component and everything in home.jsx will appear
import Home from "./pages/Home";
//for popUp
import React, { useState, useEffect } from "react";
import PopUp from "./pages/PopUp";
import "./index.css";
import ListView from "./pages/ListView";
import NewPost from "./pages/NewPost";
import DetailView from "./pages/DetailView";
import Profile from "./pages/profiles.jsx";

function CreatePost() {
  return <h2>Create Post</h2>;
}

function Feed() {
  return <h2>Feed</h2>;
}

//Nav Bar infomation
function App() {
  //this creates a state called posts, initializes it as an emtry array and this is array will store all user-created posts
  // const posts = current statue value. Is all posts on the site
  // const setPosts = function to update it. setPosts is posted added, deleted or edited
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [postsLoaded, setPostsLoaded] = useState(false);

  //useEffct runs things react doesn't do automatically (load and save data)
  useEffect(() => {
    //localStorage stores data user key "post"
    //JSON sovers thing back to JS value
    // || [] prevents crash
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    //updates react state
    setPosts(savedPosts);
    setPostsLoaded(true);
  }, []);

  //this saves the username
  useEffect(() => {
    if (!user) return;
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  //this loads the username
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Login button set as true
  // this state lives in app.jsx
  const [showPopUp, setShowPopUp] = useState(false);

  //this saves the posts
  useEffect(() => {
    if (!postsLoaded) return;
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts, postsLoaded]);

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
    if (!user) return;

    const newPost = {
      id: Date.now(),
      title,
      body,
      author: user.name,
    };

    setPosts((prev) => [...prev, newPost]);
  }

  function deletePost(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <BrowserRouter>
      {/* Navbar with login trigger */}
      <AppNavBar onLoginClick={() => setShowPopUp(true)} />

      {/* Login Popup */}
      {/*everything in PopUp becomes 'childern' automatically */}
      <PopUp
        showPopUp={showPopUp}
        //passing a function into Popup that when called will hide the popup
        closePopUp={() => setShowPopUp(false)}
      >
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
        <Route path="/feed" element={<ListView posts={posts} />} />

        <Route
          path="/post/:id"
          element={<DetailView posts={posts} onDeletePost={deletePost} />}
        />

        <Route path="/" element={<Home />} />
        <Route path="/create" element={<NewPost onAddPost={addPost} />} />
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

/*
Observations:
- Data that persisted across views: Everything except for the words above the buttons "List View" and "New View"
- Data that reset when views changed: The words above the buttons "List View" and "New View"
*/

/*
Possible future side effects in this app:
- Something that should happen when a view appears: It should load all of the previous entries.
- Something that should happen when data changes: Update a list when a new entry is added
*/

/*
Reflection:
- One thing that surprised me about switching views: It is a lot simpler than I thought it would be. 
- One thing that felt confusing: making the NewEntryView.jsx was confusing as I wasn't exactly sure what to add at first
- One question I have about how React manages data: I am honeslty still confused on what needs to be taken off app.jsx after adding NewEntryView.jsx
*/
