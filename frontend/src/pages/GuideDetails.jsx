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
import AuthUser from "../components/AuthUser";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";

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

const GuideDetails = () => {
  // Example SEO data; replace with dynamic data as needed
  const { slug } = useParams(); // 🔥 Access the slug here
  const seoData = {
    title: `Complete Guide PDF [${slug}]`,
    description: `Explore courses and tutorials category on My Awesome Website.`,
    keywords: `PDF ebooks, courses, tutorials, My Awesome Website`,
  };
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [serviceData, setServiceData] = useState([]);
  const [service, setService] = useState([]);
  const [serviceName, setServiceName] = useState("");
  const [serviceDes, setServiceDes] = useState("");
  const [serviceDesShort, setServiceShort] = useState("");
  const [showThumbnail, setServiceThumbnail] = useState("");
  const [serviceprice, setServicePrice] = useState(0);
  const [childCategory, setChildCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const { getToken, token, logout, http, setToken } = AuthUser();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setFullName] = useState("");
  // const [email, setEmail] = useState("");
  // const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const [currentUrl, setCurrentUrl] = useState("");

  const navigate = useNavigate();
  const handleOpenModal = async (service) => {
    navigate(`/guide-details/${service.slug}`);
  };
  const { addToCart } = useContext(CartContext);
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

  const handlePayNow = async () => {
    try {
      setIsLoading(true);
      // Define the success and cancel URLs
      const success_url = `${window.location.origin}/payment-success`;
      const cancel_url = `${window.location.origin}/payment-cancel`;

      // Create the payload as a JSON object
      const requestData = {
        books_slug: slug,
        amount: serviceprice,
        success_url: success_url,
        cancel_url: cancel_url,
      };
      // Send the POST request with JSON data
      const response = await axios.post(
        "/payment/create-payment-intent",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // make sure `token` is defined
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );

      // Handle the response, redirect to checkout if URL is present
      const checkoutUrl = response.data.checkout_url;
      if (checkoutUrl) {
        window.location.href = checkoutUrl; // ⬅️ Redirect user to Stripe Checkout
      } else {
        console.error("checkout_url not found in response");
      }

      // You can log the response if needed
      // console.log("Payment Intent Created:", response.data);
    } catch (error) {
      console.error(
        "Error fetching data:",
        error.response?.data || error.message
      );
    }
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
      const response = await axios.get(`/public/geteServicerow?slug=${slug}`);
      //console.log("====service: " + response.data.service);
      setServiceThumbnail(response.data.thumbnail);
      setServiceName(response.data.serviceName);
      setServiceDes(response.data.description_full);
      setServiceShort(response.data.description_short);
      setServicePrice(response.data.price);
      setService(response.data.service);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
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

      <div className="page_wrapper">
        <section
          className="banner_section  banner_style_4 container-fluid mouse_move"
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
                    <h1 className="text-white">{serviceName}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="details_section blog_details_section section_space_md pt-0">
          <div className="container py-4">
            <div className="row justify-content-lg-between align-items-start">
              {/* Left Text Section */}

              {/* Right Image + Price + Button */}
              <div className="row">
                {/* Text & Description Column */}
                <div className="col-12 col-md-8 mb-4">
                  <div
                    className="text-justify"
                    dangerouslySetInnerHTML={{
                      __html: serviceDesShort || "",
                    }}
                  />

                  <div className="text-center mt-3">
                    <h3 className="text-primary fw-bold">{serviceName}</h3>
                  </div>
                </div>

                {/* Image & Add to Cart Button Column */}
                <div className="col-12 col-md-4 mt-4">
                  <div className="text-center mb-3">
                    <img
                      src={showThumbnail}
                      alt={serviceName}
                      className="img-fluid rounded-top image-fit"
                      style={{ maxHeight: "100%", objectFit: "cover" }}
                    />
                  </div>

                  <div
                    className="d-flex gap-2"
                    style={{ ...buttonGroupStyle, flexWrap: "wrap" }}
                  >
                    {/* Add to Cart Button */}
                    <button
                      className="btn btn-primary flex-fill"
                      style={cartButtonStyle}
                      onClick={() => addToCart(service)}
                    >
                      <i className="fas fa-shopping-cart"></i> (${serviceprice})
                      Add to Cart
                    </button>

                    {/* Show Details Button */}
                    <button
                      className="btn btn-info flex-fill"
                      data-bs-toggle="modal"
                      data-bs-target="#detailsModal"
                    >
                      <i className="fas fa-info-circle"></i> Show Details
                    </button>
                  </div>

                  {/* Bootstrap Modal */}
                  <div
                    className="modal fade"
                    id="detailsModal"
                    tabIndex="-1"
                    aria-labelledby="detailsModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                       
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body text-justify">
                          <div
                            className="mt-2"
                            style={{ textAlign: "justify" }}
                            dangerouslySetInnerHTML={{
                              __html: serviceDes || "No details available.",
                            }}
                          />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <center>
          <h3 className="widget_title" style={{ fontSize: "25px" }}>
            Related Books
          </h3>
        </center>
        {/* Service List Section */}
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-12">
              <aside className="sidebar">
                {loading ? (
                  <div className="text-center">
                    <Loader />
                  </div>
                ) : (
                  <div>
                    <div className="row">
                      {/* Services */}
                      {serviceData.map((service) => (
                        <div
                          className="col-lg-3 col-md-6 col-sm-6 mb-4"
                          key={service.id}
                        >
                          <div className="course_item card-style">
                            <div className="item_image position-relative">
                              <ul className="badge_group position-absolute top-0 start-0 m-2 list-unstyled">
                                <li>
                                  <Link
                                    className="badge_premium"
                                    to={`/guide-details/${service.slug}`}
                                    style={{
                                      color: "#f39c12", // Gold color
                                      fontSize: "20px",
                                      borderRadius: "0%",
                                      padding: "8px",
                                      marginRight: "10px", // Space between the icon and instructor text
                                    }}
                                  >
                                    <i className="fas fa-crown"></i>
                                  </Link>
                                </li>
                              </ul>
                              <Link to={`/guide-details/${service.slug}`}>
                                <img
                                  src={service.image}
                                  alt={service.title}
                                  className="img-fluid rounded-top image-fit"
                                />
                              </Link>
                            </div>
                            <div className="item_content p-3">
                              <Link
                                className="text-muted small d-block mb-1"
                                to={`/guide-details/${service.slug}`}
                              >
                                {service.instructor} - ${service.price}
                              </Link>
                              <h5 className="">
                                <Link
                                  className="text-dark fw-semibold"
                                  to={`/guide-details/${service.slug}`}
                                >
                                  {service.title}
                                </Link>
                              </h5>
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

                              {/* <h5 className="item_title mb-0">
                                <Link
                                  className="text-dark fw-semibold"
                                  to={`/guide-details/${service.slug}`}
                                >
                                  {service.title}
                                </Link>
                              </h5> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                  </div>
                )}
              </aside>
              <div className="col-12 tag-list">
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

export default GuideDetails;
