// src/pages/About.js
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f7fa",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <Helmet>
        <title>Success</title>
      </Helmet>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h2 style={{ color: "#4CAF50", marginBottom: "20px" }}>Success!</h2>
        <p style={{ fontSize: "18px", color: "#333", marginBottom: "30px" }}>
          Thank you! You've successfully purchased the book.
        </p>
        <Link
          to="/complete-guide"
          style={{
            textDecoration: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default Success;
