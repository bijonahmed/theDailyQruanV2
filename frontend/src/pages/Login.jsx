import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../components/GuestNavbar";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "/config/axiosConfig";
import Footer from "../components/Footer";
import AuthUser from "../components/AuthUser";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { http, setToken } = AuthUser();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordlChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await http.post("/auth/userLogin", { email, password });
      setToken(response.data.user, response.data.access_token);
      //navigate("/dashboard"); // Adjust the navigation path as needed
      navigate("/home"); // Adjust the navigation path as needed
    } catch (error) {
      if (error.response && error.response.data) {
        const { errors: fieldErrors } = error.response.data;
        setErrors({
          general: fieldErrors.account ? fieldErrors.account[0] : "Invalid username or password.",
          ...fieldErrors,
        });
      } else {
        setErrors({ general: "Invalid username or password." });
      }
    }
  };

  return (
    <>
          <Helmet onChangeClientState={(newState) => { const metaDescription = document.querySelector('meta[name="description"]'); if (metaDescription) { metaDescription.setAttribute('content', 'Login description' || 'Login description'); } }}> <title>W3-Login</title>
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
          <br/> <br/> 
            <h1 className="page_heading mb-2">Account Login</h1>
            {/* Display error message if present */}
            {errors.general && (
              <p style={{ color: "red", textAlign: "center" }}>{errors.general}</p>
            )}
          </div>
        </section>

        <div className="register_section section_space_lg pt-0">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col col-lg-5">
                <form onSubmit={handleSubmit}>
                  <div className="register_form signup_login_form">
                    <div className="form_item">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                      {/* Display email error if present */}
                      {errors.email && (
                        <div style={{ color: "red" }}>
                          {errors.email[0]}
                        </div>
                      )}
                    </div>
                    <div className="form_item">
                      <input
                        type="password"
                        name="password"
                        placeholder="**********"
                        id="password"
                        value={password}
                        onChange={handlePasswordlChange}
                      />
                      {/* Display password error if present */}
                      {errors.password && (
                        <div className="error" style={{ color: "red" }}>
                          {errors.password[0]}
                        </div>
                      )}
                    </div>
                    <div className="remenber_forget row mb-3 align-items-center justify-content-between d-none">
                      <div className="col col-6">
                        <div className="checkbox_item mb-0">
                          <input id="checkbox_remenber" type="checkbox" />
                          <label htmlFor="checkbox_remenber">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col col-6">
                        <div className="forget_password text-end">
                          <a href="#!">Forgot Password</a>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="btn btn_primary mb-5">
                      <span>
                        <small>Login</small>
                        <small>Login</small>
                      </span>
                      <i className="fal fa-paper-plane ms-2" />
                    </button>
                    <p className="mb-0 text-center">
                      Don't have an account?{" "}
                      <Link to="/signup">Register Here</Link>
                    </p>
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

export default Login;
