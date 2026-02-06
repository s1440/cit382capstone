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

App.jsx → owns login state - isLoggedIn - currentUsser - handleLogin - no inputs - no forms

LoginForm.jsx → owns login UI + behavior - username + password state - form - submit handler - calls onLogin (user, password) - no global state - no routing

PopUp.jsx → owns modal display - shows/ hides model
-blocks background clicks
-renders - no login logic
-no state
