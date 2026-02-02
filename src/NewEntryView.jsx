import { useState } from "react";

function NewEntryView() {
  // This state lives in NewEntryView.jsx
  const [showPopUp, setShowPopUp] = useState("new");

  return (
    <div>
      {showPopUp === "new" && (
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
      <button onClick={() => setShowPopUp("list")}>List</button>
      {/* After moving this JSX into a component, this stopped working: nothing stopped working but that is because I didn't seem to do it right. I used the showPopUp here as well but it doesn't seem to just transfer over like that.
        After consulting with AI, I had done some things wrong and that is why nothing had stopped working. 
        I never put in 'import { useState } from "react";*/}
    </div>
  );
}

export default NewEntryView;
