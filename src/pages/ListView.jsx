import { Link } from "react-router-dom";

// {posts} is coming from <ListView posts = {posts} /> that is a lifted state from App.jsx
function ListView({ posts }) {
  return (
    <div>
      <h1>Posts</h1>
    {/* clicking on this changes the URL to /new. React router renders the NewPost view*/}
      <Link to="/new">Add New Post</Link>
        {/*this renders the posts list. Loops over the post array and creates a UI for each post. Map returns JSX (not just data)
        ex:
        posts = [
            { id: 1, title: "Hello" },
            { id: 2, title: "World" }
        ]
 */}
      {posts.map((post) => (
        //track list items 
        <div key={post.id}>
          <Link to={`/post/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ListView;
