import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email contains an "@" and matches hardcoded credentials
    if (email === "JohnDoe@gmail.com" && password === "you") {
      navigate("/projects");  // Navigate to the home page on successful login
    } else if (!email.includes("@")) {
      setError("Invalid email format. Please include an '@' symbol.");
    } else {
      setError("Wrong login details, please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        maxWidth: "300px",
        margin: "50px auto",  // Center the form vertically as well
        textAlign: "center",
        border: "1px solid #ddd",  // Optional: a slight border for distinction
        borderRadius: "5px",  // Optional: rounded corners
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",  // Optional: add shadow for depth
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              margin: "10px 0",
              boxSizing: "border-box",  // Ensure padding doesn't mess with the width
              border: "1px solid #ccc",  // Light border for input
              borderRadius: "4px",  // Rounded input field
            }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "10px",
              width: "100%",
              margin: "10px 0",
              boxSizing: "border-box",  // Ensure padding doesn't mess with the width
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              cursor: "pointer",
              width: "100%",
              borderRadius: "4px",  // Same rounded style for button
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "green";
              e.target.style.color = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "black";
              e.target.style.color = "white";
            }}
          >
            Login
          </button>
        </div>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
      <p style={{ marginTop: "15px" }}>
        New user? <a href="/register" style={{ color: "blue" }}>Register here</a>
      </p>
    </div>
  );
};

export default Login;
