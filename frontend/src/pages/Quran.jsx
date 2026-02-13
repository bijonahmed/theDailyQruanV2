import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import GuestNavbar from "../components/GuestNavbar";
import "../assets/surah.css";
import "../assets/quranStyles.css"; // external CSS

const Quran = () => {
  const [editions, setEditions] = useState({});
  const [languages, setLanguages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedLang, setSelectedLang] = useState("");
  const [selectedEdition, setSelectedEdition] = useState(null);
  const [quranData, setQuranData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // default dark
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedVerse, setCopiedVerse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch editions
  useEffect(() => {
    const fetchEditions = async () => {
      try {
        const res = await fetch(
          "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@latest/editions.json",
        );
        const data = await res.json();
        setEditions(data);

        const langs = Array.from(
          new Set(Object.values(data).map((e) => e.language)),
        ).sort();
        setLanguages(langs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEditions();
  }, []);

  // Fetch Quran for selected edition
  useEffect(() => {
    if (!selectedEdition) return;
    setLoading(true);
    const fetchQuran = async () => {
      try {
        const res = await fetch(editions[selectedEdition].link);
        const data = await res.json();
        setQuranData(data.quran);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchQuran();
  }, [selectedEdition, editions]);

  // Filter editions
  const filteredEditions = Object.entries(editions).filter(
    ([key, e]) =>
      (!selectedLang || e.language === selectedLang) &&
      e.name.toLowerCase().includes(search.toLowerCase()),
  );
  const formatEditionName = (name) => {
    if (!name) return "";
    return name
      .replace(/-/g, " ") // replace dashes with space
      .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize first letter of each word
  };

  return (
    <div>
      <Helmet>
        <title>The Daily Quran</title>
      </Helmet>

      <GuestNavbar />

      <div className="page_wrapper">
        <main className="page_content page_content bg_info">
          <section className="page_banner decoration_wrap">
            <div className="container text-center mt-5">
              <h1 className="page_heading">Quran Translation</h1>
              <section className="page_banner decoration_wrap">
                <div className="container text-center mt-1">
                  <p
                    className="page_subheading"
                    style={{
                      textAlign: "center", // ensures center alignment
                      maxWidth: "700px", // optional: keep message from stretching too wide
                      margin: "0 auto", // center horizontally
                      fontSize: "18px",
                      color: "#555", // subtle color
                    }}
                  >
                    Explore the Quran in multiple languages. Select a language
                    and click a translation to start reading.
                  </p>
                </div>
              </section>
            </div>
          </section>

          {/* Filter & Search */}
          <section className="container mt-4 filter_bar">
            <select
              className="lang_dropdown"
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
            >
              <option value="">All Languages</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <input
              type="text"
              className="search_box"
              placeholder="Search editions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </section>

          {/* Editions Grid */}
          <section className="container mt-4 grid_wrapper">
            {filteredEditions.map(([key, e]) => (
              <div
                key={key}
                className="edition_card"
                onClick={() => setSelectedEdition(key)}
              >
                <div>
                  <strong>
                    <center>{formatEditionName(e.name)}</center>
                  </strong>
                </div>
                <hr />
                <p>
                  <strong>Author:</strong> {e.author}
                </p>
                <p>
                  <strong>Language:</strong> {e.language}
                </p>
                {/* <p>
                  <strong>Source:</strong> {e.source}
                </p> */}
              </div>
            ))}
            {filteredEditions.length === 0 && <p>No editions found.</p>}
          </section>

          {/* Loader */}
          {loading && <Loader />}

          {/* Modal for Quran Text */}
          {selectedEdition && !loading && (
            <div
              className={`modal_overlay_fullscreen ${darkMode ? "dark" : "light"}`}
              onClick={() => setSelectedEdition(null)}
            >
              <div
                className="modal_content_fullscreen"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="close_btn"
                  onClick={() => setSelectedEdition(null)}
                >
                  ✖
                </button>

                {/* Modal Header with Switch and Copy All */}
                <div className="modal_header">
                  <h3 className="modal_title">
                    {formatEditionName(editions[selectedEdition].name)}
                  </h3>

                  <div className="header_actions">
                    {/* Dark/Light Switch */}
                    <div className="mode_switch">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={darkMode}
                          onChange={() => setDarkMode(!darkMode)}
                        />
                        <span className="slider round"></span>
                      </label>
                      <span className="switch_label">
                        {darkMode ? "Dark Mode" : "Light Mode"}
                      </span>
                    </div>

                    {/* Copy All SVG */}
                    <img
                      width="30"
                      height="30"
                      src="https://img.icons8.com/ios/50/copy--v1.png"
                      alt="copy"
                      style={{
                        cursor: "pointer",
                        transition: "filter 0.3s",
                        filter: darkMode ? "invert(1)" : "invert(0)",
                      }}
                      onClick={() => {
                        const allText = quranData
                          .map(
                            (v) =>
                              `Surah ${v.chapter} - Ayah ${v.verse}: ${v.text}`,
                          )
                          .join("\n\n");
                        navigator.clipboard.writeText(allText);
                        setCopiedAll(true);
                        setTimeout(() => setCopiedAll(false), 2000);
                      }}
                    />

                    <div className="copy_all_icon_wrapper" title="Copy All">
                      {copiedAll && (
                        <span className="copied_feedback_all">Copied All!</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quran Viewer */}
                {/* Search Input */}
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                  <input
                    type="text"
                    placeholder='Search: "Surah 1" or "Ayah 3"'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      fontSize: "16px",
                      width: "250px",
                      border: "1px solid #ccc",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                </div>

                {/* Quran Viewer */}
                <div className="json_container">
                  {quranData
                    .filter((verse) => {
                      if (!searchTerm) return true;

                      const lower = searchTerm.toLowerCase().trim();

                      if (lower.startsWith("surah")) {
                        const surahNumber = lower.replace("surah", "").trim();
                        return verse.chapter.toString() === surahNumber;
                      }

                      if (lower.startsWith("ayah")) {
                        const ayahNumber = lower.replace("ayah", "").trim();
                        return verse.verse.toString() === ayahNumber;
                      }

                      // fallback: match any number typed
                      return (
                        verse.chapter.toString().includes(lower) ||
                        verse.verse.toString().includes(lower)
                      );
                    })
                    .map((verse, idx) => (
                      <div key={idx} className="verse_card">
                        <div className="verse_header_wrapper">
                          <p className="verse_header">
                            Surah {verse.chapter} - Ayah {verse.verse}
                          </p>

                          {/* Individual Copy Icon */}
                          <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/ios/50/copy--v1.png"
                            alt="copy"
                            style={{
                              cursor: "pointer",
                              transition: "filter 0.3s",
                              filter: darkMode ? "invert(1)" : "invert(0)",
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText(verse.text);
                              setCopiedVerse(idx);
                              setTimeout(() => setCopiedVerse(null), 1500);
                            }}
                          />
                        </div>

                        <p className="verse_text">{verse.text}</p>
                        {copiedVerse === idx && (
                          <span className="copied_feedback">Copied!</span>
                        )}

                        {/* Source Link */}
                        {verse.source && (
                          <div
                            style={{
                              marginTop: "8px",
                              fontSize: "12px",
                              textAlign: "right",
                              color: darkMode ? "#ffffffaa" : "#555",
                            }}
                          >
                            Source:{" "}
                            <a
                              href={verse.source}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: darkMode ? "#4cd137" : "#1e5631",
                              }}
                            >
                              {verse.source}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Quran;