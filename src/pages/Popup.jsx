import React from "react";


// showPopUp - a boolean (true or false) - inside app.jsx
// closePopUp - a function passed from the parent (setShowPopUp(false))
//childern - whenever JSX thats inside <popUp>...</PopUp>
function PopUp({ showPopUp, closePopUp, children }) {
  if (!showPopUp) return null;


  return (
    //popup-overlay makes the background dark
    //onClick-{closePopup} makes so if you click outside ethe box it closes the popup
    <div className="popup-overlay" onClick={closePopUp}>
      <div className="popup-box" // styled
        onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
      >
        <button className="close-btn" onClick={closePopUp}> 
          X
        </button> {/*this is the X button*/}
        {children}
      </div>
    </div>
  );
}

export default PopUp;