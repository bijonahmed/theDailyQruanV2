import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import Footer from "../components/Footer";
import axios from "/config/axiosConfig";

const TermsAndConditions = () => {
  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
    keywords: "",
  });

  const fetchDataSEO = async () => {
    try {
      const response = await axios.get("/public/getSeoDataForHome");
      setMetaData({
        title: "Daily Quran - Terms and Conditions",
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
        <title>{metaData.title || "Loading..."}</title>
        <meta name="description" content={metaData.description || "Loading..."} />
        <meta name="keywords" content={metaData.keywords || "Loading..."} />
      </Helmet>

      <GuestNavbar />
      <div className="page_wrapper">
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>

        <main
          className="page_content"
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            backgroundColor: "#f4f1ed",
            paddingBottom: "50px",
          }}
        >
          <section className="page_banner decoration_wrap">
            <div className="container">
              <h1
                className="page_heading"
                style={{ fontSize: "3rem", fontWeight: "700", margin: "0" }}
              >
                Terms and Conditions
              </h1>
            </div>
          </section>

          <section className="container category_section" style={{ marginTop: "40px" }}>
            <div className="category2_items_wrapper row justify-content-center">
              <section
                className="terms-conditions"
                style={{
                  maxWidth: "900px",
                  width: "100%",
                  backgroundColor: "#fffdf7",
                  padding: "30px 25px",
                  borderRadius: "12px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                }}
              >
                <div className="container" style={{ color: "#4b3f2f", lineHeight: "1.8" }}>
                  <p>
                    Welcome to Daily Quran! By using our website or services, you agree to
                    these Terms and Conditions. Please read them carefully before using
                    our platform.
                  </p>

                  <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>1. Use of Our Services</h2>
                  <p>
                    You may use Daily Quran for personal, non-commercial purposes. You agree
                    not to misuse the platform or access it in a way that could disrupt
                    services or harm other users.
                  </p>

                  <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>2. Account Registration</h2>
                  <p>
                    Some features require creating an account. You must provide accurate
                    information and keep your login credentials secure. You are responsible
                    for all activity under your account.
                  </p>

                  <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>3. Content</h2>
                  <p>
                    All Quranic content and related materials provided are for educational
                    and personal use. You may not copy, distribute, or modify content for
                    commercial purposes without permission.
                  </p>

                  <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>4. User Responsibilities</h2>
                  <ul style={{ paddingLeft: "20px", marginBottom: "20px" }}>
                    <li>Respect other users and do not post harmful or offensive content.</li>
                    <li>Do not attempt to hack or disrupt the website or servers.</li>
                    <li>Ensure your use of Daily Quran complies with all applicable laws.</li>
                  </ul>

                  <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>5. Disclaimer</h2>
                  <p>
                    Daily Quran provides content for informational purposes. While we strive
                    for accuracy, we do not guarantee completeness or correctness and are
                    not liable for errors or omissions.
                  </p>

                  <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>6. Limitation of Liability</h2>
                  <p>
                    In no event shall Daily Quran be liable for any direct, indirect,
                    incidental, or consequential damages arising from your use of our
                    services.
                  </p>

                  <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>7. Termination</h2>
                  <p>
                    We may suspend or terminate your access if you violate these Terms and
                    Conditions or engage in any misuse of our services.
                  </p>

                  <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>8. Changes to Terms</h2>
                  <p>
                    Daily Quran reserves the right to modify these Terms and Conditions at
                    any time. Updated terms will be posted here with the effective date.
                    Continued use of our services indicates acceptance of the updated terms.
                  </p>

                  <h2 style={{ color: "#8b5e3c", marginTop: "25px" }}>9. Contact Us</h2>
                  <ul style={{ paddingLeft: "20px", lineHeight: "1.7" }}>
                    <li>
                      Email:{" "}
                      <a
                        href="mailto:info@dailyquran.com"
                        style={{ color: "#556b2f", textDecoration: "underline" }}
                      >
                        info@dailyquran.com
                      </a>
                    </li>
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

export default TermsAndConditions;
