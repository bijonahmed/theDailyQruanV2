// src/pages/Index.js
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import GuestNavbar from "../components/GuestNavbar";
import "../assets/surah.css";
import axios from "/config/axiosConfig";

const Surah = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suraList, setSuraList] = useState([]);
  const [metaData, setMetaData] = useState({
    title: `The Daily Quran`,
    description: `Read and listen to online. Daily Quran provides translation, recitation, and detailed explanations of every Sura.",
    keywords:  Quran, Translation, Recitation, Daily Quran`,
  });

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSuraList(data))
      .catch((err) => console.error(err));
  }, []);

  // Filter surah list based on search
  const filteredSurahs = suraList?.data?.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.name.includes(searchTerm) ||
      surah.number.toString().includes(searchTerm),
  );

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
            <div className="container text-center mt-5">
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
                    <div>
                      {/* --- Search Box --- */}
                      <div className="mb-4 text-center">
                        <input
                          type="text"
                          placeholder="Search Surah by name, Arabic name or number..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="quran-search-box"
                        />
                      </div>

                      {/* --- Surah Grid --- */}
                      <div className="row justify-content-center mt-5">
                        {filteredSurahs?.map((surah) => (
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 d-flex mb-2">
                            <div
                              className="card surah-card w-100 border-0 shadow-lg text-center "
                              style={{
                                animationDelay: `${surah.number * 0.03}s`,
                              }}
                            >
                              <div className="card-body mt-3">
                                <div className="surah-badge mb-3 mx-auto">
                                  {surah.number}
                                </div>

                                <h5 className="card-title fw-bold mb-1">
                                  <Link
                                    to={`/surah/${surah.englishName.toLowerCase()}`}
                                    className="text-decoration-none text-dark"
                                  >
                                    {surah.englishName}
                                  </Link>
                                </h5>

                                <p className="fs-4 text-success mb-1 surah-arabic">
                                  {surah.name}
                                </p>

                                <span className="badge bg-light text-secondary px-3 py-2">
                                  {surah.numberOfAyahs} Ayahs
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}

                        {filteredSurahs?.length === 0 && (
                          <p className="text-center mt-4">No Surah found</p>
                        )}
                      </div>
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

export default Surah;
