import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
 // Optional styling

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    avatar: null,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("bio", form.bio);
    formData.append("avatar", form.avatar); // Must match multer's field name

    try {
      const res = await registerUser(formData);
      localStorage.setItem("token", res.token);
      alert("Registration successful!");
      navigate("/explore");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          placeholder="Your bio"
          value={form.bio}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        {error && <p className="error-text">{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default Register;
