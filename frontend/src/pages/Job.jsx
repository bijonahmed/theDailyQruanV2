import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import RemotiveJobs from "../components/RemotiveJobs";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import "../assets/jobs.css";

import Loader from "../components/Loader";
import AuthUser from "../components/AuthUser";
import Swal from "sweetalert2";
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

const Job = () => {
  // Example SEO data; replace with dynamic data as needed
  const { slug } = useParams(); // 🔥 Access the slug here
  const seoData = {
    title: `W3 Remote Job Opportunities`,
    description: `Explore the latest remote job opportunities with W3. Find flexible work-from-home tech jobs, including web development, design, and programming roles.`,
    keywords: `W3 remote jobs, work from home, web development jobs, tech careers, remote programming jobs, freelance web design, online job opportunities`,
  };

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [serviceData, setServiceData] = useState([]);
  const [description, setDescription] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [torrentName, setName] = useState("");
  const [siteName, setSiteName] = useState("");
  const [childCategory, setChildCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const { getToken, token, logout, http, setToken } = AuthUser();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("software-dev"); // default category
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const handleOpenModal = async (service) => {
    navigate(`/guide-details/${service.slug}`);
  };
  // Handle category click
  function handleCategoryClick(category) {
    setSelectedCategory(category);
  }
  const categories = [
    "software-dev",
    "customer-support",
    "design",
    "marketing",
    "sales",
    "product",
    "devops",
    "finance-legal",
    "hr",
    "qa",
    "writing",
  ];

  // Format category display text
  function formatCategoryName(name) {
    return name
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    const childfetchData = async () => {
      try {
        const response = await axios.get(`/public/getAllChildCaegorys`);
        setTags(response.data.result);
        setChildCategory(response.data); // Save the fetched categories
      } catch (error) {
        console.error("Error fetching data:", error);
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

    const fetchServicerow = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const response = await axios.get(`/public/gettorrentrow?slug=${slug}`);
        setName(response.data.name);
        setSiteName(response.data.site_name);
        setDescription(response.data.description);
        setDownloadLink(response.data.download_link);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchService();
    childfetchData();
    fetchServicerow();
  }, [slug]);

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
      </Helmet>

      <GuestNavbar />
      <br />
      {/* Start Login */}

      {/* END Login */}
      <div className="page_wrapper">
        <section
          className="banner_section banner_style_4 container-fluid mouse_move"
          style={{
            minHeight: "260px",
            backgroundSize: "80%",
            marginTop: "40px",
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
                    <h1 className="text-white">
                      {" "}
                      Explore Remote Job Categories
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service List Section */}
        <br />
        <div className="container-fluid mx-desktop mt-3">
          <div className="row">
            <div className="col-lg-10">
              <section className="container">
                <div className="row g-3 justify-content-center">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="col-6 col-sm-4 col-md-3 col-lg-2"
                    >
                      <button
                        className={`btn w-100 category-btn ${
                          selectedCategory === category ? "active" : ""
                        }`}
                        onClick={() => handleCategoryClick(category)}
                        style={{ textTransform: "capitalize" }}
                      >
                        {formatCategoryName(category)}
                      </button>
                    </div>
                  ))}
                </div>
                <RemotiveJobs category={selectedCategory} />
              </section>
            </div>

            <div className="col-lg-2 d-none">
              <br />
              <aside className="sidebar">
                <div className="row mx-0">
                  {serviceData.slice(0, 12).map((service) => (
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
                </div>
              </aside>
            </div>

            <div className="mt-1">
              <h3 className="widget_title">Popular Tags</h3>
              <ul className="tag-list list-unstyled">
                {tags.map((category) => (
                  <li key={category.slug} className="tag-item mb-2">
                    <Link
                      to={`/question-answer/${category.slug}`}
                      className="tag-link"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Tags */}

        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>
        <br />

        <Footer />
      </div>
    </>
  );
};

export default Job;
