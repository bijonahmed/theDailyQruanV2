import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";
import Swal from "sweetalert2";
import AuthUser from "../../components/AuthUser";

const Referral = () => {
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
      const response = await axios.get(`/user/referralCode`, {
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
        <title>w3programmer - Referral</title>
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
              <li className="breadcrumb-item active text-muted">Referral</li>
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
              <div className="col-12">
                <h4 className="text-primary fw-bold mb-3">
                  Referral History ({count})
                </h4>
                <p className="text-muted mb-4">
                  Share your referral code with friends and earn rewards when
                  they join <strong>w3programmer</strong>. Help others discover
                  great content while enjoying exclusive bonuses for every
                  successful referral.
                </p>
                <div className="table-responsive">
                  <table className="table table-striped table-bordered align-middle text-center">
                    <thead className="table-light">
                      <tr>
                        <th>Invite Code #</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.inviteCode}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.created_at}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default Referral;
