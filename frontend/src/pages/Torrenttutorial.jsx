import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import Pagination from "../components/Pagination"; // Adjust the path as needed
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "/config/axiosConfig";
import "../assets/pagination.css";
import "../assets/torrentTutorial.css";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";

const cartButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
};
const buttonGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
};

const detailsButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "#f1f1f1",
  color: "#333",
  border: "1px solid #ccc",
  borderRadius: "5px",
  textDecoration: "none",
  fontSize: "14px",
};

const Torrenttutorial = () => {
  const [torrent, setTorrentData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuerys] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const pageSize = 32; // Adjust page size as needed
  const navigate = useNavigate();
  const [activeLetter, setActiveLetter] = useState("A");

  const { addToCart } = useContext(CartContext);

  const handleOpenModal = async (service) => {
    navigate(`/guide-details/${service.slug}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
    keywords: "",
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim().length === 0) {
      setFiltered([]);
    } else {
      const filteredData = torrent.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(filteredData);
    }
  };
  const handleSelect = (slug) => {
    setSearchTerm("");
    setFiltered([]);
    navigate(`/torrent-course/${slug}`);
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await axios.get(`/public/geteServiceList`);
        // console.log("Fetched categories:", response.data); // Log the response to verify
        setServiceData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchService();
  }, []);
  const fetchDataSEO = async () => {
    try {
      const response = await axios.get("/public/getSeoDataForTorrent");
      // Assuming response contains title, description, and keywords
      setMetaData({
        title: "W3-Torrent Tutorial",
        description: response.data.torrent_pages_meta_description || "",
        keywords: response.data.torrent_pages_meta_keywords || "",
      });
    } catch (error) {
      console.error("Error fetching SEO data:", error);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const params = {
        page: currentPage,
        pageSize: pageSize,
        searchQuery: searchQuery,
      };

      const urlParams = new URLSearchParams(params).toString();
      const response = await axios.get(
        `/public/getTorrentTutorial?${urlParams}`
      ); // Pass slug as part of the URL
      setTorrentData(response.data.data);
      setTotalPages(response.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    fetchDataSEO();
    fetchData();
  }, [currentPage, searchQuery]);

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

        <main className="page_content mb-0">
          <section
            className="banner_section banner_style_4 mouse_move"
            style={{
              minHeight: "260px",
              backgroundSize: "80%",
              marginTop: "70px",
            }}
          >
            <div
              className="decoration_wrap"
              style={{
                backgroundImage:
                  'url("/assets/images/shapes/shapes_group_1.png")',
                minHeight: "200px",
                backgroundSize: "80%",
              }}
            >
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col col-lg-7">
                    <div className="banner_content text-center">
                      <h1 style={{ color: "white", fontSize: "25px" }}>
                        The World’s Largest Developer Torrent Hub
                      </h1>
                      <div
                        className="form_item m-0 wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        <div
                          className="search-wrapper"
                          style={{ position: "relative", zIndex: 1100 }}
                        >
                          <input
                            type="search"
                            name="search"
                            className="form-control "
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearch}
                            autoComplete="off"
                          />
                          {filtered.length > 0 && (
                            <ul className="autocomplete-list">
                              {filtered.slice(0, 10).map((item) => (
                                <li
                                  key={item.id}
                                  onClick={() => handleSelect(item.slug)}
                                >
                                  {item.name.length > 60
                                    ? item.name.slice(0, 60) + "..."
                                    : item.name}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="submit_icon"
                          data-cursor-text="Search"
                        >
                          <img
                            src="assets/images/icons/icon_search_2.svg"
                            alt="Search Icon"
                          />
                        </button>
                      </div>

                      <div
                        className="form_item m-0 wow fadeInUp"
                        data-wow-delay=".3s"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="course_section" style={{ marginBottom: "30px" }}>
            <div className="container">
              <div className="section_heading">
                <div className="row align-items-center">
                  <div className="col col-lg-8">
                    <h5 className="mb-0" style={{ fontSize: "26px" }}></h5>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Left Section: Torrent List */}
                <div className="col-lg-12">
                  {loading ? (
                    <center>
                      <br />
                      <Loader />
                    </center>
                  ) : (
                    <div className="row g-3 mt-1" style={{ marginLeft: "2px" }}>
                      {torrent.map((qa) => (
                        <div className="col-12 col-sm-6 col-lg-3" key={qa.id}>
                          <div className="card h-100 shadow-sm border-0">
                            <Link
                              to={`/torrent-course/${qa.slug}`}
                              className="text-decoration-none text-dark"
                            >
                              <img
                                src="/assets/images/uTorrent-Pro-tutorial.png"
                                className="card-img-top"
                                alt={qa.name}
                                style={{ height: "180px", objectFit: "cover" }}
                              />
                              <div className="card-body">
                                <h6 className="card-title fw-semibold">
                                  {qa.name.length > 60
                                    ? qa.name.slice(0, 60) + "..."
                                    : qa.name}
                                </h6>
                              </div>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Sidebar Section */}
                <div className="col-lg-2 d-none">
                  <aside className="mt-3">
                    {serviceData.slice(0, 5).map((service) => (
                      <div className="col-12 mb-3 px-2" key={service.id}>
                        <div
                          className="course_item"
                          style={{
                            borderRadius: "15px",
                            overflow: "hidden",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#fff",
                            transition: "transform 0.3s ease",
                            padding: "10px",
                          }}
                        >
                          <div
                            className="item_image"
                            style={{ position: "relative" }}
                          >
                            <Link
                              className="image_wrap"
                              to={`/guide-details/${service.slug}`}
                            >
                              <img
                                src={service.image}
                                alt={service.title}
                                className="img-fluid"
                                style={{
                                  height: "200px",
                                  width: "100%",
                                  objectFit: "cover",
                                  borderRadius: "10px",
                                }}
                              />
                            </Link>
                          </div>
                          <div
                            className="item_content"
                            style={{ padding: "15px" }}
                          >
                            <Link
                              className="course_instructor btn_unfill"
                              to={`/guide-details/${service.slug}`}
                              style={{
                                fontSize: "14px",
                                color: "#555",
                                textDecoration: "none",
                              }}
                            >
                              <span
                                className="badge_premium"
                                style={{
                                  color: "#f39c12",
                                  fontSize: "20px",
                                  padding: "8px",
                                  marginRight: "10px",
                                }}
                              >
                                <i className="fas fa-crown"></i>
                              </span>
                              {service.instructor}
                            </Link>
                            <div style={buttonGroupStyle}>
                              <button
                                style={cartButtonStyle}
                                onClick={() => addToCart(service)}
                              >
                                <i className="fas fa-shopping-cart"></i> Add to
                                Cart
                              </button>
                              <button
                                style={detailsButtonStyle}
                                onClick={() => handleOpenModal(service)}
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </aside>
                </div>
              </div>
            </div>

            <br />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </section>
          <br />
          <br />
          <br />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Torrenttutorial;
