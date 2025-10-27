import React, { useState } from "react";

export default function LoginPage() {
  const [apiKey, setApiKey] = useState(localStorage.getItem("openai-key") || "");

  const saveKey = () => {
    if (!apiKey.trim()) return alert("Please enter your OpenAI API key!");
    localStorage.setItem("openai-key", apiKey);
    alert("✅ API key saved locally!");
  };

  const loginWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #e59191ff 0%, #d58d8dff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          background: "#c6d65cff",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          padding: "40px 50px",
          width: "360px",
          color: "white",
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          textAlign: "center",
          animation: "fadeIn 0.6s ease-in-out",
        }}
      >
        <h1 style={{ fontSize: "1.8rem", marginBottom: "10px",color: "#000000ff" }}>📬 GMAIL CLASSIFIER USING OPEN AI</h1>
        <p style={{ fontSize: "0.95rem", color: "#5f4646d4", marginBottom: "25px" }}>
          Login with Google to fetch and classify your emails using AI.
        </p>

        <input
  type="text"
  value={apiKey}
  onChange={(e) => setApiKey(e.target.value)}
  placeholder="Enter your OpenAI API key"
  style={{
    padding: "12px",
    width: "100%",
    borderRadius: "10px",
    border: "2px solid #667eea", 
    outline: "none",
    marginBottom: "15px",
    textAlign: "center",
    backgroundColor: "transparent", 
    color: "black",
    fontWeight: 500,
    fontSize: "1rem",
  }}
/>

        <button
          onClick={saveKey}
          style={{
            width: "70%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "white",
            color: "black",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.7s ease",
            marginBottom: "10px",
          }}
          onMouseOver={(e) => (e.target.style.background = "#868a6bff")}
          onMouseOut={(e) => (e.target.style.background = "rgba(255, 255, 255, 0.83)")}
        >
          💾 Save API Key
        </button>

        <button
          onClick={loginWithGoogle}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "#0659deff",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.25s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#0ae72bff")}
          onMouseOut={(e) => (e.target.style.background = "#0632f6ff")}
        >
          🔑 GMAIL LOGIN
        </button>

        <p
          style={{
            marginTop: "20px",
            fontSize: "0.8rem",
            color: "rgba(31, 30, 30, 1)",
          }}
        >
          Your OpenAI API key is stored locally and never sent to our server.
        </p>
      </div>

      {/* Simple keyframes animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
