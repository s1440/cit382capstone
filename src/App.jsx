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

//for popUp
import React, { useState }from 'react';
import PopUp from './pages/PopUp';
import './index.css';


function CreatePost() {
  return <h2>Create Post</h2>;
}

function Feed() {
  return <h2>Feed</h2>;
}


//Nav Bar infomation
function App() {


  // Login button set as true
    const [showPopUp, setShowPopUp] = useState(true)

  return (
    
      <BrowserRouter>
        {/* Navbar with login trigger */}
        <AppNavBar onLoginClick={() => setShowPopUp(true)} />

        {/* Login Popup */}
        <PopUp
          showPopUp={showPopUp}
          closePopUp={() => setShowPopUp(false)}
        >
          <h2>Login</h2>
          <input placeholder="Email" />
          <input placeholder="Password" type="password" />
          <button>Login</button>
        </PopUp>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    
  );
}



export default App;
