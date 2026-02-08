import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";
import Swal from "sweetalert2";
import AuthUser from "../../components/AuthUser";

const Billing = () => {
  const navigate = useNavigate();
  const { getToken, token, logout } = AuthUser();
  const [data, setData] = useState([]);
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
      const response = await axios.get(`/billing/getBillingDetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setData(response.data.data);
      //setChildCategory(response.data); // Save the fetched categories
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    tagData();
    childfetchData();
    if (!token) {
      navigate("/");
    }
    //console.log("Token changed or component mounted");
  }, [token]); // Only re-run effect if token changes

  return (
    <>
      <Helmet>
        <title>w3programmer - Billing</title>
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
            <ul className="breadcrumb_nav unordered_list_center">
              <li>
                <Link to="/dashboard" className="breadcrumb-item">
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item active">Billing</li>
            </ul>
          </div>
        </section>

        <main className="page_content py-2">
          <section
            className="container banner_section"
            style={{
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              padding: "40px",
            }}
          >
            <div className="container-fluid">
              <h4 className="text-primary mb-3">Billing History</h4>
              <p className="mb-4 text-muted">
                Keep track of your recent transactions with{" "}
                <strong>w3programmer</strong>. Review and manage your billing
                details for better financial oversight.
              </p>

              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th className="d-none">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item.id}>
                        <td>{item.depositID}</td>
                        <td>{item.product}</td>
                        <td>${item.deposit_amount}</td>
                        <td>{item.created_at}</td>
                        <td className="d-none">
                          <span
                            className={`badge ${
                              item.payment_status === "pending"
                                ? "bg-warning text-dark"
                                : "bg-success text-white"
                            }`}
                          >
                            {item.payment_status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="alert alert-info text-center mt-4" role="alert">
                📢 Need help with billing? Contact support@w3programmer.com
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
           
        </main>

        <br />

        <Footer />
      </div>
    </>
  );
};

export default Billing;
