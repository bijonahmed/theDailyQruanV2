// src/Footer.js
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="site_footer" style={{ backgroundColor: "black" }}>
        <div className="container">
          <div
            className="footer_certification_section"
            style={{ marginTop: "20px", color: "white", textAlign: "center" }}
          >
            {/* <h3 style={{ color: "white", textAlign: "center" }}>
              Get a World-Class IT Certification with w3programmer
            </h3> */}
            <p style={{ color: "white", textAlign: "center" }}>
              <br />
              Begin your day with the light of the Qur’an. The Daily Quran
              offers you a moment of reflection, guidance, and peace by sharing
              selected verses each day to strengthen your faith and connect your
              heart with Allah’s words.
            </p>

            <h4 style={{ color: "white", textAlign: "center" }}>
              Why Read the Daily Quran?
            </h4>

            <p style={{ color: "white", textAlign: "center" }}>
              The Qur’an is a source of mercy, wisdom, and healing for the
              heart. By reading a portion of the Qur’an daily, you nurture your
              soul, gain clarity in life, and stay spiritually grounded in your
              everyday journey.
            </p>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="footer_bottom">
            <ul
              className="page_list unordered_list"
              style={{ marginRight: "10px" }}
            >
              <li>
                <Link to="/">Home</Link>
              </li>
              {/* <li>
                <Link to="/why-w3">WhyW3</Link>
              </li> */}
              <li>
                <Link to="/site-map">Site Map</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-condition">Terms &amp; Condition</Link>
              </li>
            </ul>
            <p className="copyright_text mb-0" style={{ color: "white" }}>
              © Copyrights {currentYear} <Link to="#">thedailyquran</Link> All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
