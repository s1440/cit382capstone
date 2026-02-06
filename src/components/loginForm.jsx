import {useState} from "react";

/*
  LoginForm
  -----------
  Responsibility:
  - Collect username + password from the user
  - Manage local form state
  - Notify the parent (App) when the user submits the form
  - only username/password lives in here

  It does NOT:
  - Decide what "logged in" means
  - Store global auth state
  - Control the popup visibility
*/


function LoginForm( {onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

return (

  //!!!important - think the teacher said not to use form
   //onSubmit={...} tells the form what to do when the user click submit
   //input creates a text field
   //value={username} makes the input a controlled componet 
   //onCahnge ={} fires whenever the user is typing something and updates the state in real time
   <form onSubmit={(e) => { //passes to the event handler when something happens (ex: a click of a button)
    e.preventDefault(); //prevents the page from refreshing
    onLogin(username, password); //call the app callback with the form data
   }}>
    <input 
    type="text"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    placeholder="username"
        />
    <input
    type ="text"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="password"
    />
    <button type="submit">Login</button>

</form>
)
}

export default LoginForm;