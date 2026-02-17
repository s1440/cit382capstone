import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewPost({ onAddPost, user }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      alert("Please log in first.");
      return;
    }

    if (!title.trim() || !body.trim()) {
      alert("Please fill out both fields.");
      return;
    }

    onAddPost({ title, body, link, image });

    navigate("/profile");
  }

  return (
    <div className="newpost-page">
      <form className="newpost-form" onSubmit={handleSubmit}>
        <h2>Create Post</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post..."
        />
        <input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Optional recipe link"
        />

        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Optional image URL"
        />

        <button>Create</button>
      </form>
    </div>
  );
}

export default NewPost;

/* import { useState } from "react";
import { useNavigate } from "react-router-dom";

//creates react componet and makes it the default export
//receives setposts fromm App.jsx

function NewPost({ onAddPost }) {
  //title stores the input value
  //starts as an emptry string and setTitle updates the value
  //this controls the title input field

  const [title, setTitle] = useState("");
  //sotres the post content and keeps UI and state in sync
  const [body, setBody] = useState("");
  //gives function to changes routes and is used after the post is created
  const navigate = useNavigate();

  //runs when the form is submitted and is triggered by clicking the button or pressing enter
  function handleSubmit(e) {
    // Stops the brower's default form submission
    //keeps everything inside react
    e.preventDefault();

    //builds a post object, 'ID' ensures uniqueness and uses current state values
    /*const newPost = {
      id: Date.now(),
      title,
      body,
      author: currentUser || "Unknown",
    };
    
    //adds the new post to the array and triggers a re-render everywhere
    //setPosts is the state updater function created by useState
    //(prev) => is the previous state of posts
    //...prev = “take all items in the previous array and include them here”
    // [ ...prev, newPost ] = a new array with everything in prev, plus newPost at the end.
    //setPosts((prev) => [...prev, newPost]);
    //sends the user back to the feed
    navigate("/feed");
  }

    

  return (
    //handles submit logic and allows enter key submission
    <form onSubmit={handleSubmit}>
      <h2>New Post</h2>

      {/*value comes from state
    onChange updates state
    React is the source of truth 
    
    input element is used for the user to type text*/
/*}
  <input
    //sets the current value of the input to the 'title' state.
    //{title} means insert the JS variable title into JSX.
    //this makes the input a controlled component
    value={title}
    /*onChange = react event listenr, fires every time the user types, deletes or pastes
        (e) represents the input event
        e.target - the input element itself
        .value - current text inside the input
        
        Updates React state with the new input

        Because value={title}, the input instantly reflects the new value

        React re-renders any component that uses title

    onChange={(e) => setTitle(e.target.value)}
    //Shows temporary gray text inside the input when it’s empty
    placeholder="Title"
 /* />;

  {
    /*Same pattern, just for multi-line text */
/* }
}

export default NewPost; */
