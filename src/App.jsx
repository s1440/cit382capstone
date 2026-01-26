/* import {useState} from 'react';

const CATEGORIES = ["School", "Work", "Personal",
"Health", "Other"];

function App() {

  //add a state variable to controll the visibility of a block (div) of text
  const [showNewEntry, setShowNewEntry] = useState(true);
const [category, setCategory] = useState(CATEGORIES[1]);
const [catergories, setCatergories] = useState(CATEGORIES);

//setCatergories([...catergories, "Fun"]);

  return(
    <div>
      <h1>Capstone Starter</h1>
      
      {showNewEntry && (
        <div>
          <h2>New Entry (Test View)</h2>
          <div>
            <label>
              Category:{" "}
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                  {c}
                  </option>
                ))}
                </select>
            </label>
            </div>
            <p>Selected category: {category}</p>
        </div>
        )}
        <button onClick={() => setShowNewEntry(!showNewEntry)}>
        {showNewEntry ? "Hide New Entry": "Show New Entry"} </button>
    </div>
  );
}
export default App;



*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppNavBar from "./pages/AppNavBar";
//youtube video
//when the URL is '/' then render the home component and everything in home.jsx will appear
import Home from "./pages/Home";
import Profile from "./pages/profiles";

//for popUp
import React, { useState } from "react";
import PopUp from "./pages/PopUp";
import "./index.css";

import NewEntryView from "./NewEntryView";

function CreatePost() {
  return <h2>Create Post</h2>;
}

function Feed() {
  return <h2>Feed</h2>;
}

//Nav Bar infomation
function App() {
  // Login button set as true
  // this state lives in app.jsx
  const [showPopUp, setShowPopUp] = useState(false);

  return (
    <BrowserRouter>
      {/* Navbar with login trigger */}
      <AppNavBar onLoginClick={() => setShowPopUp(true)} />

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
