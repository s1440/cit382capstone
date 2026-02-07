import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavBar from "./pages/AppNavBar";
//youtube video
//when the URL is '/' then render the home component and everything in home.jsx will appear
import Home from "./pages/Home";
//for popUp
import { useState, useEffect } from 'react';
import PopUp from './pages/PopUp';
import './index.css';
import ListView from "./pages/ListView";
import NewPost from "./pages/NewPost";
import DetailView from "./pages/DetailView";
import LoginForm from "./components/loginForm"; // adjust path if your file is somewhere else


//import NewEntryView from "./NewEntryView";

function CreatePost() {
  return <h2>Create Post</h2>;
}

function Feed() {
  return <h2>Feed</h2>;
}

//Nav Bar infomation
function App() {

   //## THIS IS THE INFO CODE FOR LOGIN INFOMATION ##
  //this creates a state called posts, initializes it as an emtry array and this is array will store all user-created posts
  // const posts = current statue value. Is all posts on the site
  // const setPosts = function to update it. setPosts is posted added, deleted or edited
  const [posts, setPosts] = useState(() => {
    return JSON.parse(localStorage.getItem("posts")) || [];
  });


   //App level state to track whether a user is logged in
   const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
   });
   // stores who is logged in 
   //is loggedin only tells true/false, currentUser tells us which user
   //when the login form is submitted setCurrentUser tells the app "this is an active user now"
   const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem("currentUser");
   });

   // callback passed to login form
   const handleLogin = (username, password) => {
    if (!username || !password) return; 
      setIsLoggedIn(true); // mark user as logged in
      setCurrentUser(username); //store who is logged in
      // remember login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", username);

      //close popup
      setShowPopUp(false);
   };

  // Called when the user clicks "Logout"
  const handleLogout = () => {
    // Clear React state
    setIsLoggedIn(false);
    setCurrentUser(null);

    // Remove persisted login data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
  };

   //react componet that represents login form UI (inputs for user and password and submit button)
   //by using LoginForm it's rendering that componet inside App.jsx
   // onLogin={handleLogin is how you send data from a parent componet to a child componet
   //<LoginForm onLogin={handleLogin} />
  //useEffct runs things react doesn't do automatically (load and save data) 
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);
 

  // Login button set as true
  // this state lives in app.jsx
  const [showPopUp, setShowPopUp] = useState(false);

  return (

    <BrowserRouter>
      {/* Navbar with login trigger */}
      <AppNavBar onLoginClick={() => setShowPopUp(true)}
        isLoggedIn={isLoggedIn} 
        currentUser={currentUser} 
        onLogout={handleLogout}
   />

  
        {/* Login Popup */}
        <PopUp
          showPopUp={showPopUp}
          closePopUp={() => setShowPopUp(false)}
        >
          <LoginForm onLogin={handleLogin} />
        </PopUp>

        <Routes>
          <Route path="/feed" element={<ListView posts={posts} setPosts={setPosts} currentUser={currentUser} />} />
          <Route path="/new" element={<NewPost setPosts={setPosts} />} />
          <Route
          path="/post/:id"
          element={<DetailView posts={posts} setPosts={setPosts} />}
        />
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;

