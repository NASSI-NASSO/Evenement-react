import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      username === import.meta.env.VITE_ADMIN_USERNAME &&
      password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    } else {
      alert("Accès refusé");
    }
  };
  console.log(import.meta.env.VITE_ADMIN_USERNAME);
console.log(import.meta.env.VITE_ADMIN_PASSWORD);

  return (
    <form onSubmit={handleLogin}>
      <h2>Login Admin</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Connexion</button>
    </form>
  );
}
