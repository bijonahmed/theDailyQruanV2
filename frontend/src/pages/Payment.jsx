import React, { useState, useEffect, useContext, useRef } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import Loader from "../components/Loader";
import AuthUser from "../components/AuthUser";
import Swal from "sweetalert2";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";

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

const Payment = () => {
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
  const [errors, setErrors] = useState({});
  const { getToken, token, logout, http, setToken } = AuthUser();
  const [password, setPassword] = useState("");
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const { addToCart } = useContext(CartContext);
  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
  // Handle remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Remove from cart!",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: "#fff",
      customClass: {
        popup: "shadow-sm",
      },
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
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

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    //console.log("Token changed or component mounted");
  }, [token]); // Only re-run effect if token changes

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
                        Payment Method (Please select a payment method)
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
          <section>
            <div className="container-fluid">
              <div className="row">
                <div className="col col-lg-9">
                  {loading ? (
                    <center>
                      <Loader />
                    </center>
                  ) : (
                    <div className="container text-center">
                      <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                        We’re currently working on our payment system to make it
                        better for you. <br />
                        If you want to book or need any help, just message us on
                        WhatsApp &nbsp; 
                        <a
                          href="https://wa.me/8801301047166"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#25D366",
                            fontWeight: "bold",
                            textDecoration: "none",
                          }}
                        >
                          +8801301047166
                        </a>
                        <br />
                        <br />
                        Thank you for your support and understanding!
                      </p>
                    </div>
                  )}
                  <br />
                  {/* Service */}

                  {/* END */}
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
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Payment;
