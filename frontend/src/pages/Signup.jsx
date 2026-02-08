// src/pages/Home.js
import React, { useState, useEffect } from "react";
import GuestNavbar from "../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "/config/axiosConfig";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // Define errors state
  const [agreeToPolicy, setAgreeToPolicy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log(response.data.message);
      navigate("/login");
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
        {" "}
        <title>w3programmer - Signup</title>
      </Helmet>

      <GuestNavbar />
      <div className="page_wrapper">
        {/* Back To Top - Start */}
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>

        <main className="page_content">
          <section className="page_banner decoration_wrap">
            <div className="container text-center">
              <br /> <br />
              <h1 className="page_heading mb-2">Create Account</h1>
              <p className="mb-0 text-center">
                Already have account? <Link to="/login">Login</Link>
              </p>
              <br />
            </div>
          </section>

          <div className="register_section section_space_lg pt-0">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col col-lg-5">
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="brandName">Name:</label>
                      <input
                        className="form-control"
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleBrandNameChange}
                      />
                      {errors.name && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.name[0]}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="brandName">Email:</label>
                      <input
                        className="form-control"
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      {errors.email && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.email[0]}
                        </div>
                      )}
                    </div>

                    <div style={{ position: "relative" }}>
                      <label htmlFor="password">Password:</label>
                      <input
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <i
                        className={
                          showPassword ? "fas fa-eye-slash" : "fas fa-eye"
                        }
                        onClick={togglePassword}
                        style={{
                          position: "absolute",
                          top: "45px",
                          right: "10px",
                          cursor: "pointer",
                          color: "#333",
                        }}
                      ></i>

                      {errors.password && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.password[0]}
                        </div>
                      )}
                    </div>

                    {/* Privacy Policy Checkbox */}
                    <div className="form-check my-3">
                      <input
                        type="checkbox"
                        id="privacyPolicy"
                        className="form-check-input"
                        checked={agreeToPolicy}
                        onChange={(e) => setAgreeToPolicy(e.target.checked)}
                      />
                      <label
                        htmlFor="privacyPolicy"
                        className="form-check-label"
                      >
                        I agree to the{" "}
                        <a href="/privacy-policy" target="_blank">
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <div>
                      <br />
                    <button
                        type="submit"
                        className="btn btn_primary mb-5 w-100"
                        disabled={!agreeToPolicy}
                      >
                        <span>
                          <small>Sign Up</small>
                          <small>Sign Up</small>
                        </span>
                        <i className="fal fa-paper-plane ms-2" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Signup;
