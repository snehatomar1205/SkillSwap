// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.msg);

      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/explore");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form style={styles.form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
    margin: "0 auto",
  },
};

export default Login;
