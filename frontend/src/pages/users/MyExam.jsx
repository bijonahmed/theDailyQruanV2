import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";
import Swal from "sweetalert2";
import "../../assets/myExam.css";
import { useParams } from "react-router-dom";
import AuthUser from "../../components/AuthUser";

const MyExam = () => {
  //const examTitle = "PHP Certification Exam"; // You can make this dynamic later
  const { getToken, token, logout } = AuthUser();
  const navigate = useNavigate();
  const { slug } = useParams(); // 🔥 Access the slug here
  const [errors, setErrors] = useState({});
  const [examTitle, setCategoryName] = useState("");
  const [countQuestion, setCountQuestion] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const fetchCategoryName = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(
        `/category/getCategoryRow?slug=${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //console.log("====" + response.data.countQuestion);
      setCategoryName(response.data.data.name);
      setCountQuestion(response.data.countQuestion);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };


  const startExam = () => {
    navigate(`/users/exam/${slug}`);
  }
  
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    //console.log("Token changed or component mounted");
  }, [token]); // Only re-run effect if token changes
  useEffect(() => {
    fetchCategoryName();
  }, [slug]);

  return (
    <>
      <Helmet>
        <title>{examTitle} | w3programmer</title>
      </Helmet>

      <div className="page_wrapper">
        {/* Back To Top */}
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>

        <GuestNavbar />

        {/* Exam Section */}
        <section className="exam_intro_section d-flex align-items-center">
          <div className="container text-center">
            <h1 className="exam_main_title">{examTitle}</h1>
            <p className="exam_subtitle mt-3 mb-4" style={{ color: "black" }}>
              Test your {examTitle} knowledge with {countQuestion} questions and
              earn your certification to showcase your expertise globally.
            </p>

            <div className="exam_card mx-auto mb-5">
              <h5 className="rules_heading mb-3">📋 Important Rules</h5>
              <ul className="exam_rules_list text-start">
                <li>
                  ✅ Complete the exam in one sitting — no breaks allowed.
                </li>
                <li>✅ Each question is compulsory — no skipping.</li>
                <li>✅ No external assistance — honor system applies.</li>
                <li>✅ Timer will auto-submit your exam once it runs out.</li>
                <li>
                  ✅ Your final score will be shown immediately after
                  submission.
                </li>
              </ul>
            </div>

            <a href="#" onClick={startExam}
              className="btn btn_primary start_exam_btn"
            >
              Start Now <i className="fas fa-arrow-right ms-2"></i>
            </a>
          </div>

          {/* Decorations */}
        </section>

        <Footer />
      </div>
    </>
  );
};

export default MyExam;
