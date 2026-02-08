import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";
import Swal from "sweetalert2";
import AuthUser from "../../components/AuthUser";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useCreateIframeAndLoadViewer } from "@prodfox/react-ui-plugin";

const ReadEbooks = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { getToken, token, logout } = AuthUser();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [tags, setTags] = useState([]);
  const [pdfdata, setPDF] = useState("");
  const [pdf_name, setPDFName] = useState("");
  const [loading, setLoading] = useState(true);

  const tagData = async () => {
    try {
      const response = await axios.get(`/public/getAllChildCaegorys`);
      setTags(response.data.result);
      //setChildCategory(response.data); // Save the fetched categories
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const viewerContainerRef = useRef(null); // wrapper around iframe

  const fullscreenreading = () => {
    const iframe = document.getElementById("pdfIframe");
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    } else {
      alert("Fullscreen not supported by this browser.");
    }
  };

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await axios.get(`/documents/readebooks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { slug },
          //responseType: "blob", // key step to hide the URL
        });

        //console.log("PDF file:", response.data.data.title);
        //  console.log("PDF Name:", pdfName);
        setPDFName(response.data.data.title);
        setPDF(response.data.data.pdf_file);
      } catch (err) {
        console.error("PDF fetch error:", err);
      }
    };

    fetchPDF();
  }, [slug, token]);

  useEffect(() => {
    // fetchData();
    tagData();
    if (!token) {
      navigate("/");
    }
    //console.log("Token changed or component mounted");
  }, [token]); // Only re-run effect if token changes

  return (
    <>
      <Helmet>
        <title>w3programmer - Read Ebooks [{slug}]</title>
      </Helmet>

      <div className="page_wrapper bg_info">
        {/* Back To Top - Start */}
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>

        <GuestNavbar />
        <br />

        {/* Breadcrumb */}
        <section className="decoration_wrap mt-5">
          <div className="container my-3 d-flex justify-content-center">
            <ul className="breadcrumb_nav d-flex align-items-center list-unstyled mb-0 flex-wrap">
              <li className="me-3">
                <Link
                  to="/users/my-books"
                  className="d-flex align-items-center text-decoration-none text-primary"
                  style={{
                    fontWeight: "500",
                    fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  }}
                >
                  <i className="fas fa-arrow-left me-2"></i> Back to Ebook List
                </Link>
              </li>
              <li
                className="breadcrumb-item active text-muted"
                style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
              >
                Read Ebooks - [{pdf_name}]
              </li>
            </ul>
          </div>
        </section>

        {/* Main Ebook Content */}
        <main className="page_content inner_pages_section section_space_lg pb-0">
          <section
            className="container my-4"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "40px",
            }}
          >
            <div className="row">
              <div
                className="col-12">
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "32px",
                  }}
                >
                  <span
                    style={{
                      marginBottom: "16px",
                      fontWeight: "700",
                      color: "#222",
                      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {pdf_name}
                  </span>

                  <div
                    className="d-flex justify-content-center"
                    style={{
                      flexWrap: "wrap",
                      gap: "16px",
                    }}
                  >
                    <button
                      type="button"
                      className="btn"
                      onClick={fullscreenreading}
                      style={{
                        backgroundColor: "#0d6efd",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 22px",
                        fontWeight: "600",
                        fontSize: "clamp(0.9rem, 2vw, 1rem)",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        transition: "0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#0b5ed7";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#0d6efd";
                      }}
                    >
                      <i
                        className="fas fa-expand"
                        style={{ fontSize: "16px" }}
                      ></i>
                      Fullscreen Reading
                    </button>
                  </div>
                </div>

                {pdfdata ? (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      paddingBottom: "140%", // Aspect ratio for iframe responsiveness
                      height: 0,
                      overflow: "hidden",
                      borderRadius: "12px",
                      border: "1px solid #ccc",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <iframe
                      id="pdfIframe"
                      src={pdfdata}
                      title="PDF Viewer"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: "12px",
                      }}
                    ></iframe>
                  </div>
                ) : (
                  <div
                    className="text-center py-5"
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#555",
                    }}
                  >
                    <strong>Loading PDF...</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="card-body mt-5">
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
            </div>
          </section>
        </main>

        <br />
        <Footer />
      </div>
    </>
  );
};

export default ReadEbooks;
