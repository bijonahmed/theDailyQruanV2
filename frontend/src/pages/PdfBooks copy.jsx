import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import "../assets/pdfBooks.css";
import "../assets/taglist.css";
import Loader from "../components/Loader";
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
const Category = () => {
  // Example SEO data; replace with dynamic data as needed
  const seoData = {
    title: `PDF`,
    description: `Explore courses and tutorials category on My Awesome Website.`,
    keywords: `PDF ebooks, courses, tutorials, My Awesome Website`,
  };

  const [loading, setLoading] = useState(true); // Add loading state
  const [categorys, setChidCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const childfetchData = async () => {
    try {
      const response = await axios.get(`/public/getAllChildCaegorys`);
      setTags(response.data.result);
      setChildCategory(response.data); // Save the fetched categories
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenModal = async (service) => {
    navigate(`/guide-details/${service.slug}`);
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

    fetchData();
    childfetchData();
    fetchService();
  }, []);

  // Handle input change
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query); // Update search query state

    // Filter categories based on the search query
    if (Array.isArray(childCategory)) {
      const filtered = childCategory.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCategories(filtered); // Update filtered categories
    }
  };

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
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col col-lg-7">
                    <div className="banner_content text-center">
                      <h1
                        className="banner_title wow fadeInUp"
                        data-wow-delay=".1s"
                      >
                        Free Unlimited PDF Access
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
        </main>
        {/* start */}
        <div className="container-fluid">
          <section className="pt-3">
            <div className="row mx-0">
              {/* Left Column */}
              <div className="col-lg-12 col-md-12 px-0 px-lg-3">
                <aside className="sidebar">
                  {loading ? (
                    <center>
                      <Loader />
                    </center>
                  ) : (
                    <div className="widget mt-3">
                      <div className="row mx-0">
                        {categorys.map((category) => (
                          <div
                            className="col-12 col-sm-6 col-md-3 col-lg-3 px-2"
                            key={category.id}
                          >
                            <ul className="unordered_list_block m-0 p-0">
                              <li>
                                <Link to={`/pdf-zone/${category.slug}`}>
                                  <i
                                    className="fas fa-folder"
                                    style={{ marginRight: "8px" }}
                                  ></i>{" "}
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
                  )}
                </aside>

                {/* Popular Tags */}
                <div className="mt-4">
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

              {/* Right Column */}
              <div className="col-lg-2 col-md-12 px-0 px-lg-3 d-none">
                <aside className="sidebar">
                  <div className="row mx-0">
                    {serviceData.slice(0, 3).map((service) => (
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
            </div>
            <br />
          </section>
        </div>
        {/* END */}

        <Footer />
      </div>
    </>
  );
};

export default Category;
