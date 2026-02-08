import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "/config/axiosConfig";
import "../assets/torrentCourse.css";

import Loader from "../components/Loader";
import AuthUser from "../components/AuthUser";
import Swal from "sweetalert2";

const TorrentCourse = () => {
  // Example SEO data; replace with dynamic data as needed
  const { slug } = useParams(); // 🔥 Access the slug here
  const seoData = {
    title: `Torrent Course [${slug}]`,
    description: `Explore courses and tutorials category on My Awesome Website.`,
    keywords: `PDF ebooks, courses, tutorials, My Awesome Website`,
  };
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [serviceData, setServiceData] = useState([]);
  const [description, setDescription] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [torrentName, setName] = useState("");
  const [siteName, setSiteName] = useState("");
  // const [serviceDes, setServiceDes] = useState("");
  // const [serviceprice, setServicePrice] = useState(0);
  // const [categorys, setChidCategory] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const { getToken, token, logout, http, setToken } = AuthUser();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  // Handle the file download click
const handleDownload = (e) => {
  e.preventDefault();
  // Ensure downloadLink is provided
  if (!downloadLink) {
    console.error("Download link is missing.");
    return;
  }
  const userFriendlyFileName = "JOBS.torrent"; // Replace with dynamic logic if needed
  const a = document.createElement("a");
  a.href = downloadLink;
  a.download = userFriendlyFileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};



  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: "URL copied to clipboard!",
      toast: true,
      position: "top-end", // ✅ Right side
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      customClass: {
        popup: "swal2-sm-toast", // Optional for custom small size
      },
      didOpen: (toast) => {
        toast.style.fontSize = "14px";
        toast.style.padding = "10px 16px";
        toast.style.minWidth = "auto";
      },
    });
  };
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordlChange = (e) => {
    setPassword(e.target.value);
  };

  // Ensuring the modal is opened based on token state
  // useEffect(() => {
  //   if (!token) {
  //     openModalLogin(); // Automatically open the modal if not logged in
  //   }
  // }, [token]);

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

  //For Login
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
        window.location.href = `/torrent-course/${slug}`;
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

  //For login
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
      <div
        className="modal fade"
        ref={modalRef}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">

        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header justify-content-between">
              <h3 className="text-center mb-2 m-auto">Please login</h3>
              <button
                type="button"
                className="btn-close d-none"
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
                          top: "75%",
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
                    <h1 className="text-white">{torrentName}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service List Section */}
        <div className="container-fluid mt-5 mx-desktop">
          <div className="row">
            <div className="col-lg-12">
              {loading ? (
                <div className="text-center">
                  <Loader />
                </div>
              ) : (
                <div>
                  <div className="row">
                    <div className="container content-section">
                      {/* Description Section */}
                      <div
                        className="description mt-3"
                        dangerouslySetInnerHTML={{
                          __html: description || "",
                        }}
                      />

                      {/* URL Share Box */}
                      <div className="url-share mt-4 mb-3">
                        <input
                          type="text"
                          value={currentUrl}
                          readOnly
                          className="url-input"
                        />
                        <button onClick={handleCopy} className="copy-btn">
                          <i className="fas fa-copy"></i> Share with Friends
                        </button>
                      </div>

                      {/* Download Button */}
                      <div className="download-section mt-4">
                        <a
                          href="#"
                          onClick={handleDownload}
                          rel="noopener noreferrer"
                          className="download-btn"
                        >
                          <i className="fas fa-download"></i> Download
                        </a>
                      </div>
                    </div>
                  </div>

                  <br />

                  {/* Tags */}
                </div>
              )}
            </div>

            <div className="col-lg-2 d-none">
              {" "}
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

export default TorrentCourse;
