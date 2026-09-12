import React, { useState } from "react";
import "./styles.css";

export default function Login({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:8000/api/unlock/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      if (res.ok) onSuccess();
      else setError("Invalid password. Try again.");
    } catch {
      setError("Server error. Please try later.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome to My Gallery</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={{padding: "10px 20px", borderRadius:"8px", background:"#1976d2", color:"#fff"}}>Unlock</button>
        {error && <p style={{color:"red", marginTop:"10px"}}>{error}</p>}
      </form>
    </div>
  );
}
