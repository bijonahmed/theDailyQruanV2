import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/GuestNavbar";
import { useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";
import "../../assets/Result.css";
import { useParams } from "react-router-dom";
import AuthUser from "../../components/AuthUser";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
const Result = () => {
  const { getToken, token, logout } = AuthUser();
  const navigate = useNavigate();
  const { slug } = useParams(); // 🔥 Access the slug here
  const [answers, setAnswer] = useState([]); // This holds the MCQs
  const [catName, setCatName] = useState(""); // This holds the MCQs
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchExamDetails = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(`/exam/getanswers?slug=${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setAnswer(response.data.data);
      setCatName(response.data.cat_name);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const getCertificate = () => {
    navigate(`/users/getCertificate/${slug}`);
  };

  useEffect(() => {
    fetchExamDetails();
  }, [slug]);

  return (
    <>
      <Helmet>
        <title>3programmer-{catName}</title>
      </Helmet>

      <div className="page_wrapper">
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>

        <GuestNavbar />

        <section className="exam_intro_section d-flex flex-column align-items-center">
          <div className="text-center">
            <h1>{catName}</h1>
            {/* Display the number of answered questions */}

            <div className="container p-1">
              <div className="d-flex justify-content-end mb-4">
                <button
                  className="btn btn-primary"
                  style={{
                    padding: "10px 20px",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                  onClick={getCertificate}
                >
                  <i
                    className="fas fa-certificate"
                    style={{ marginRight: "8px" }}
                  ></i>{" "}
                  Certificate
                </button>
              </div>

              {loading ? (
                <Loader />
              ) : (
                <div className="row">
                  {answers.map((item, index) => (
                    <div
                      key={index}
                      className="col-12 col-md-6 d-flex mb-4" // Mobile: 1 column, Desktop: 2 columns, spacing bottom
                    >
                      <div
                        className="card shadow-sm flex-fill"
                        style={{
                          backgroundColor:
                            item.is_correct === 1 ? "#d1fae5" : "#fecaca", // Green or Red background
                          borderRadius: "8px",
                          padding: "16px",
                          transition: "all 0.3s ease",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <h2
                          className="h5 font-weight-bold mb-3"
                          style={{
                            color:
                              item.is_correct === 1 ? "#047857" : "#b91c1c", // Green or Red title text
                          }}
                        >
                          {index + 1}. {item.question}
                        </h2>

                        <ul
                          className="list-unstyled mb-3"
                          style={{ color: "#374151" }}
                        >
                          <li>A. {item.option_a}</li>
                          <li>B. {item.option_b}</li>
                          <li>C. {item.option_c}</li>
                          <li>D. {item.option_d}</li>
                        </ul>

                        <div className="mb-2">
                          <strong>Selected:</strong> {item.selected_option_ans}
                        </div>

                        <div
                          className="mt-auto font-weight-bold"
                          style={{
                            color:
                              item.is_correct === 1 ? "#047857" : "#b91c1c", // Correct/Incorrect status
                          }}
                        >
                          {item.is_correct === 1 ? "Correct" : "Incorrect"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Result;
