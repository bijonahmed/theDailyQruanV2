import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";

const PrivacyPolicy = () => {
  // Example SEO data; replace with dynamic data as needed
  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
    keywords: "",
  });

  const fetchDataSEO = async () => {
    try {
      const response = await axios.get("/public/getSeoDataForHome");
      // Assuming response contains title, description, and keywords
      setMetaData({
        title: "W3-Privacy Policy",
        description: response.data.home_pages_meta_description || "",
        keywords: response.data.home_pages_meta_keywords || "",
      });
    } catch (error) {
      console.error("Error fetching SEO data:", error);
    }
  };

  useEffect(() => {
    fetchDataSEO();
  }, []);

  return (
    <>
      <Helmet>
        <Helmet>
          <title>{metaData.title || "Loading..."}</title>
          <meta
            name="description"
            content={metaData.description || "Loading..."}
          />
          <meta name="keywords" content={metaData.keywords || "Loading..."} />
        </Helmet>
      </Helmet>

      <GuestNavbar />
      <div className="page_wrapper">
        {/* Back To Top - Start */}
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>

       <main className="page_content" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f4f1ed", paddingBottom: "50px" }}>
  <section className="page_banner decoration_wrap" >
    <div className="container">
      <h1 className="page_heading" style={{ fontSize: "3rem", fontWeight: "700", margin: "0" }}>Privacy Policy</h1>
    </div>
  </section>

  <section className="container category_section" style={{ marginTop: "40px" }}>
    <div className="category2_items_wrapper row justify-content-center">
      <section className="privacy-policy" style={{ maxWidth: "900px", width: "100%", backgroundColor: "#fffdf7", padding: "30px 25px", borderRadius: "12px", boxShadow: "0 6px 20px rgba(0,0,0,0.08)" }}>
        <div className="container">
          <p style={{ color: "#4b3f2f", lineHeight: "1.8", marginBottom: "20px" }}>
            Welcome to Daily Quran! We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
          </p>

          <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>1. Information We Collect</h2>
          <p style={{ lineHeight: "1.7" }}>We collect two types of information:</p>
          <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong>Personal Information:</strong> When you subscribe to Daily Quran, register an account, or contact us, we may collect your name, email address, and any other information you voluntarily provide.
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Non-Personal Information:</strong> We may collect non-identifying data such as your IP address, browser type, device information, and pages you visit to improve our website and services.
            </li>
          </ul>

          <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>2. How We Use Your Information</h2>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.7", marginBottom: "20px" }}>
            <li>Provide and improve our services and website.</li>
            <li>Respond to inquiries and provide support.</li>
            <li>Send newsletters or daily verse updates (if you opt-in).</li>
            <li>Analyze usage patterns to enhance user experience.</li>
          </ul>

          <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>3. Cookies and Tracking Technologies</h2>
          <p style={{ lineHeight: "1.7", marginBottom: "20px" }}>
            Daily Quran uses cookies and similar technologies to remember your preferences and enhance your browsing experience. You can control cookies via your browser settings, though disabling them may affect certain features.
          </p>

          <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>4. How We Protect Your Information</h2>
          <p style={{ lineHeight: "1.7", marginBottom: "20px" }}>
            We implement reasonable security measures to protect your data. However, no method of transmission over the internet is completely secure, so we cannot guarantee absolute security.
          </p>

          <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>5. Sharing Your Information</h2>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.7", marginBottom: "20px" }}>
            <li>To comply with legal obligations or court orders.</li>
            <li>To protect the rights, property, or safety of our website and users.</li>
            <li>With trusted third-party providers who help us operate the website.</li>
          </ul>

          <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>6. Third-Party Links</h2>
          <p style={{ lineHeight: "1.7", marginBottom: "20px" }}>
            Our website may contain links to other sites. We are not responsible for the privacy practices of external sites. Please review their policies when visiting.
          </p>

          <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>7. Your Choices</h2>
          <p style={{ lineHeight: "1.7", marginBottom: "20px" }}>
            You can manage email subscriptions and daily verse notifications via the unsubscribe link. You may also request updates or deletion of your personal information by contacting us directly.
          </p>

          <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>8. Children's Privacy</h2>
          <p style={{ lineHeight: "1.7", marginBottom: "20px" }}>
            Daily Quran is not intended for children under 13. We do not knowingly collect data from children. If we discover any information collected from a child under 13, it will be deleted promptly.
          </p>

          <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>9. Changes to This Privacy Policy</h2>
          <p style={{ lineHeight: "1.7", marginBottom: "20px" }}>
            We may update this Privacy Policy periodically. Updated versions will be posted here with the effective date. We encourage you to review it regularly.
          </p>

          <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>10. Contact Us</h2>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.7" }}>
            <li>Email: <a href="mailto:info@dailyquran.com" style={{ color: "#556b2f", textDecoration: "underline" }}>info@dailyquran.com</a></li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>
      </section>
    </div>
  </section>
</main>


        <br />
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
