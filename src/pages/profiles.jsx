{
  /* component */
}

import { Link } from "react-router-dom";

function Profile({ user, posts, onDeletePost }) {
  const myName = user?.name;
  const myPosts = myName
    ? posts.filter((p) => !p.author || p.author === myName)
    : [];

  // placeholders for now (Week 5 is fine with this)
  const following = 0;
  const followers = 0;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>Hello {myName ?? "Guest"}</h2>

        <div className="profile-stats">
          <div className="stat">
            <strong>{myPosts.length}</strong>
            <div>Posts</div>
          </div>
          <div className="stat">
            <strong>{following}</strong>
            <div>Following</div>
          </div>
          <div className="stat">
            <strong>{followers}</strong>
            <div>Followers</div>
          </div>
        </div>

        <h3 className="profile-section-title">Posts</h3>

        {!user ? (
          <p>Please log in to see your posts.</p>
        ) : myPosts.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className="profile-posts">
            {myPosts.map((p) => (
              <div key={p.id} className="profile-post">
                <Link to={`/post/${p.id}`}>
                  <strong>{p.title}</strong>
                </Link>
                <div className="profile-post-body">{p.body}</div>
                <button
                  type="button"
                  onClick={() => onDeletePost(p.id)}
                  style={{ marginTop: "8px" }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
