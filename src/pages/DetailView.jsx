import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DetailView({ posts, setPosts }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // ✅ Load data when view appears
  useEffect(() => {
    const foundPost = posts.find((p) => p.id === Number(id));
    setPost(foundPost);
  }, [id, posts]);

  // ✅ Save changes whenever state updates
  function handleChange(e) {
    const updatedPost = { ...post, body: e.target.value };
    setPost(updatedPost);

    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );
  }

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>

      <textarea
        value={post.body}
        onChange={handleChange}
      />
    </div>
  );
}
