import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";

const SiteMap = () => {
  // Example SEO data; replace with dynamic data as needed
  const [childCategorys, setChidCategory] = useState([]);
  const [categorys, setParentCategory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const parentData = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get("/public/allCategorys");
      setParentCategory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const childfetchData = async () => {
    try {
      const response = await axios.get(`/public/getAllChildCaegorys`);
      setChidCategory(response.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        title: "W3-Site Map",
        description: response.data.home_pages_meta_description || "",
        keywords: response.data.home_pages_meta_keywords || "",
      });
    } catch (error) {
      console.error("Error fetching SEO data:", error);
    }
  };

  useEffect(() => {
    fetchDataSEO();
    parentData();
    childfetchData();
  }, []);
  <style>
    {`
          .sitemap-list li {
            margin-bottom: 10px;
          }

          .sitemap-list a {
            text-decoration: none;
            font-weight: 500;
            color: #0d6efd;
          }

          .sitemap-list a:hover {
            text-decoration: underline;
          }
        `}
  </style>;
  return (
    <>
      <Helmet>
        <title>{metaData.title || "Loading..."}</title>
        <meta
          name="description"
          content={metaData.description || "Loading..."}
        />
        <meta name="keywords" content={metaData.keywords || "Loading..."} />
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

        <main className="page_content">
          <section className="page_banner decoration_wrap">
            <div className="container">
              <br /> <br />
              <br />
              <h1 className="page_heading">Site Map</h1>
            </div>
          </section>

          <section className="container category_section">
            <p style={{ color: "#000", textAlign: "center" }}>
              <br />
              Daily Quran is a dedicated platform to help you connect with the
              Holy Qur’an every day. Discover selected verses, Surahs, and Juz
              designed to inspire reflection, guidance, and spiritual growth in
              your daily life.
            </p>

            <h4 style={{ color: "#000", textAlign: "center" }}>
              Explore Daily Quran
            </h4>

            <p style={{ color: "#000", textAlign: "center" }}>
              Our site map helps you easily navigate through Quranic content,
              including Surahs, Juz, and essential informational pages, so you
              can find what you need quickly and stay connected with the words
              of Allah.
            </p>

            <div className="category2_items_wrapper row justify-content-center mt-4">
              <div className="col-md-6 col-sm-10">
                <ul className="list-unstyled text-center sitemap-list">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/surah">Surahs</Link>
                  </li>
                  <li>
                    <Link to="/juz">Juz</Link>
                  </li>

                  <li>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-condition">Terms & Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
        <br />
        <Footer />
      </div>
    </>
  );
};

export default SiteMap;
