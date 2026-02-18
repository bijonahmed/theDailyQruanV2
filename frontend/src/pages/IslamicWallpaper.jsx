// src/pages/IslamicWallpaper.js
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import Footer from "../components/Footer";
import "../assets/wallpapers.css"; // your existing styles

const API_KEY = "heXb8ozLpboqjXVhzh72of8x5RN99CuMkQnAo6xbHppn9gCqYCXo07PM";
const perPage = 20;

const categories = [
  "mosque",
  "masjid nabawi",
  "kaaba mecca",
  "madinah mosque",
  "islamic calligraphy art",
  "allah name calligraphy",
  "prophet muhammad calligraphy",
  "ramadan kareem",
  "eid mubarak islamic",
  "islamic pattern art",
  "quran book",
  "dua islamic",
  "tasbih beads",
  "hijab muslimah",
  "islamic wallpaper dark",
  "islamic wallpaper hd",
  "mecca night",
  "islamic architecture",
  "hajj pilgrimage",
  "islamic art abstract",
];

const IslamicWallpaper = () => {
  const [photos, setPhotos] = useState([]);
  const [currentQuery, setCurrentQuery] = useState("islamic wallpaper");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");

  const [metaData] = useState({
    title: "Islamic Wallpaper - The Daily Quran",
    description:
      "Download beautiful Islamic wallpapers with Quranic verses, calligraphy, and inspiring Islamic designs. The Daily Quran provides high quality Islamic wallpapers for your mobile and desktop.",
    keywords:
      "Islamic Wallpaper, Quran Wallpaper, Islamic Background, Quranic Verses Wallpaper, Islamic HD Wallpaper, The Daily Quran",
  });

  // Load Photos
  const loadPhotos = async (query = currentQuery, page = currentPage) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`,
        { headers: { Authorization: API_KEY } },
      );
      const data = await res.json();
      setPhotos(data.photos);
      setLoading(false);
      setZoomLevel(1);
      setCurrentIndex(null);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadPhotos();
  }, []);

  // Pagination
  const changePage = (page) => {
    setCurrentPage(page);
    loadPhotos(currentQuery, page);
  };

  // Search
  const searchPhotos = () => {
    const query = searchTerm || "islamic wallpaper";
    setCurrentQuery(query);
    setCurrentPage(1);
    loadPhotos(query, 1);
    setActiveCategory("");
  };

  // Category
  const selectCategory = (cat) => {
    setCurrentQuery(cat);
    setCurrentPage(1);
    loadPhotos(cat, 1);
    setActiveCategory(cat);
    setSearchTerm("");
  };

  // Modal controls
  const openModalAtIndex = (index) => {
    setCurrentIndex(index);
    setZoomLevel(1);
  };
  const closeModal = () => setCurrentIndex(null);

  const nextImage = () => {
    if (currentIndex < photos.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const prevImage = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const zoomIn = () => setZoomLevel((z) => z + 0.2);
  const zoomOut = () => setZoomLevel((z) => Math.max(0.5, z - 0.2));
  const resetZoom = () => setZoomLevel(1);

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

        {/* Banner */}
        <section className="page_banner decoration_wrap">
          <div className="container text-center mt-5">
            <h1 className="page_heading">Islamic Wallpaper</h1>
            <p className="page_subheading">
              Discover beautiful Islamic wallpapers featuring Quranic verses,
              inspiring duas, and elegant Arabic calligraphy. Download
              high-quality Islamic backgrounds for your mobile and desktop to
              stay spiritually inspired every day.
            </p>
          </div>
        </section>

        <main className="page_content container py-5">
          {/* Search */}
          <div className="row mb-3">
            <div className="col-md-8 mx-auto">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search wallpapers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && searchPhotos()}
                />
                <button className="btn btn-success" onClick={searchPhotos}>
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="category-wrapper text-center mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-outline-light ${activeCategory === cat ? "active" : ""}`}
                onClick={() => selectCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status" />
            </div>
          ) : (
            <div className="row" id="gallery">
              {photos.map((photo, index) => (
                <div
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  key={photo.id}
                >
                  <div className="card shadow">
                    <img
                      src={photo.src.large}
                      className="card-img-top"
                      alt="Islamic Wallpaper"
                      onClick={() => openModalAtIndex(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <nav>
            <ul className="pagination justify-content-center mt-4 flex-wrap">
              {[...Array(5)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <span className="page-link" onClick={() => changePage(i + 1)}>
                    {i + 1}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Modal */}
          {currentIndex !== null && photos[currentIndex] && (
            <div
              className="modal fade show d-block"
              style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
              onClick={closeModal}
            >
              <div className="modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
                <div
                  className="modal-content p-3 text-center"
                  onClick={(e) => e.stopPropagation()}
                  style={{ backgroundColor: "#111", borderRadius: "20px" }}
                >
                  <div className="modal-img-wrapper mb-3">
                    <img
                      src={photos[currentIndex].src.large2x}
                      alt="Wallpaper"
                      className="modal-img rounded"
                      style={{
                        transform: `scale(${zoomLevel})`,
                        maxHeight: "90vh",
                        transition: "transform 0.3s ease",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Zoom & Download Buttons */}
                  <div className="d-flex justify-content-center flex-wrap mb-3">
                    <button
                      className="btn btn-success btn-sm m-1"
                      onClick={zoomIn}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-warning btn-sm m-1"
                      onClick={zoomOut}
                    >
                      -
                    </button>
                    <button
                      className="btn btn-secondary btn-sm m-1"
                      onClick={resetZoom}
                    >
                      Reset
                    </button>
                    <a
                      href={photos[currentIndex].src.original}
                      download={`${currentQuery}-${currentIndex + 1}.jpg`}
                      className="btn btn-primary btn-sm m-1"
                    >
                      Download
                    </a>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="d-flex justify-content-center flex-wrap">
                    <button
                      className="btn btn-outline-light btn-sm m-1"
                      onClick={prevImage}
                      disabled={currentIndex === 0}
                    >
                      ⬅ Previous
                    </button>
                    <button
                      className="btn btn-outline-light btn-sm m-1"
                      onClick={nextImage}
                      disabled={currentIndex === photos.length - 1}
                    >
                      Next ➡
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default IslamicWallpaper;
