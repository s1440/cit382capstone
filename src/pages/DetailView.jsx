import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailView({ posts, setPosts }) {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isEditMode = new URLSearchParams(location.search).get("edit") === "1";

  const [post, setPost] = useState(null);
  const [draftBody, setDraftBody] = useState("");
  const [draftLink, setDraftLink] = useState("");
  const [draftImage, setDraftImage] = useState("");

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === Number(id));
    setPost(foundPost);
    if (foundPost) {
      setDraftBody(foundPost.body ?? "");
      setDraftLink(foundPost.link ?? "");
      setDraftImage(foundPost.image ?? "");
    }
  }, [id, posts]);

  if (!post) return <p>Loading...</p>;

  function handleSave() {
    const updatedPost = {
      ...post,
      body: draftBody,
      link: draftLink,
      image: draftImage,
    };

    setPost(updatedPost);

    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );

    navigate(`/post/${post.id}`); // go back to read-only view
  }

  function handleCancel() {
    setDraftBody(post.body ?? "");
    setDraftLink(post.link ?? "");
    setDraftImage(post.image ?? "");
    navigate(`/post/${post.id}`);
  }

  return (
    <div className="detail-page">
      <div className="detail-card">
        <h2>{post.title}</h2>

        {!isEditMode ? (
          <>
            <p>{post.body}</p>

            {post.link && (
              <p>
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
              </p>
            )}

            {post.image && (
              <img src={post.image} alt="" className="feed-image" />
            )}
          </>
        ) : (
          <>
            <textarea
              value={draftBody}
              onChange={(e) => setDraftBody(e.target.value)}
            />

            <input
              value={draftLink}
              onChange={(e) => setDraftLink(e.target.value)}
              placeholder="Optional recipe link"
            />

            <input
              value={draftImage}
              onChange={(e) => setDraftImage(e.target.value)}
              placeholder="Optional image URL"
            />

            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
