"# cit382capstone" 

## 🧩 Component Details

### `App.jsx`
- Main component
- Manages `posts` state
- Handles `useEffect` for loading/saving posts
- Sets up routing and login popup

### `NewPost.jsx`
- Controlled form for creating posts
- Lifts new post to `App.jsx` state
- Navigates back to feed after submission

### `ListView.jsx`
- Renders all posts
- Each post links to `/post/:id`
- Shows a “New Post” link

### `DetailView.jsx`
- Displays single post details
- Allows editing and deletion
- Updates App-level state on change
