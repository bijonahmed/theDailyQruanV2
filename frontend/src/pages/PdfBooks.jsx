// src/pages/Index.js
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import GuestNavbar from "../components/GuestNavbar";
import "../assets/pdf.css"; // your external CSS
import axios from "/config/axiosConfig";

const PdfBooks = () => {
  const [metaData] = useState({
    title: "The Daily Quran",
    description:
      "Explore Juz of the Quran with full translation, explanation, and recitation.",
    keywords: "Quran, Islamic Books, PDF, eBooks",
  });

  const API_KEY = "paV29H2gm56kvLPy";

  const [language, setLanguage] = useState("bn");
  const [languages, setLanguages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);

  const languagesData = [
    { langsymbol: "ar", langtranslation: "Arabic" },
    { langsymbol: "bn", langtranslation: "Bengali" },
    { langsymbol: "en", langtranslation: "English" },
    { langsymbol: "fr", langtranslation: "French" },
    { langsymbol: "ur", langtranslation: "Urdu" },
    { langsymbol: "uz", langtranslation: "Uzbek" },
    { langsymbol: "am", langtranslation: "Amharic" },
    { langsymbol: "az", langtranslation: "Azerbaijani" },
    { langsymbol: "zh", langtranslation: "Chinese" },
    { langsymbol: "lg", langtranslation: "Ganda" },
    { langsymbol: "as", langtranslation: "Assamese" },
    { langsymbol: "mos", langtranslation: "Mõõré" },
    { langsymbol: "yo", langtranslation: "Yoruba" },
    { langsymbol: "ha", langtranslation: "Hausa" },
    { langsymbol: "sx", langtranslation: "Soninke" },
    { langsymbol: "de", langtranslation: "German" },
    { langsymbol: "sw", langtranslation: "Swahili" },
    { langsymbol: "th", langtranslation: "Thai" },
    { langsymbol: "ti", langtranslation: "Tigrinya" },
    { langsymbol: "bs", langtranslation: "Bosnian" },
    { langsymbol: "ta", langtranslation: "Tamil" },
    { langsymbol: "es", langtranslation: "Spanish" },
    { langsymbol: "si", langtranslation: "Sinhala" },
    { langsymbol: "ne", langtranslation: "Nepali" },
    { langsymbol: "te", langtranslation: "Telugu" },
    { langsymbol: "id", langtranslation: "Indonesian" },
    { langsymbol: "ml", langtranslation: "Malayalam" },
    { langsymbol: "ku", langtranslation: "Kurdish" },
    { langsymbol: "fa", langtranslation: "Persian" },
    { langsymbol: "tz", langtranslation: "Tamazight" },
    { langsymbol: "ru", langtranslation: "Russian" },
    { langsymbol: "st", langtranslation: "Southern Sotho" },
    { langsymbol: "he", langtranslation: "Hebrew" },
    { langsymbol: "hi", langtranslation: "Hindi" },
    { langsymbol: "ug", langtranslation: "Uyghur" },
    { langsymbol: "ko", langtranslation: "Korean" },
    { langsymbol: "tl", langtranslation: "Tagalog" },
    { langsymbol: "ms", langtranslation: "Malay" },
    { langsymbol: "sq", langtranslation: "Albanian" },
    { langsymbol: "it", langtranslation: "Italian" },
    { langsymbol: "ka", langtranslation: "Georgian" },
    { langsymbol: "pt", langtranslation: "Portuguese" },
    { langsymbol: "uk", langtranslation: "Ukrainian" },
    { langsymbol: "ps", langtranslation: "Pashto" },
  ];

  useEffect(() => {
    const formatted = languagesData.map((lang) => ({
      symbol: lang.langsymbol,
      label: lang.langtranslation,
    }));
    setLanguages(formatted);
  }, []);

  useEffect(() => {
    loadCategories();
  }, [language]);

  const loadCategories = async () => {
    setLoadingCategories(true);
    setBooks([]);
    setSelectedCategory(null);
    try {
      const res = await axios.get(
        `https://api3.islamhouse.com/v3/561/categories/showall/${language}/json`,
      );
      setCategories(res.data || []);
    } catch (err) {
      console.log(err);
    }
    setLoadingCategories(false);
  };

  const loadBooks = async (cat) => {
    setLoadingBooks(true);
    setSelectedPdf("");
    setSelectedCategory(cat);
    try {
      const res = await axios.get(
        `https://api3.islamhouse.com/v3/${API_KEY}/main/get-category-items/${cat.source_id}/books/${language}/${language}/1/50/json`,
      );

      if (res.data.data) {
        const pdfBooks = res.data.data
          .map((book) => {
            if (book.attachments) {
              const pdf = book.attachments.find(
                (a) => a.extension_type === "PDF",
              );
              if (pdf) {
                return { title: book.title, url: pdf.url };
              }
            }
            return null;
          })
          .filter(Boolean);
        setBooks(pdfBooks);
      } else {
        setBooks([]);
      }
    } catch (err) {
      console.log(err);
      setBooks([]);
    }
    setLoadingBooks(false);
  };

  const openPdf = (url) => {
    setSelectedPdf(url);

    const listModalEl = document.getElementById("ebookListModal");
    const listModal = window.bootstrap.Modal.getInstance(listModalEl);
    if (listModal) listModal.hide();

    const readerModalEl = document.getElementById("ebookReaderModal");
    const readerModal = new window.bootstrap.Modal(readerModalEl);
    readerModal.show();
  };

  const openListModal = (cat) => {
    loadBooks(cat);

    const modalEl = document.getElementById("ebookListModal");
    const modal = new window.bootstrap.Modal(modalEl);
    modal.show();
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setSelectedPdf("");
    setBooks([]);

    const listModalEl = document.getElementById("ebookListModal");
    const readerModalEl = document.getElementById("ebookReaderModal");
    const listModal = window.bootstrap.Modal.getInstance(listModalEl);
    const readerModal = window.bootstrap.Modal.getInstance(readerModalEl);
    if (listModal) listModal.hide();
    if (readerModal) readerModal.hide();
  };

  return (
    <div>
      <Helmet>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
      </Helmet>

      <GuestNavbar />

      <div className="page_wrapper">
        <main className="page_content bg_info">
          <section className="page_banner decoration_wrap">
            <div className="container text-center">
              <h1 className="page_heading mt-5">Islamic eBook Library</h1>
              <p className="page_subheading text-center">
                Explore authentic Islamic books across 30+ languages and read
                them instantly online.
              </p>
            </div>
          </section>

          {/* Language Selector */}
          <section className="container my-3">
            <div className="language-selector d-flex justify-content-center gap-2 flex-wrap">
              {languages.map((lang) => (
                <button
                  key={lang.symbol}
                  className={`lang-btn ${language === lang.symbol ? "active" : ""}`}
                  onClick={() => setLanguage(lang.symbol)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="container">
            <div className="pdf-row bordered-row mb-2">
              <h5 className="row-title">Categories</h5>
              <div className="row g-2">
                {loadingCategories ? (
                  <div className="text-center py-4">Loading...</div>
                ) : (
                  categories.map(
                    (cat) =>
                      cat.source_id &&
                      cat.title && (
                        <div
                          key={cat.source_id}
                          className="col-lg-3 col-md-4 col-6"
                        >
                          <button
                            className="modern-grid-btn"
                            onClick={() => openListModal(cat)}
                          >
                            {cat.title}
                          </button>
                        </div>
                      ),
                  )
                )}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      {/* eBook List Modal */}
      <div
        className="modal fade"
        id="ebookListModal"
        tabIndex="-1"
        aria-labelledby="ebookListModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen-lg-down modal-xl modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content pdf-wrapper-modern">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h5 className="modal-title" id="ebookListModalLabel">
                {selectedCategory ? selectedCategory.title : "eBooks"}
              </h5>
              <button
                type="button"
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="row g-3">
                {loadingBooks ? (
                  <div className="text-center py-4">Loading...</div>
                ) : books.length > 0 ? (
                  books.map((book, index) => (
                    <div key={index} className="col-lg-3 col-md-4 col-6">
                      <button
                        className="modern-book-grid-btn"
                        onClick={() => openPdf(book.url)}
                      >
                        {book.title}
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    No books available for this category
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Reader Modal */}
      <div
        className="modal fade"
        id="ebookReaderModal"
        tabIndex="-1"
        aria-labelledby="ebookReaderModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-fullscreen modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content pdf-wrapper-modern">
            <div className="modal-header d-flex justify-content-between align-items-center">
              <button
                className="btn btn-outline-secondary"
                onClick={() => {
                  const readerModalEl =
                    document.getElementById("ebookReaderModal");
                  const readerModal =
                    window.bootstrap.Modal.getInstance(readerModalEl);
                  readerModal.hide();

                  if (selectedCategory) {
                    const listModalEl =
                      document.getElementById("ebookListModal");
                    const listModal = new window.bootstrap.Modal(listModalEl);
                    listModal.show();
                  }

                  setSelectedPdf("");
                }}
              >
                ← Back to eBooks
              </button>

              <button
                type="button"
                onClick={closeModal}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              {selectedPdf && (
                <iframe
                  src={selectedPdf}
                  title="PDF Reader"
                  className="modern-frame"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfBooks;
