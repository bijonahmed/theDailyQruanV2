import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";
import Swal from "sweetalert2";
import AuthUser from "../../components/AuthUser";

const Ebooks = () => {
  const navigate = useNavigate();
  const { getToken, token, logout } = AuthUser();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [tags, setTags] = useState([]);

  const tagData = async () => {
    try {
      const response = await axios.get(`/public/getAllChildCaegorys`);
      setTags(response.data.result);
      //setChildCategory(response.data); // Save the fetched categories
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const childfetchData = async () => {
    try {
      const response = await axios.get(`/documents/geteBooks`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data.data);
      setCount(response.data.count);
      //setChildCategory(response.data); // Save the fetched categories
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const downloadebooks = async (item) => {
    console.log("Item object:", item); // ✅ debug here
    const pdfUrl = item?.pdf_file;
    //console.log("====" + pdfUrl);
    //return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "w3.pdf"; // Set the filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    childfetchData();
    tagData();
    if (!token) {
      navigate("/");
    }
    //console.log("Token changed or component mounted");
  }, [token]); // Only re-run effect if token changes

  return (
    <>
      <Helmet>
        <title>w3programmer - Ebooks</title>
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
        <section className="decoration_wrap mt-5">
          <div className="container">
            <ul className="breadcrumb_nav d-flex justify-content-center list-unstyled mb-0">
              <li className="me-2">
                <Link
                  to="/dashboard"
                  className="breadcrumb-item text-decoration-none text-primary"
                >
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item active text-muted">Ebooks</li>
            </ul>
          </div>
        </section>

        <main className="page_content inner_pages_section section_space_lg pb-0">
          {/* Referral History Section */}
          <section
            className="container my-4"
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              padding: "40px",
            }}
          >
            <div className="row">
              <div className="col-12 mt-4">
                {/* <h4 className="text-primary fw-bold mb-3">
                  Your Ebooks ({count})
                </h4> */}
                <div className="row">
                  {data.map((item, index) => (
                    <div key={item.id} className="col-md-4 mb-4 d-flex">
                      <div
                        className="card shadow-sm w-100 border-0"
                        style={{
                          borderRadius: "16px",
                          overflow: "hidden",
                          transition: "transform 0.2s ease-in-out",
                        }}
                      >
                        <Link to={`/read-ebooks/${item.service_slug}`}>
                          <img
                            src={item.thumnail_img}
                            alt={item.service_name}
                            className="card-img-top"
                            style={{
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </Link>

                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title text-primary fw-bold mb-2">
                            {item.service_name}
                          </h5>
                          <p className="card-text text-muted mb-3">
                            <strong className="text-dark">Date:</strong>{" "}
                            {item.created_at}
                          </p>
                          <div className="mt-auto d-flex justify-content-between">
                            <Link
                              to={`/read-ebooks/${item.service_slug}`}
                              className="btn btn-success btn-lg"
                              style={{
                                backgroundColor: "#28a745",
                                color: "#fff",
                                padding: "6px 12px",
                                fontSize: "14px",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              <i className="fas fa-eye me-2"></i> View
                            </Link>
                            <button
                              onClick={() => downloadebooks(item)}
                              className="btn btn-danger btn-lg"
                              style={{
                                backgroundColor: "#dc3545",
                                color: "#fff",
                                padding: "6px 12px",
                                fontSize: "14px",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                              }}
                            >
                              <i className="fas fa-download me-2"></i> Download
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-body">
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
            </div>
          </section>

          {/* Tags Section */}
        </main>

        <br />

        <Footer />
      </div>
    </>
  );
};

export default Ebooks;
