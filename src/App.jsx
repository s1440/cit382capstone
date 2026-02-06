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
   const [posts, setPosts] = useState([]);
   //App level state to track whether a user is logged in
   //false = user is not logged in yet
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   // stores who is logged in 
   //is loggedin only tells true/false, currentUser tells us which user
   //when the login form is submitted setCurrentUser tells the app "this is an active user now"
   const [currentUser, setCurrentUser] = useState(null);

   // callback passed to login form
   const handleLogin = (username, password) => {
    if (username && password) {
      setIsLoggedIn(true);
      setCurrentUser(username);
    }
   };

   //react componet that represents login form UI (inpits for user and password and submit button)
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
      <AppNavBar onLoginClick={() => setShowPopUp(true)} />

      {/* Welcome message */}
      <p className="loginMessage">
      {isLoggedIn ? `Welcome, ${currentUser}!` : "You are not logged in."}
      </p>

        {/* Login Popup */}
        <PopUp
          showPopUp={showPopUp}
          closePopUp={() => setShowPopUp(false)}
        >
          <LoginForm onLogin={handleLogin} />
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
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;

