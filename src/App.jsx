import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavBar from "./pages/AppNavBar";
//youtube video
//when the URL is '/' then render the home component and everything in home.jsx will appear
import Home from "./pages/Home";
//for popUp
import React, { useState, useEffect } from 'react';
import PopUp from './pages/PopUp';
import './index.css';
import ListView from "./pages/ListView";
import NewPost from "./pages/NewPost";
import DetailView from "./pages/DetailView";



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


  // Login button set as true
    const [showPopUp, setShowPopUp] = useState(true)

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
    
  );
}



export default App;
