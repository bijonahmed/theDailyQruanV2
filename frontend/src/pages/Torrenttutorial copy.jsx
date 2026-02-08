import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import Pagination from "../components/Pagination"; // Adjust the path as needed
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import { useNavigate } from "react-router-dom";
import "../assets/pagination.css";
import "../assets/courseDetails.css";

const Torrenttutorial = () => {
  const [torrent, setTorrentData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuerys] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const pageSize = 100; // Adjust page size as needed


   const navigate = useNavigate();

  const handleClick = (slug) => {
    navigate(`/torrent-course/${slug}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    console.log("=====" + event.target.value);
    setSearchQuerys(event.target.value);
  };

  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
    keywords: "",
  });

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
                      <h1
                        className="banner_title wow fadeInUp"
                        data-wow-delay=".1s"
                        style={{ fontSize: "30px" }}
                      >
                        We have collected over 1,000 TB video courses from various
                        online sources.
                      </h1>

                      <div
                        className="form_item m-0 wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        <input
                          type="search"
                          name="search"
                          placeholder="Search Torrent file..."
                          onKeyUp={handleSearch}
                          autoComplete="off"
                        />

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
            <div className="container-fluid">
              <div className="section_heading">
                <div className="row align-items-center">
                  <div className="col col-lg-8">
                    <h5 className="mb-0" style={{ fontSize: "26px" }}></h5>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Left Section: Torrent List */}
                <div className="col-lg-10">
                  {loading ? (
                    <center>
                      <br />
                      <div className="spinner-border" />
                    </center>
                  ) : (
                    <div className="row  mt-2">
                      {torrent.map((qa, index) => (
                        <div
                          className="col-lg-3 col-md-6 col-sm-6 mt-2"
                          key={qa.id}
                        >
                          <div
                            style={{
                              backgroundColor: "#ffffff",
                              borderRadius: "12px",
                              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                              padding: "20px",
                              transition:
                                "transform 0.3s ease, box-shadow 0.3s ease",
                              cursor: "pointer",
                              overflow: "hidden",
                            }}
                            onMouseEnter={(e) =>
                              Object.assign(e.currentTarget.style, {
                                transform: "translateY(-5px)",
                                boxShadow: "0 12px 24px rgba(0, 0, 0, 0.2)",
                              })
                            }
                            onMouseLeave={(e) =>
                              Object.assign(e.currentTarget.style, {
                                transform: "translateY(0)",
                                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
                              })
                            }
                          >
                            {/* Image Section */}

                            <div
                              onClick={() => handleClick(qa.slug)}
                              style={{
                                height: "180px",
                                width: "100%",
                                borderRadius: "8px",
                                backgroundImage:
                                  'url("/assets/images/uTorrent-Pro-tutorial.png")',
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                marginBottom: "15px",
                                cursor: "pointer",
                              }}
                            />

                            {/* Content Section */}
                            <div>
                              {/* Site Name */}
                              

                              {/* Title */}
                              <h3
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  margin: "10px 0 0",
                                  lineHeight: "1.5",
                                }}
                              >
                                <Link
                                  to={`/torrent-course/${qa.slug}`}
                                  style={{
                                    color: "#333333",
                                    textDecoration: "none",
                                    transition: "color 0.3s ease",
                                  }}
                                  onMouseEnter={(e) =>
                                    Object.assign(e.target.style, {
                                      color: "#007bff",
                                    })
                                  }
                                  onMouseLeave={(e) =>
                                    Object.assign(e.target.style, {
                                      color: "#333333",
                                    })
                                  }
                                >
                                  {qa.name.length > 80
                                    ? qa.name.slice(0, 80) + "..."
                                    : qa.name}
                                </Link>
                              </h3>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Sidebar Section */}
                <div className="col-lg-2">
                  <aside className="mt-3">
                      {serviceData.slice(0, 50).map((service) => (
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
                              <h3
                                className="item_title mt-2"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  color: "#333",
                                }}
                              >
                                <Link
                                  to={`/guide-details/${service.slug}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "#333",
                                  }}
                                >
                                  {service.title}
                                </Link>
                              </h3>
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
