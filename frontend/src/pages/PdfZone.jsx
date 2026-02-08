import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import Pagination from "../components/Pagination"; // Adjust the path as needed
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import "../assets/pagination.css";
import "../assets/pdfZone.css";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const PdfZone = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [categorys, setChidCategory] = useState([]);
  const [torrent, setTorrentData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //  const [searchQuery, setSearchQuerys] = useState("");
  const pageSize = 100; // Adjust page size as needed
  const [categoryName, setResponseCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef();

  const getCategory = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(`/public/getepdfCategoryList`);
      // console.log("Fetched categories:", response.data); // Log the response to verify
      setChidCategory(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClick = (data) => {
    navigate(`/pdf-details/${data.slug}`); // Programmatically navigate to the page
  };

  const [metaData, setMetaData] = useState({
    title: "",
    description: "",
    keywords: "",
  });
  const fetchDataSEO = async () => {
    try {
      const response = await axios.get("/public/getSeoDataForTorrent");
      // Assuming response contains title, description, and keywords
      setMetaData({
        title: "W3-PDF Tutorial",
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
        slug: slug,
      };

      const urlParams = new URLSearchParams(params).toString();
      const response = await axios.get(
        `/public/filterepdfCategory?${urlParams}`
      ); // Pass slug as part of the URL
      // const response = await axios.get(`/public/filterepdfCategory`, urlParams);
      setTorrentData(response.data.data);
      setResponseCategory(response.data.categoryName);
      setTotalPages(response.data.pagination.last_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const TruncatedText = ({ text }) => {
    const truncateText = (str, maxLength) => {
      return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    };

    return <div>{truncateText(text, 100)}</div>;
  };

  useEffect(() => {
    getCategory();
    fetchDataSEO();
    fetchData();
  }, [slug, currentPage, searchQuery]);

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

        <main
          className="page_content mb-0 decoration_wrap"
          style={{ marginTop: "60px" }}
        >
          <section
            className="banner_section banner_style_4 mouse_move"
            style={{ minHeight: "300px", backgroundSize: "80%" }}
          >
            <div
              className="decoration_wrap"
              style={{
                backgroundImage:
                  'url("/assets/images/shapes/shapes_group_1.png")',
                minHeight: "300px",
                backgroundSize: "80%",
              }}
            >
              <div className="container-fluid">
                <div className="row justify-content-center">
                  <div className="col col-lg-7">
                    <div className="banner_content text-center">
                      <h1
                        className="banner_title wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        <div
                          className="form_item m-0 wow fadeInUp"
                          data-wow-delay=".3s"
                        >
                          <input
                            type="search"
                            name="search"
                            placeholder="Search...."
                            ref={inputRef}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoComplete="off"
                          />

                          <button
                            type="submit"
                            className="submit_icon"
                            data-cursor-text="Search"
                          >
                            <img
                              src="/assets/images/icons/icon_search_2.svg"
                              alt="Search Icon"
                            />
                          </button>
                        </div>
                      </h1>
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
          <br />

          <section className="course_section">
            <div className="container-fluid">
              <div className="section_heading">
                <div className="row align-items-center">
                  {" "}
                  <center>
                    <ul className="breadcrumb_nav unordered_list_center">
                      <li>
                        <Link to="/pdf-books">PDF Books</Link>
                      </li>
                      <li>{categoryName}</li>
                    </ul>
                    <br />
                  </center>
                </div>
              </div>
              <div className="">
                {loading ? (
                  <center>
                    <Loader />
                  </center>
                ) : (
                  <div className="row header_style_1">
                    {/* Left Column */}
                    <div className="">
                      <div className="row">
                        {/* Left Column */}
                        <div className="col-lg-8 col-md-8 col-sm-12 ps-lg-5 ps-2">
                          <br />
                          <div>
                            <div className="row">
                              {torrent.map((qa) => (
                                <div
                                  className="col-12 col-md-6 mb-3"
                                  key={qa.id}
                                >
                                  <div
                                    className="d-flex align-items-center p-3"
                                    style={{
                                      background: "#f9f9f9",
                                      borderRadius: "8px",
                                    
                                    }}
                                  >
                                    {/* PDF Icon */}
                                    <div className="me-3">
                                      <i
                                        className="fas fa-file-pdf"
                                        style={{
                                          fontSize: "40px",
                                          color: "#e74c3c",
                                        }}
                                      ></i>
                                    </div>

                                    {/* Text Link */}
                                    <div className="flex-grow-1">
                                      <Link
                                        to={`/pdf-details/${qa.slug}`}
                                        className="card-link"
                                        style={{
                                          textDecoration: "none",
                                          color: "#007bff",
                                        }}
                                      >
                                        <TruncatedText text={qa.shortName} />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-lg-4 col-md-4 col-sm-12 pe-lg-5 pe-2">
                          {/* <span className="widget_title">Categories</span> */}
                          <div className="category_list mt-4">
                            <div className="right-column-content">
                              <div className="row">
                                {categorys.map((category) => (
                                  <div key={category.id} className="col-12">
                                    <ul className="unordered_list_block">
                                      <li>
                                        <Link
                                          to={`/pdf-zone/${category.slug}`}
                                          style={{ width: "100%" }}
                                        >
                                          <span>{category.name}</span>
                                          <span>
                                            <strong>
                                              &nbsp;({category.count || 0})
                                            </strong>
                                          </span>
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

export default PdfZone;
