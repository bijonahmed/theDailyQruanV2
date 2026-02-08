import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import { CartContext } from "../CartContext";
import Loader from "../components/Loader";

// Overlay stays the same, except we align left instead of right
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0, // <-- Changed from right to left
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.3)",
  zIndex: 1000,
  display: "flex",
  justifyContent: "flex-end", // <-- Align modal to the left
};

// Base style before showing
const modalContentBaseStyle = {
  position: "relative",
  height: "100%",
  backgroundColor: "#fff",
  padding: "20px",
  boxShadow: "2px 0 8px rgba(0,0,0,0.3)",
  overflowY: "auto",
  width: window.innerWidth <= 768 ? "100%" : "700px",
  transform: "translateX(-100%)", // start hidden, off screen to left
  transition: "transform 0.3s ease-in-out",
};

// Style applied when modal is active (visible)
const modalContentActiveStyle = {
  transform: "translateX(0%)",
};

// Responsive width with JavaScript
const getModalWidth = () => {
  return window.innerWidth <= 768 ? "100%" : "700px";
};

const rowStyle = {
  paddingLeft: "15px",
  paddingRight: "15px",
  marginLeft: "auto",
  marginRight: "auto",
};

const cardStyle = {
  borderRadius: "15px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#fff",
  transition: "transform 0.3s ease",
};

const imageStyle = {
  height: "350px",
  width: "100%",
  objectFit: "cover",
};

const badgeStyle = {
  color: "#f39c12",
  fontSize: "20px",
  borderRadius: "0%",
  padding: "8px",
  marginRight: "10px",
};

const itemContentStyle = {
  padding: "15px",
};

const cartButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "14px",
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

const buttonGroupStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "15px",
};

const CompleteGuide = () => {
  // Example SEO data; replace with dynamic data as needed
  const seoData = {
    title: `Complete Guide PDF`,
    description: `Explore courses and tutorials category on My Awesome Website.`,
    keywords: `PDF ebooks, courses, tutorials, My Awesome Website`,
  };
  const [loading, setLoading] = useState(true); // Add loading state
  const [categorys, setChidCategory] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [childCategory, setChildCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const { addToCart } = useContext(CartContext);

  const [selectedSlug, setSelectedSlug] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [guideDetails, setGuideDetails] = useState(null);
  const [shortguideDetails, setGuideDetailsShort] = useState(null);

  const [modalWidth, setModalWidth] = useState(getModalWidth());

  useEffect(() => {
    const handleResize = () => setModalWidth(getModalWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenModal = async (service) => {
    setShowModal(true);
    const data = service.description_full;
    const description_short = service.description_short;
    setGuideDetails(data);
    setGuideDetailsShort(description_short);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setGuideDetails(null);
  };

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };
  const childfetchData = async () => {
    try {
      const response = await axios.get(`/public/getAllChildCaegorys`);
      setTags(response.data.result);
      setChildCategory(response.data); // Save the fetched categories
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await axios.get(`/public/getepdfCategoryList`);
        // console.log("Fetched categories:", response.data); // Log the response to verify
        setChidCategory(response.data);
        setChildCategory(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

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
    fetchData();
    childfetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
      </Helmet>

      <GuestNavbar />
      <br />
      <div className="page_wrapper">
        {/* Back To Top - Start */}
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>
        <br />

        <main className="page_content">
          <section
            className="banner_section banner_style_4"
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
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col col-lg-7">
                    <div className="banner_content text-center">
                      <h1
                        className="banner_title wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        Complete Interview Solution Guide: Expert Strategies for
                        Success
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
          <br />
          <section>
            <div className="container-fluid">
              <div className="row">
                <div className="col col-lg-9">
                  {loading ? (
                    <center>
                      <Loader />
                    </center>
                  ) : (
                    <div className="widget">
                      <div className="row" style={rowStyle}>
                        {serviceData.map((service) => (
                          <div
                            className="col col-lg-3 col-md-6 col-sm-6"
                            key={service.id}
                          >
                            <div className="course_item" style={cardStyle}>
                              <div className="item_image">
                                <ul className="badge_group unordered_list">
                                  <li>
                                    <Link
                                      className="badge_premium"
                                      to={`/guide-details/${service.slug}`}
                                      style={badgeStyle}
                                    >
                                      <i className="fas fa-crown"></i>
                                    </Link>
                                  </li>
                                </ul>
                                <Link
                                  className="image_wrap"
                                  to={`/guide-details/${service.slug}`}
                                >
                                  <img
                                    src={service.image}
                                    alt={service.title}
                                    onLoad={() => handleImageLoad(service.id)}
                                    style={{
                                      height: "350px",
                                      width: "100%",
                                      objectFit: "cover",
                                      transition:
                                        "filter 0.5s ease, opacity 0.5s ease",
                                      filter: loadedImages[service.id]
                                        ? "blur(0px)"
                                        : "blur(10px)",
                                      opacity: loadedImages[service.id]
                                        ? 1
                                        : 0.7,
                                    }}
                                  />
                                </Link>
                              </div>
                              <div
                                className="item_content"
                                style={itemContentStyle}
                              >
                                &nbsp;${service.price}
                                <h3
                                  className="item_title"
                                  style={{ marginTop: "10px" }}
                                >
                                  <Link to={`/guide-details/${service.slug}`}>
                                    {service.title}
                                  </Link>
                                </h3>
                                <div style={buttonGroupStyle}>
                                  <button
                                    style={cartButtonStyle}
                                    onClick={() => addToCart(service)}
                                  >
                                    <i className="fas fa-shopping-cart"></i> Add
                                    to Cart
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
                      </div>
                    </div>
                  )}
                </div>
                <div className="col col-lg-3">
                  {/* Start */}
                  <h3 className="widget_title" style={{ marginTop: "0px" }}>
                    Popular Tags
                  </h3>
                  <ul className="tag-list">
                    {tags.map((category) => (
                      <li key={category.slug} className="tag-item">
                        <Link
                          to={`/question-answer/${category.slug}`}
                          className="tag-link"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {/* END */}
                </div>
              </div>
            </div>

            <br />
            <br />
          </section>

          {showModal && (
            <div style={modalOverlayStyle} onClick={handleCloseModal}>
              <div
                style={{
                  ...modalContentBaseStyle,
                  ...modalContentActiveStyle,
                  width: getModalWidth(),
                }}
                onClick={(e) => e.stopPropagation()} // Prevent closing on modal click
              >
                <button
                  onClick={handleCloseModal}
                  style={{
                    float: "right",
                    fontSize: "20px",
                    border: "none",
                    background: "transparent",
                  }}
                >
                  ✖
                </button>
                {guideDetails ? (
                  <div>
                    <div
                      className="description mt-3"
                      dangerouslySetInnerHTML={{
                        __html: shortguideDetails || "",
                      }}
                    />

                    <div
                      className="description mt-3"
                      dangerouslySetInnerHTML={{
                        __html: guideDetails || "",
                      }}
                    />
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CompleteGuide;
