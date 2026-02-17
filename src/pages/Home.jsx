const demoPosts = [
  {
    id: 1,
    username: "Sasha",
    caption: "Try this creamy and smooth cheesecake!",
    link: "https://sugarspunrun.com/best-cheesecake-recipe/",
    image: "/cheesecake.jpg",
  },
  {
    id: 2,
    username: "Sophie",
    caption: "My favorite, super easy, pancakes!",
    link: "https://www.allrecipes.com/recipe/45396/easy-pancakes/",
    image: "/pancakeschoco.png",
  },
];

function PostCard({ post }) {
  return (
    <div className="post-card">
      <p>
        <strong>{post.username}</strong>
      </p>
      <p>{post.caption}</p>
      {post.link && (
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="recipe-link"
        >
          View Recipe
        </a>
      )}

      <img className="image" src={post.image} alt="" />
    </div>
  );
}

function Home() {
  return (
    <div className="home-page">
      <h2>Welcome to Cookn' Share!</h2>
      <h5>Share and find recipes</h5>
      <img src="/logosmall.png" alt="Delicious food" className="home-hero" />
      <h9>Continue Scrolling</h9>
      <h8> ⬇️</h8>

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
      <div className="home-favs">
        {demoPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
