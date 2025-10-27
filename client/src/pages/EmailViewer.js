import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function EmailViewer() {
  const [emails, setEmails] = useState([]);
  const [classified, setClassified] = useState([]);
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef(null);

  // Fetch emails
  const fetchEmails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/emails", {
        withCredentials: true,
      });
      setEmails(res.data.emails);
    } catch (err) {
      console.error("Error fetching emails:", err);
      alert("Failed to fetch emails. Make sure you're logged in with Google.");
    }
  };

  // Classify emails
  const classifyEmails = async () => {
    try {
      const apiKey = localStorage.getItem("openai-key");
      if (!apiKey) return alert("Please enter your OpenAI API key on login page.");

      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/classify", {
        emails,
        apiKey,
      });
      setClassified(res.data.classified);
    } catch (err) {
      console.error("Error classifying emails:", err);
      alert("Failed to classify emails.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  const categories = ["All", "Important", "Promotional", "Social", "Marketing", "Spam", "General","Unclassified"];

  const displayedEmails =
    filter === "All"
      ? classified.length > 0
        ? classified
        : emails
      : classified.filter((e) => e.category?.toLowerCase() === filter.toLowerCase());

  // Close expanded email if click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        setExpandedEmail(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f5fcad 0%, #cff1f3ff 100%)",
        padding: "40px 20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>📬 INBOX</h1>
      <p style={{ textAlign: "center", color: "#555", marginBottom: "30px" }}>
        Fetched {emails.length || 0} recent emails
      </p>

      {/* Filter & Classify */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "30px" }}>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #bbb",
            outline: "none",
            fontWeight: 500,
          }}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <button
          onClick={classifyEmails}
          disabled={loading}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            background: "#667eea",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => (e.target.style.background = "#5563c1")}
          onMouseOut={(e) => (e.target.style.background = "#667eea")}
        >
          {loading ? "Classifying..." : "Classify Emails"}
        </button>
      </div>

      {/* Email list */}
      <div style={{ display: "grid", gap: "15px", maxWidth: "800px", margin: "0 auto" }}>
        {displayedEmails.map((email) => (
          <motion.div
            key={email.id}
            layout
            onClick={() => setExpandedEmail(email)}
            whileHover={{ scale: 1.02 }}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "18px",
              border: "1px solid #ccc",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <b>{email.subject || "(No Subject)"}</b>
            <p style={{ margin: "6px 0", color: "#666" }}>
              <i>{email.from}</i>
            </p>
            <p style={{ color: "#333" }}>
              {(email.snippet || "").slice(0, 120)}...
            </p>
            {email.category && (
              <p style={{ fontSize: "0.9rem", color: "#444", marginTop: "8px" }}>
                <b>Category:</b> {email.category}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Expanded email popup */}
      <AnimatePresence>
        {expandedEmail && (
          <motion.div
            ref={overlayRef}
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              backdropFilter: "blur(3px)",
            }}
          >
            <motion.div
              key={expandedEmail.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 20 }}
              style={{
                background: "white",
                borderRadius: "16px",
                width: "600px",
                maxHeight: "80vh",
                overflowY: "auto",
                padding: "30px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                position: "relative",
              }}
            >
              <h2>{expandedEmail.subject || "(No Subject)"}</h2>
              <p style={{ color: "#777", marginBottom: "10px" }}>From: {expandedEmail.from}</p>
              <div style={{ lineHeight: "1.6", color: "#333" }} dangerouslySetInnerHTML={{ __html: expandedEmail.snippet }} />
              {expandedEmail.category && (
                <p style={{ marginTop: "15px" }}>
                  <b>Category:</b> {expandedEmail.category}
                </p>
              )}

              <button
                onClick={() => setExpandedEmail(null)}
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "none",
                  border: "none",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  color: "#444",
                }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
