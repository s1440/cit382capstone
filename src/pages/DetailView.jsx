import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailView({ posts, setPosts }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // NEW: edit-mode state + draft body
  const [isEditing, setIsEditing] = useState(false);
  const [draftBody, setDraftBody] = useState("");

  // Load data when view appears
  useEffect(() => {
    const foundPost = posts.find((p) => p.id === Number(id));
    setPost(foundPost);

    if (foundPost) {
      setDraftBody(foundPost.body);
      setIsEditing(false);
    }
  }, [id, posts]);

  // NEW: only update draft while typing
  function handleDraftChange(e) {
    setDraftBody(e.target.value);
  }

  // NEW: save only when user clicks Save
  function handleSave() {
    const updatedPost = { ...post, body: draftBody };
    setPost(updatedPost);

    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );

    setIsEditing(false);
  }

  // NEW: cancel editing
  function handleCancel() {
    setDraftBody(post.body);
    setIsEditing(false);
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>

      {!isEditing ? (
        <>
          <p>{post.body}</p>
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      ) : (
        <>
          <textarea value={draftBody} onChange={handleDraftChange} />
          <button type="button" onClick={handleSave}>
            Save
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      )}
    </div>
  );
}
