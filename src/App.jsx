/*
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
*/
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
  //This stroes all registered users in the app
  //each user object will look like { email: "...", password: "...", name: "..." }
  // initialize it from localStorage so users persist after refresh
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    //if users exist in localStorage, put their info an array
    //if not, start with an empty array
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : [];
  });

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [showPopUp, setShowPopUp] = useState(false);

  //This state tracks who is currently logged in
  //it is separate from users because
  // - users = all accounts
  // - user = the active logged-in account
  // load it from localStorage so the user stays logged in after refresh
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const isLoggedIn = Boolean(user);

  //this useEffect runs whenever the logged-in user changes.
  //if a user exists, save as "currentUser"
  //if user becomes null (logout), romove from localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]); //runs when user chages

  // Whenever the list of all registered users changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  function handleRegister() {
    const email = loginEmail.trim();
    const password = loginPassword.trim();

    //runs to make sure email and password are not empty
    if (!email.includes("@") || !password) {
      alert("Please enter a valid email and password.");
      return; //stop function if invalid
    }

    //check if a user with this eamil alreadu exists
    //.find() searches through the array and returns the first element that matches a condition if not element matches, it returns undefined
    // (u) => u.email === email
    //'u' is just a placeholder variable representing each user object in the array as .find() loops over it
    // " for each user in the array, check if u.email equals the email trying to register"
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      alert("User already exists.");
      return;
    }

    //Extract name from email (everything before @)
    const name = email.split("@")[0];

    //create new user object
    const newUser = {
      email,
      password,
      name,
    };

    //add the new user to the users array
    setUsers((prevUsers) => [...prevUsers, newUser]);

    //automatically logs user in after registering
    setUser(newUser);
    setLoginEmail("");
    setLoginPassword("");
  }

  function handleLogin() {
    const email = loginEmail.trim();
    const password = loginPassword.trim();
    if (!email.includes("@") || !password) {
      alert("Enter a valid email and password.");
      return;
    }

    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existingUser) {
      alert("Invalid email or password");
      return;
    }

    //const name = email.split("@")[0];
    //const newUser = { email, name };

    setUser(existingUser);
    setShowPopUp(false);
    setLoginEmail("");
    setLoginPassword("");
  }

  function addPost({ title, body, link, image }) {
    const author = user?.name ?? "Guest";

    const newPost = {
      id: Date.now(),
      title,
      body,
      author,
      link,
      image,
    };

    setPosts((prev) => [...prev, newPost]);
  }

  function deletePost(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  function handleLogout() {
    //setting user to null logs them out
    setUser(null);
  }

  return (
    <BrowserRouter>
      <AppNavBar
        isLoggedIn={isLoggedIn}
        user={user}
        onLoginClick={() => setShowPopUp(true)}
        onLogout={handleLogout}
      />

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
          <button onClick={handleRegister}>Register</button>
        </div>
      </PopUp>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/feed"
          element={
            <ListView
              posts={posts}
              setPosts={setPosts}
              currentUser={user?.name}
            />
          }
        />
        <Route
          path="/create"
          element={<NewPost onAddPost={addPost} user={user} />}
        />

        <Route
          path="/post/:id"
          element={
            <DetailView
              posts={posts}
              setPosts={setPosts} // add this if you want edits to save
              onDeletePost={deletePost}
              currentUser={user?.name} // add this for “Edit” button visibility
            />
          }
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
