import "./styles.css";
import Dashboard from "./Dashboard";
import { useState } from "react";

const API = "http://127.0.0.1:8000";

function App() {
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function login() {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      window.location.reload(); // switch to dashboard
    } else {
      setMessage("❌ Invalid login");
    }
  }

  if (token) return <Dashboard />;

  return (
    <div style={{ maxWidth: "300px", margin: "60px auto", textAlign: "center"}}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/><br/>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/><br/>
      <button onClick={login}>Login</button>
      <p>{message}</p>
    </div>
  );
}

export default App;