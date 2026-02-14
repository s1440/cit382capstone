import { Link } from "react-router-dom";

function ListView({ posts, setPosts, currentUser }) {
  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <div className="listview-page">
      <div className="profile-card">
        <h3 className="profile-section-title">Posts</h3>

        <div className="profile-posts">
          {posts.map((post) => (
            <div key={post.id} className="profile-post">
              <Link to={`/post/${post.id}`}>
                <strong>{post.title}</strong>
              </Link>

              <div className="feed-author">By {post.author ?? "Unknown"}</div>

              <div className="profile-post-body">{post.body}</div>

              {currentUser === post.author && (
                <button onClick={() => handleDelete(post.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ListView;
