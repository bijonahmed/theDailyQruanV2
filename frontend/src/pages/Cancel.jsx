// src/pages/About.js
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#fff5f5",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <Helmet>
        <title>Cancel</title>
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
        <h2 style={{ color: "#f44336", marginBottom: "20px" }}>Transaction Cancelled</h2>
        <p style={{ fontSize: "18px", color: "#333", marginBottom: "30px" }}>
          Your purchase has been canceled. If this was a mistake, feel free to try again.
        </p>
        <Link
          to="/complete-guide"
          style={{
            textDecoration: "none",
            backgroundColor: "#f44336",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            fontSize: "16px",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#d32f2f")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#f44336")}
        >
          Back 
        </Link>
      </div>
    </div>
  );
};

export default Cancel;
