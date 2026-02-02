

const demoPosts = [
  {
    id: 1,
    username: "Sasha",
    caption: "Trying this cheesecake hack",
    image: "/steak.avif"
  },
  {
    id: 2,
    username: "Sophie",
    caption: "One-pan dumplings that actually work",
    image: "/orange_chicken.webp"
  }
];


function PostCard ({ post }) {
  return(
    <div className="post-card">
      <p><strong>{post.username}</strong></p>
      <p>{post.caption}</p>
      <img className= "image" src={post.image} alt="" />
    </div>
  );
}

function Home() {
  return (
    <>
      <h2>Welcome to the Home Page!</h2>
      <h3>Check out what's viral:</h3>

      <iframe
        width="420"
        height="315"
        src="https://www.youtube.com/embed/Z_f3mxa1R98"
        
        title="japanese biscoff cookie cheesecake hack"
        allowFullScreen
      />
      <iframe
        width="420"
        height="315"
        src="https://www.youtube.com/embed/tZIV9d5lV0w"
        
        title="One pan dumplings"
        allowFullScreen
      />
        {demoPosts.map(post=> (
        <PostCard key={post.id} post={post} />
      ))}

    </>
  );
}

export default Home;