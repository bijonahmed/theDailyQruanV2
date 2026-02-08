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

const styles = {
  container: {
    // maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "28px",
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  theadRow: {
    backgroundColor: "#f1f1f1",
  },
  cell: {
    padding: "12px 16px",
    border: "1px solid #ddd",
    textAlign: "left",
    fontSize: "16px",
  },
  removeButton: {
    background: "transparent",
    border: "none",
    fontSize: "18px",
    color: "#dc3545",
    cursor: "pointer",
  },
  checkoutWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #eee",
    paddingTop: "15px",
  },
  totalText: {
    fontSize: "20px",
    color: "#222",
  },
  checkoutButton: {
    padding: "10px 18px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

const Cart = () => {
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

  const { cart, setCart } = useContext(CartContext);
  const { addToCart } = useContext(CartContext);
  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };


  const closeModal = () => {
  const modalEl = modalRef.current;
  const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
  modalInstance.hide();
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

  /* For Login */
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post("/auth/userLogin", {
        email,
        password,
      });
      if (response && response.status === 200) {
        setToken(response.data.user, response.data.access_token);
        openModalClose();
        window.location.href = `/payment`;
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    } catch (error) {
      const fieldErrors = error.response?.data.errors || {};
      setErrors({
        general: fieldErrors.account
          ? fieldErrors.account[0]
          : "Invalid email or password.",
        ...fieldErrors,
      });

      console.error("Login error:", error.response || error); // Optional: Log the error for debugging
    }
  };

  const loginbyModal = () => {
    if (!token) {
      openModalLogin(true); // Open the login modal if not logged in
    }
  };

  const modalRef = useRef(null);
  const openModalLogin = () => {
    const modalElement = new window.bootstrap.Modal(modalRef.current, {
      backdrop: "static", // Disable closing on outside click
      keyboard: false, // Disable closing with the keyboard
    });
    modalElement.show(); // Opens the modal
  };

  const openModalClose = () => {
    const modalElement = window.bootstrap.Modal.getInstance(modalRef.current);
    if (modalElement) {
      modalElement.hide(); // This will close the modal
    }
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordlChange = (e) => {
    setPassword(e.target.value);
  };
  //For login
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  //For register

  const handleFullnameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChangeRegister = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChangeRegister = (e) => {
    setPassword(e.target.value);
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      //console.log(response.data.message);
      // navigate("/login");
      if (response.status == 200) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Register successfully",
        });
        setFullName("");
        setEmail("");
        setPassword("");
        // Reset form or show success toast here
        // Bootstrap 5 Tab API to show Login tab
        const loginTab = document.querySelector("#login-tab");
        if (loginTab) {
          const tabInstance = new bootstrap.Tab(loginTab); // requires Bootstrap JS
          tabInstance.show(); // switches to login tab
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("Validation errors:", error.response.data.errors);
        setErrors(error.response.data.errors);
      } else {
        console.error("Error adding brand:", error);
      }
    }
  };

  /* END*/

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
                        Total Items ({cart.length})
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
                    <div style={styles.container}>
                      <h2 style={styles.heading}>Your Cart</h2>

                      {cart.length === 0 ? (
                        <p style={styles.emptyText}>No items in the cart.</p>
                      ) : (
                        <>
                          <div className="table-responsive">
                            <table style={styles.table}>
                              <thead>
                                <tr style={styles.theadRow}>
                                  <th style={styles.cell}>#</th>
                                  <th style={styles.cell}>Name</th>
                                  <th style={styles.cell}>Price</th>
                                  <th style={styles.cell}>
                                    <center>Remove</center>
                                  </th>
                                  <th style={styles.cell}>
                                    <center>Details</center>
                                  </th>{" "}
                                  {/* ✅ New column */}
                                </tr>
                              </thead>
                              <tbody>
                                {cart.map((item, index) => (
                                  <tr key={item.id}>
                                    <td style={styles.cell}>{index + 1}</td>
                                    <td style={styles.cell}>{item.name}</td>
                                    <td style={styles.cell}>${item.price}</td>
                                    <td style={styles.cell}>
                                      <center>
                                        <button
                                          onClick={() => removeItem(item.id)}
                                          style={styles.removeButton}
                                          title="Remove item"
                                        >
                                          ❌
                                        </button>
                                      </center>
                                    </td>
                                    <td style={styles.cell}>
                                      <center>
                                        <Link
                                          to={`/guide-details/${item.slug}`}
                                          style={{
                                            padding: "6px 12px",
                                            backgroundColor: "#007bff",
                                            color: "#fff",
                                            borderRadius: "4px",
                                            textDecoration: "none",
                                            fontSize: "14px",
                                          }}
                                        >
                                          <i className="fas fa-file-pdf"></i>{" "}
                                          View
                                        </Link>
                                      </center>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {/* Total and Checkout */}
                          <div style={styles.checkoutWrapper}>
                            <h4 style={styles.totalText}>
                              Total: ${total.toFixed(2)}
                            </h4>
                            <button
                              style={styles.checkoutButton}
                              onClick={loginbyModal}
                            >
                              Proceed to Checkout
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  <br />
                  {/* Service */}
                  <section>
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col col-lg-12">
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
                                    <div
                                      className="course_item"
                                      style={cardStyle}
                                    >
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
                                            onLoad={() =>
                                              handleImageLoad(service.id)
                                            }
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
                                          <Link
                                            to={`/guide-details/${service.slug}`}
                                          >
                                            {service.title}
                                          </Link>
                                        </h3>
                                        <div style={buttonGroupStyle}>
                                          <button
                                            style={cartButtonStyle}
                                            onClick={() => addToCart(service)}
                                          >
                                            <i className="fas fa-shopping-cart"></i>{" "}
                                            Add to Cart
                                          </button>
                                          <Link
                                            to={`/guide-details/${service.slug}`}
                                            style={detailsButtonStyle}
                                          >
                                            Details
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <br />
                    <br />
                  </section>

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

        {/* Start Login */}
        <div className="modal fade" ref={modalRef} tabIndex="-1"
          aria-labelledby="exampleModalLabel"  aria-hidden="true" >

 

          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header justify-content-between">
                <h3 className="text-center mb-2 m-auto">Please login</h3>
                <button
                  type="button"
                  className="btn-close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={openModalClose}
                  style={{ position: "absolute", top: "10px", right: "10px" }}
                ></button>
              </div>

              <div className="modal-body px-4">
                {/* Nav Tabs */}
                <ul
                  className="nav nav-pills nav-justified mb-4"
                  id="authTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active fw-semibold"
                      id="login-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#login"
                      type="button"
                      role="tab"
                      aria-controls="login"
                      aria-selected="true"
                    >
                      Login
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link fw-semibold"
                      id="register-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#register"
                      type="button"
                      role="tab"
                      aria-controls="register"
                      aria-selected="false"
                    >
                      Register
                    </button>
                  </li>
                </ul>

                {/* Tab Content */}
                <div className="tab-content" id="authTabContent">
                  {/* Login Tab */}
                  <div
                    className="tab-pane fade show active"
                    id="login"
                    role="tabpanel"
                    aria-labelledby="login-tab"
                  >
                    <form onSubmit={loginUser} className="mx-auto">
                      {errors.account && (
                        <div className="alert alert-danger text-center py-2 mb-3">
                          {errors.account[0]}
                        </div>
                      )}
                      <div className="form-group mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input
                          type="text"
                          placeholder="Enter email"
                          className="form-control rounded-pill px-3"
                          value={email}
                          onChange={handleEmailChange}
                        />
                        {errors.email && (
                          <div className="text-danger small mt-1">
                            {errors.email[0]}
                          </div>
                        )}
                      </div>
                      <div
                        className="form-group mb-3"
                        style={{ position: "relative" }}
                      >
                        <label className="form-label fw-bold">Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          className="form-control rounded-pill px-3"
                          value={password}
                          onChange={handlePasswordlChange}
                        />

                        {/* Toggle Eye Icon */}
                        <i
                          className={`fas ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                          onClick={togglePassword}
                          style={{
                            position: "absolute",
                            top: "70%",
                            right: "20px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#666",
                          }}
                        ></i>

                        {errors.password && (
                          <div className="text-danger small mt-1">
                            {errors.password[0]}
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-3 fs-5 rounded-pill shadow-sm fw-semibold"
                      >
                        Login
                      </button>
                    </form>
                  </div>

                  {/* Register Tab */}
                  <div
                    className="tab-pane fade"
                    id="register"
                    role="tabpanel"
                    aria-labelledby="register-tab"
                  >
                    <form onSubmit={registerUser} className="mx-auto">
                      <div className="form-group mb-3 mt-3">
                        <label className="form-label fw-bold">Full Name</label>
                        <input
                          type="text"
                          className="form-control rounded-pill px-3"
                          placeholder="Your name"
                          value={name}
                          onChange={handleFullnameChange}
                        />
                        {errors.name && (
                          <div className="error" style={{ color: "red" }}>
                            {errors.name[0]}
                          </div>
                        )}
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input
                          type="email"
                          className="form-control rounded-pill px-3"
                          placeholder="Your email"
                          value={email}
                          onChange={handleEmailChangeRegister}
                        />
                        {errors.email && (
                          <div className="error" style={{ color: "red" }}>
                            {errors.email[0]}
                          </div>
                        )}
                      </div>
                      <div
                        className="form-group mb-3"
                        style={{ position: "relative" }}
                      >
                        <label className="form-label fw-bold">Password</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control rounded-pill px-3"
                          placeholder="Create password"
                          value={password}
                          onChange={handlePasswordChangeRegister}
                        />
                        {/* Eye Icon */}
                        <i
                          className={`fas ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                          onClick={togglePassword}
                          style={{
                            position: "absolute",
                            right: "15px",
                            top: "60px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "#666",
                          }}
                        ></i>

                        {errors.password && (
                          <div className="error" style={{ color: "red" }}>
                            {errors.password[0]}
                          </div>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100 py-3 fs-5 rounded-pill shadow-sm fw-semibold"
                      >
                        Register
                      </button>
                     
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END Login */}
      </div>
    </>
  );
};

export default Cart;
