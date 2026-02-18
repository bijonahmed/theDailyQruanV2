// src/pages/Index.js
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import GuestNavbar from "../components/GuestNavbar";
import "../assets/juzz.css";
import axios from "/config/axiosConfig";

const Juz = () => {
  const [loading, setLoading] = useState(true);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [childCategorys, setChildCategorys] = useState([]);
  const [metaData, setMetaData] = useState({
    title: "The Daily Quran",
    description:
      "Explore Juz  of the Quran with full translation, explanation, and recitation. Daily Quran helps you read and understand the Quran easily.",
    keywords: "Juz , Quran, Translation, Recitation, Daily Quran",
  });

  const juzNumbers = Array.from({ length: 30 }, (_, i) => i + 1);

  // Fetch SEO data
  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const response = await axios.get("/public/getSeoDataForIndex");
        setMetaData({
          title: response.data.index_pages_meta_title || "ThedailyQuran",
          description:
            response.data.index_pages_meta_description ||
            "Explore the Quran one Juz at a time with reading and audio.",
          keywords:
            response.data.index_pages_meta_keywords ||
            "Quran, Juz, Read Quran, Quran Audio",
        });
      } catch (error) {
        console.error("Error fetching SEO data:", error);
      }
    };
    fetchSEO();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
      </Helmet>
      <GuestNavbar />

      <div className="page_wrapper">
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>

        <main className="page_content bg_info">
          {/* Banner Section */}
          <section className="page_banner decoration_wrap">
            <div className="container text-center  mt-5">
              <h1 className="page_heading">Quran Juz Reading & Audio</h1>
              <p className="page_subheading">
                Explore the Quran one Juz at a time. Read Arabic with proper
                tajweed, understand with trusted translations, and listen to
                authentic recitations. Perfect for daily learning and
                reflection.
              </p>
            </div>


        
          </section>

          {/* Child Categories */}
          <section className="container bg_info mt-2">
            <div className="category2_items_wrapper row justify-content-center">
              <div className="col-md-12">
                <div className="cat_container">
                  <div className="container py-5">
                    <h1 className="text-center mb-4">📖 Quran Juz List</h1>
                    <p className="text-center mb-5">
                      Click a Juz to read and listen to its recitation.
                    </p>

                    <div className="row justify-content-center">
                      {juzNumbers.map((juz) => (
                        <div key={juz} className="col-6 col-md-4 col-lg-2 mb-3">
                          <Link
                            to={`/juz/${juz}`}
                            className="btn btn-juz w-100 py-3"
                          >
                            Juz {juz}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Juz;
