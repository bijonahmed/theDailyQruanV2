import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import AuthUser from "../components/AuthUser";
import GuestNavbar from "../components/GuestNavbar";
import Footer from "../components/Footer";
import "../assets/dashboardMessages.css"; // Adjust the path based on your project structure
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";

const Dashboard = () => {
  const { getToken, token, logout } = AuthUser();
  const { user } = AuthUser();
  const [copied, setCopied] = useState(false);
  const [tags, setTags] = useState([]);
  const userRefCode = user.inviteCode;
  const [showModal, setShowModal] = useState(false);

  const referralURL = `${window.location.origin}/referral?code=${userRefCode}`;
  console.log(referralURL);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralURL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    });

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
      title: "URL copied successfully!",
    });
  };
  const navigate = useNavigate();
  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  };
  const childfetchData = async () => {
    try {
      const response = await axios.get(`/public/getAllChildCaegorys`);
      setTags(response.data.result);
      //setChildCategory(response.data); // Save the fetched categories
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    childfetchData();
    if (!token) {
      navigate("/");
    }
    //console.log("Token changed or component mounted");
  }, [token]); // Only re-run effect if token changes

  return (
    <>
      <Helmet>
        <title>w3programmer - Dashboard</title>
      </Helmet>

      <GuestNavbar />
      <div className="page_wrapper bg_info">
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>
        <br />

        <main className="page_content mt-5">
          <div className="container">
            {/* Welcome Banner */}
            <div
              className="welcome-banner d-flex align-items-center p-3 my-3 text-white rounded shadow-sm"
              style={{
                background: "linear-gradient(135deg, #000, #5a32b3)", // Corrected 'background' instead of 'backgroundColor'
              }}
            >
              <i
                className="fas fa-user"
                style={{
                  fontSize: "20px",
                  color: "#4e73df", // Deep blue user icon
                  background: "#e0e7ff", // Light background
                  padding: "15px",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
              ></i>{" "}
              &nbsp;
              <div className="lh-1 fs-6">
                <strong>Welcome to w3programmer.net,</strong>{" "}
                {user?.name || user?.email}!
              </div>
            </div>

            {/* Referral Card */}
            <div className="update-card container my-4 d-flex justify-content-center">
              <div
                className="card shadow-sm border-0 rounded-4 w-100"
                style={{ maxWidth: "700px" }}
              >
                <div className="card-body">
                  <center>
                    <strong>🎉 Referral Program Launched</strong> <br />
                    Invitation for friends' successful registration.
                  </center>
                  <div className="d-flex justify-content-center mb-4 flex-wrap gap-2">
                    <input
                      type="text"
                      className="form-control text-center"
                      id="referralUrl"
                      value={`${window.location.origin}/referral?code=${userRefCode}`}
                      readOnly
                      style={{ maxWidth: "400px" }}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={copyToClipboard}
                    >
                      Copy URL
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="category_items_wrapper row mt-5">
              {[
                //{ title: "My Exam", icon: "fa-flask", to: "/users/my-exam" },
                {
                  title: "My Profile",
                  icon: "fa-calendar",
                  to: "/users/profile",
                },
                {
                  title: "Change Password",
                  icon: "fa-key",
                  to: "/users/change-password",
                },
                {
                  title: "My Billing",
                  icon: "fa-money-bill-wave",
                  to: "/users/billing",
                },
                {
                  title: "My Certificate",
                  icon: "fa-briefcase",
                  to: "/users/certificate-list",
                },
                {
                  title: "Referral",
                  icon: "fa-share-alt",
                  to: "/users/referral",
                },
                {
                  title: "Bookmarks",
                  icon: "fa-bookmark",
                  to: "/users/my-bookmarks",
                },
                {
                  title: "Ebooks",
                  icon: "fas fa-book",
                  to: "/users/my-books",
                },
              ].map((item, i) => (
                <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={i}>
                  <div className="category_card">
                    <Link to={item.to}>
                      <div className="icon_wrapper">
                        <i
                          className={`fas ${item.icon}`}
                          style={{ fontSize: "24px", color: "#5a32b3" }}
                        ></i>
                      </div>
                      <strong className="category_title">{item.title}</strong>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <br />

            <h4 className="fw-semibold mb-3">
              <i className="fas fa-tags me-2 text-primary"></i>Popular Tags
            </h4>
            <ul className="tag-list list-unstyled d-flex flex-wrap gap-2 mb-0">
              {tags.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/question-answer/${category.slug}`}
                    className="text-dark px-3 text-decoration-none border"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <br />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
