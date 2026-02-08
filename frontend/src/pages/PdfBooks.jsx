// src/pages/Index.js
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import GuestNavbar from "../components/GuestNavbar";
import "../assets/juzz.css";
import axios from "/config/axiosConfig";

const PdfBooks = () => {
  const [loading, setLoading] = useState(true);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [childCategorys, setChildCategorys] = useState([]);
  const [metaData, setMetaData] = useState({
    title: "The Daily Quran",
    description:
      "Explore Juz  of the Quran with full translation, explanation, and recitation. Daily Quran helps you read and understand the Quran easily.",
    keywords: "Juz , Quran, Translation, Recitation, Daily Quran",
  });

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
          <section className="page_banner decoration_wrap mt-5">
            <div className="container text-center">
              <h1 className="page_heading">Quran Ebook</h1>
              <p className="page_subheading">
                Explore the Quran one Juz at a time. Read Arabic with proper
                tajweed, understand with trusted translations, and listen to
                authentic recitations. Perfect for daily learning and
                reflection.
              </p>
              <p
                className="page_note"
                style={{
                  marginTop: "20px",
                  color: "#556b2f",
                  fontWeight: "500",
                }}
              >
                We are bringing thousands of Islamic history books and
                Islamic-related eBooks for free, coming very soon!
              </p>
            </div>

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
                src="/assets/images/shapes/line_shape_1.png"
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
                src="/assets/images/shapes/dot_shape_2.png"
                alt="Dot Shape"
              />
            </div>
          </section>

          {/* Child Categories */}
          <section className="container bg_info mt-2">
            <div className="category2_items_wrapper row justify-content-center">
              <div className="col-md-12">
                <div className="cat_container">
                  <div className="container py-5">
                    <p
                      className="text-justify mb-5"
                      style={{ color: "#556b2f", lineHeight: "1.8" }}
                    >
                      We are thrilled to announce that very soon,{" "}
                      <strong>Daily Quran</strong> will bring you
                      <strong>
                        {" "}
                        thousands of Islamic history books, Hadith collections,
                        Tafsir, Seerah literature, Fiqh guides, and other
                        Islamic-related eBooks
                      </strong>{" "}
                      completely free. Our mission is to make authentic Islamic
                      knowledge accessible to everyone worldwide, whether you
                      are a student, a teacher, a researcher, or a devoted
                      seeker of knowledge. These eBooks and resources will cover
                      a wide range of topics including{" "}
                      <strong>
                        Quranic exegesis, interpretation, recitation rules
                        (Tajweed), Islamic law (Shariah), Islamic civilization,
                        spiritual guidance, and moral teachings
                      </strong>
                      . You will also find practical resources for{" "}
                      <strong>
                        memorization, daily reflections, prayer guides, study
                        schedules, Quran reading plans, and self-improvement in
                        Islamic ethics
                      </strong>
                      . We encourage our readers to actively engage with these
                      materials to strengthen their understanding of Islamic
                      teachings, enhance their spiritual journey, and apply the
                      knowledge in daily life. Please visit our Facebook page
                      for updates, new releases, and community discussions:
                      <a
                        href="https://www.facebook.com/thedailyquranstudy"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        www.facebook.com/thedailyquranstudy
                      </a>
                      . By providing high-quality PDFs and online reading
                      materials, we aim to make it easier for you to read,
                      study, and reflect on Islamic teachings anywhere, anytime.
                      Our vision is to build a comprehensive library of Islamic
                      resources that includes{" "}
                      <strong>
                        classical texts, modern interpretations, scholarly
                        articles, biographies of scholars, and historical
                        documents
                      </strong>
                      —all in one place for free access. Stay connected for
                      regular updates as new eBooks, learning materials, audio
                      recitations, and interactive study resources are added
                      every week. Whether you are looking to deepen your
                      understanding of the Quran, explore the life of the
                      Prophet (PBUH), learn about Islamic history, culture, or
                      Islamic sciences, these free resources will be invaluable
                      for your spiritual growth and intellectual development.
                      Daily Quran is committed to creating a supportive
                      community of learners, where you can benefit from curated
                      Islamic knowledge, practical guidance, and inspiration for
                      your personal and spiritual journey.
                    </p>
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

export default PdfBooks;
