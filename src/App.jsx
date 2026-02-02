import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavBar from "./pages/AppNavBar";
//youtube video
//when the URL is '/' then render the home component and everything in home.jsx will appear
import Home from "./pages/Home";
<<<<<<< HEAD
//for popUp
import React, { useState, useEffect } from 'react';
import PopUp from './pages/PopUp';
import './index.css';
import ListView from "./pages/ListView";
import NewPost from "./pages/NewPost";
import DetailView from "./pages/DetailView";

=======
import Profile from "./pages/profiles";

//for popUp
import React, { useState } from "react";
import PopUp from "./pages/PopUp";
import "./index.css";
>>>>>>> a128f804dc4253b6a2d5713ff3f7a0a4975d364a

import NewEntryView from "./NewEntryView";

function CreatePost() {
  return <h2>Create Post</h2>;
}

function Feed() {
  return <h2>Feed</h2>;
}

//Nav Bar infomation
function App() {
<<<<<<< HEAD
  //this creates a state called posts, initializes it as an emtry array and this is array will store all user-created posts
  // const posts = current statue value. Is all posts on the site
  // const setPosts = function to update it. setPosts is posted added, deleted or edited
   const [posts, setPosts] = useState([]);


   //useEffct runs things react doesn't do automatically (load and save data) 
   useEffect (() => {
    //localStorage stores data user key "post"
    //JSON sovers thing back to JS value
    // || [] prevents crash 
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    //updates react state
    setPosts(savedPosts);
   }, []);
   //this saves the posts 
   useEffect (() => {
    localStorage.setItem("posts", JSON.stringify(posts));
   
   }, [posts]);


=======
>>>>>>> a128f804dc4253b6a2d5713ff3f7a0a4975d364a
  // Login button set as true
  // this state lives in app.jsx
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <BrowserRouter>
      {/* Navbar with login trigger */}
      <AppNavBar onLoginClick={() => setShowPopUp(true)} />

<<<<<<< HEAD
        {/* Login Popup */}
        {/*everything in PopUp becomes 'childern' automatically */}
        <PopUp
          showPopUp={showPopUp}
          //passing a function into Popup that when called will hide the popup
          closePopUp={() => setShowPopUp(false)}
        >
          <div className="popup-box">
            <input placeholder="Email" />
            <input placeholder="Password" type="password" />
            <button>Login</button>
          </div>
        </PopUp>

        <Routes>
          <Route path="/feed" element={<ListView posts={posts} />} />
          <Route path="/new" element={<NewPost setPosts={setPosts} />} />
          <Route
          path="/post/:id"
          element={<DetailView posts={posts} setPosts={setPosts} />}
        />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    
=======
      {/* Login Popup */}
      <PopUp showPopUp={showPopUp} closePopUp={() => setShowPopUp(false)}>
        <h2>Login</h2>
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <button>Login</button>
      </PopUp>

      <Routes>
        {/* This variable controls which part of the UI is visible: */}
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {/* {showPopUp === "new" && (
        <div>
          <h2>New Entry View</h2>
        </div>
      )}

      {showPopUp === "list" && (
        <div>
          <h2>List View</h2>
        </div>
      )}
      <button onClick={() => setShowPopUp("new")}>New</button>
      <button onClick={() => setShowPopUp("list")}>List</button> */}
      {/* When the view changes, this data persists: everything except for: the words above the buttons "List View" and "New Entry View"*/}
    </BrowserRouter>
>>>>>>> a128f804dc4253b6a2d5713ff3f7a0a4975d364a
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
