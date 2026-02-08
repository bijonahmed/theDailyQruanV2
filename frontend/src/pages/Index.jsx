// src/pages/Index.js
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import "../assets/sura.css";
import axios from "/config/axiosConfig";
import GuestNavbar from "../components/GuestNavbar";

const Index = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  const [categorys, setParentCategory] = useState([]);
  const [childcategorys, setChildCategory] = useState([]);
  const [childCatData, setChidCategory] = useState([]);
  const [suraList, setSuraList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null);
  // Example: fetch surah list from API
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => setSuraList(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(
      "https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=2",
    )
      .then((res) => res.json())
      .then((data) => setPrayerTimes(data.data.timings))
      .catch((err) => console.error(err));
  }, []);

  // Filter surah list based on search
  const filteredSurahs = suraList?.data?.filter(
    (surah) =>
      surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surah.name.includes(searchTerm) ||
      surah.number.toString().includes(searchTerm),
  );

  const [metaData, setMetaData] = useState({
    title: "Welcome to TheDailyQuran",
    description:
      "Read, listen, and study the Quran online. Daily Quran provides Juz reading, translations, recitations, and free Islamic eBooks to help you grow in knowledge and spirituality.",
    keywords:
      "Quran, Daily Quran, Juz reading, Quran PDF, Islamic eBooks, Quran recitation, Tafsir, Hadith, Seerah",
  });

  useEffect(() => {
    const animateLink = document.createElement("link");
    animateLink.rel = "stylesheet";
    animateLink.type = "text/css";
    animateLink.href = "/assets/css/animate.css";
    document.head.appendChild(animateLink);

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.type = "text/css";
    styleLink.href = "/demo_assets/css/style.css";
    document.head.appendChild(styleLink);

    return () => {
      document.head.removeChild(animateLink);
      document.head.removeChild(styleLink);
    };
  }, []);

  return (
    <div>
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
      </Helmet>
      {/* Body Wrap - Start */}
      <div className="page_wrapper">
        {/* Back To Top - Start */}
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>
        {/* Back To Top - End */}
        {/* Header Section - Start
================================================== */}
        <GuestNavbar />

        <main className="page_content">
          {/* <div> {loading && <Loader />} </div> */}
          {loading ? (
            <center>
              {" "}
              <Loader />
            </center>
          ) : (
            <section className="hero_section mouse_move">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col col-lg-10">
                    <div className="hero_content">
                      {/* <div class="badge">Education Site Template</div> */}
                      <h1 className="cd-headline clip is-full-width">
                        <span className="cd-words-wrapper d-none">
                          <b className="is-visible">Read</b>
                          <b className="is-visible">Understand</b>
                          <b className="is-visible">Reflect</b>
                        </span>

                        <span>Learn the Quran, One Day at a Time</span>
                      </h1>

                      {/* Decorative Shapes */}
                      <div
                        className="deco_item deco_img_1"
                        data-parallax='{"y" : -200, "smoothness": 6}'
                        style={{
                          transform: "translate3d(0px, 0px, 0px)",
                          WebkitTransform: "translate3d(0px,0px,0px)",
                        }}
                      >
                        <img
                          src="/assets/images/shapes/image_2.png"
                          alt="Line Shape"
                        />
                      </div>

                      <div
                        className="deco_item deco_img_2"
                        data-parallax='{"y" : 200, "smoothness": 6}'
                        style={{
                          transform: "translate3d(0px, 0.005px, 0px)",
                          WebkitTransform: "translate3d(0px,0.005px,0px)",
                        }}
                      >
                        <img
                          src="/assets/images/shapes/image_1.png"
                          alt="Dot Shape"
                        />
                      </div>

                      <div className="prayer-section">
                        <small
                          className="text-center mt-4 py-5"
                          style={{
                            padding: "20px 10px", // top & bottom padding
                            fontSize: "1rem",
                          }}
                        >
                          Bangladesh — Daily Prayer Times
                        </small>

                        {prayerTimes ? (
                          <div>
                            <div className="row justify-content-center mobile-two-columns mt-1">
                              {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map(
                                (prayer, index) => (
                                  <div
                                    key={index}
                                    className="col-6 col-md-auto text-center"
                                  >
                                    <div className="prayer-item border rounded">
                                      <div className="prayer-name">
                                        {prayer}
                                      </div>
                                      <div className="prayer-time">
                                        {prayerTimes[prayer]}
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        ) : (
                          <p className="text-center text-white">
                            Loading prayer times...
                          </p>
                        )}
                      </div>

                      <center>
                        <Link className="btn btn_primary " to="/juz">
                          <span>
                            <small>Reading Quran JUZ</small>
                            <small>Reading Quran JUZ</small>
                          </span>
                          <i className="far fa-angle-double-right ms-1" />
                        </Link>
                      </center>
                      <a
                        className="scrollspy-btn nav-link"
                        href="#counter_section"
                      >
                        <i className="far fa-angle-double-down" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section
            className="feature_section section_space_lg"
            id="counter_section"
          >
            <div className="container">
              <div
                className="section_title text-center wow fadeInUp"
                data-wow-delay=".1s"
              >
                <h4 className="mb-0">
                  <span className="d-md-block">
                    Connect your heart with the Quran through daily reading and
                    reflection.
                  </span>
                  Begin your journey today!
                </h4>
              </div>

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
                <div className="row justify-content-center">
                  {filteredSurahs?.map((surah) => (
                    <div
                      className="col col-lg-4 col-md-6 col-sm-6 wow bounceInUp"
                      data-wow-delay=".1s"
                      key={surah.number}
                    >
                      <div className="feature_item text-center">
                        <div className="item_icon">
                          <span className="surah-number">{surah.number}</span>
                        </div>

                        <h3 className="item_title">
                          <Link
                            to={`/surah/${surah.englishName.toLowerCase()}`}
                            style={{ textDecoration: "none" }}
                          >
                            &nbsp;&nbsp;{surah.englishName}
                          </Link>
                        </h3>

                        <p className="surah-name-arabic">{surah.name}</p>
                        <small>&nbsp;&nbsp;{surah.numberOfAyahs} Ayahs</small>
                      </div>
                    </div>
                  ))}

                  {filteredSurahs?.length === 0 && (
                    <p className="text-center mt-4">No Surah found</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
