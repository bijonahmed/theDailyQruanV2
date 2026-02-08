import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/GuestNavbar";
import { useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";
import "../../assets/Exam.css";
import { useParams } from "react-router-dom";
import AuthUser from "../../components/AuthUser";
import Footer from "../../components/Footer";

const Exam = () => {
  const { getToken, token, logout } = AuthUser();
  const navigate = useNavigate();
  const { slug } = useParams(); // 🔥 Access the slug here
  const [examTitle, setCategoryName] = useState("");
  const [countQuestion, setCountQuestion] = useState([]); // This holds the MCQs
  const [loading, setLoading] = useState(true); // Add loading state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({}); // To hold selected options for each question
  const [timer, setTimer] = useState(3600); // Set initial timer to 1 hour (3600 seconds)
  const [showSubmitButton, setShowSubmitButton] = useState(false); // State to track when to show the submit button
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const fetchExamDetails = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const response = await axios.get(`/exam/getExamDetails?slug=${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setCategoryName(response.data.data.name);
      setCountQuestion(response.data.countQuestion); // Set the fetched questions here
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const submitExam = async () => {
    try {
      // Send the selected answers to the backend
      const response = await axios.post(
        "/exam/submitanswers",
        {
          answers: selectedOptions, // Send selected answers to backend
          examSlug: slug, // Pass the exam slug to know which exam is being submitted
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Exam submitted successfully", response.data);
      // Redirect to results or another page after submission
      navigate(`/users/exam-results/${slug}`);
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  useEffect(() => {
    fetchExamDetails();
  }, [slug]);

  // Countdown Timer Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Clear the interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Format the time as hh:mm:ss
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Function to handle option selection for each question
  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: option,
    }));
  };

  // Validate if an answer is selected for the current question
  const validateAnswer = () => {
    if (!selectedOptions[currentQuestion.id]) {
      //alert("Please select an answer for the current question.");
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
        icon: "error",
        title: "Please select an answer for the current question",
      });

      return false;
    }
    return true;
  };
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    //console.log("Token changed or component mounted");
  }, [token]); // Only re-run effect if token changes
  // Function to go to the next question
  const nextQuestion = () => {
    if (validateAnswer()) {
      if (currentQuestionIndex < countQuestion.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  // Function to go to the previous question
  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Count how many questions are answered
  const answeredQuestionsCount = Object.keys(selectedOptions).length;

  // Check if all questions have been answered and set the state accordingly
  useEffect(() => {
    if (answeredQuestionsCount === countQuestion.length) {
      setShowSubmitButton(true); // Show the submit button when all questions are answered
    } else {
      setShowSubmitButton(false); // Hide the submit button if not all questions are answered
    }
  }, [answeredQuestionsCount, countQuestion.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentQuestion = countQuestion[currentQuestionIndex];
  const selectedAnswer = selectedOptions[currentQuestion.id]; // Get the selected answer for the current question

  return (
    <>
      <Helmet>
        <title>{examTitle} | w3programmer</title>
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
          <div className="container text-center">
            <h1>Take the {examTitle} Exam</h1>
            {/* Display the number of answered questions */}
            <div className="answered-questions text-center mb-3">
              Answered Questions: {answeredQuestionsCount} /{" "}
              {countQuestion.length}
            </div>

            {/* Display the countdown timer */}
            <div className="timer mb-4">
              Time Remaining: {formatTime(timer)}
            </div>

            <div className="exam-container">
              <div className="question-box mb-4">
                <p className="question-text">{currentQuestion.question}</p>

                <div className="options mb-3">
                  <div className="option">
                    <input
                      type="radio"
                      id="option_a"
                      checked={selectedAnswer === "option_a"}
                      onChange={() =>
                        handleOptionChange(currentQuestion.id, "option_a")
                      }
                    />
                    <label htmlFor="option_a" className="option-label">
                      {currentQuestion.option_a}
                    </label>
                  </div>

                  <div className="option">
                    <input
                      type="radio"
                      id="option_b"
                      checked={selectedAnswer === "option_b"}
                      onChange={() =>
                        handleOptionChange(currentQuestion.id, "option_b")
                      }
                    />
                    <label htmlFor="option_b" className="option-label">
                      {currentQuestion.option_b}
                    </label>
                  </div>

                  <div className="option">
                    <input
                      type="radio"
                      id="option_c"
                      checked={selectedAnswer === "option_c"}
                      onChange={() =>
                        handleOptionChange(currentQuestion.id, "option_c")
                      }
                    />
                    <label htmlFor="option_c" className="option-label">
                      {currentQuestion.option_c}
                    </label>
                  </div>

                  <div className="option">
                    <input
                      type="radio"
                      id="option_d"
                      checked={selectedAnswer === "option_d"}
                      onChange={() =>
                        handleOptionChange(currentQuestion.id, "option_d")
                      }
                    />
                    <label htmlFor="option_d" className="option-label">
                      {currentQuestion.option_d}
                    </label>
                  </div>
                </div>

                <div className="navigation-buttons mb-4">
                  <button
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    Previous
                  </button>

                  <button
                    onClick={nextQuestion}
                    disabled={currentQuestionIndex === countQuestion.length - 1}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Conditionally Render Submit Exam Button */}
            {showSubmitButton && (
              <div className="submit-btn mb-4 mt-4">
                <button
                  className="btn btn-primary submit-exam-btn"
                  onClick={submitExam}
                >
                  Submit Exam
                </button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Exam;
