import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";
import Swal from "sweetalert2";
import "../../assets/changePassword.css"; // Adjust the path based on your project structure
const ChangePassword = () => {
  const navigate = useNavigate();

  const [old_password, setOldPasswordName] = useState("");
  const [new_password, setNewPasswordName] = useState("");
  const [new_password_confirmation, setConfirmPasswordName] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const formData = new FormData();
      formData.append("old_password", old_password);
      formData.append("new_password", new_password);
      formData.append("new_password_confirmation", new_password_confirmation);
      const response = await axios.post("/auth/updatePassword", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
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
        title: "Has been successfully update",
      });
      //console.log(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Swal.fire({
          icon: "error",
          title: "Validation Errors",
          html: Object.values(error.response.data.errors)
            .map((err) => `<div>${err.join("<br>")}</div>`)
            .join(""),
        });
        console.error("Validation errors:", error.response.data.errors);
        setErrors(error.response.data.errors);
      } else {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleOldPasswordChange = (e) => {
    setOldPasswordName(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPasswordName(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPasswordName(e.target.value);
  };

  useEffect(() => {}, []);

  return (
    <>
      <Helmet>
        <title>w3programmer - Change Password</title>
      </Helmet>

      <div className="page_wrapper">
        {/* Back To Top - Start */}
        <div className="backtotop">
          <a href="#" className="scroll">
            <i className="far fa-arrow-up" />
            <i className="far fa-arrow-up" />
          </a>
        </div>
        <GuestNavbar />

        <br />
        <br />

        <section className="page_banner decoration_wrap">
          <div className="container">
            <ul className="breadcrumb_nav unordered_list_center">
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>Change Password</li>
            </ul>
          </div>
        </section>

        <main className="page_content mt-5">
          <section className="container banner_section banner_style_4">
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-8 col-sm-12">
                <div className="card shadow-sm rounded-4">
                  <div className="card-body">
                    <h3 className="text-center mb-4">Change Your Password</h3>
                    <form className="row g-3" onSubmit={handleSubmit}>
                      {/* Old Password Field */}
                      <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label">
                          Old Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          onChange={handleOldPasswordChange}
                          placeholder="Enter your old password"
                        />
                        {errors.old_password && (
                          <div className="error" style={{ color: "red" }}>
                            {errors.old_password[0]}
                          </div>
                        )}
                      </div>
                      {/* New Password Field */}
                      <div className="col-md-12">
                        <label htmlFor="inputPassword4" className="form-label">
                          New Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          onChange={handleNewPasswordChange}
                          placeholder="Enter a new password"
                        />
                        {errors.new_password && (
                          <div className="error" style={{ color: "red" }}>
                            {errors.new_password[0]}
                          </div>
                        )}
                      </div>
                      {/* Confirm Password Field */}
                      <div className="col-md-12">
                        <label htmlFor="inputPassword4" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          onChange={handleConfirmPasswordChange}
                          placeholder="Confirm your new password"
                        />
                        {errors.new_password_confirmation && (
                          <div className="error" style={{ color: "red" }}>
                            {errors.new_password_confirmation[0]}
                          </div>
                        )}
                      </div>
                      {/* Submit Button */}
                      <div className="col-12 mt-4">
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn_primary w-100"
                          >
                            <span>Submit</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <br />

        <Footer />
      </div>
    </>
  );
};

export default ChangePassword;
