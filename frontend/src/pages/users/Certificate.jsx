import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/GuestNavbar";
import { useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";
import "../../assets/Certificate.css";
import { useParams } from "react-router-dom";
import AuthUser from "../../components/AuthUser";
import Footer from "../../components/Footer";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js"; // Import html2pdf.js library
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import QRCode from "qrcode";

const Certificate = () => {
  const { getToken, token, logout } = AuthUser();
  const navigate = useNavigate();
  const { slug } = useParams(); // 🔥 Access the slug here
  const [answers, setAnswer] = useState([]);
  const [catName, setCatName] = useState("");
  const [userName, setUserName] = useState("");
  const [uId, setUserId] = useState("");
  const [forDate, setForDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [qrCodeBase64, setQrCodeBase64] = useState("");

  const path = `/verify-certificate/${uId}/${slug}`;
  const fullUrl = `${window.location.origin}${path}`;

  const websitelink = `${window.location.origin}`;

  const handleDownload = () => {
    const certificateDiv = document.querySelector(".certificate-container");

    const options = {
      filename: `${userName}_certificate.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 8 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    setLoading(true); // Show loader

    html2pdf()
      .from(certificateDiv)
      .set(options)
      .save()
      .then(() => {
        setLoading(false); // Hide loader after download
      })
      .catch(() => {
        setLoading(false); // Hide loader even on error
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    //console.log("Token changed or component mounted");
  }, [token]); // Only re-run effect if token changes
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
      setUserName(response.data.userName);
      setUserId(response.data.user_id);
      setForDate(response.data.forDate);
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

  useEffect(() => {
    // Convert QR code image to base64
    const fetchQRCode = async () => {
      try {
        const path = `/verify-certificate/${uId}/${slug}`;
        const fullUrl = `${window.location.origin}${path}`;
        const qr = await QRCode.toDataURL(fullUrl); // 🔥 Generate base64 QR code
        setQrCodeBase64(qr);
      } catch (error) {
        console.error("QR Code generation failed:", error);
      }
    };

    fetchQRCode();
  }, [userName]);

  return (
    <>
      <Helmet>
        <title>w3programmer-{catName}</title>
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
          <div className="text-center mt-3">
            <h1>{catName}</h1>
            {/* Display the number of answered questions */}
            <div className="certificate-buttons">
              <button
                className="btn-back"
                onClick={() => window.history.back()}
              >
                ⬅️ Back
              </button>

              <button
                className="btn-download"
                onClick={handleDownload}
                disabled={loading}
              >
                {loading ? "⏳ Downloading..." : "📄 Download"}
              </button>
            </div>

            <div
              style={{
                marginBottom: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                background: "#f5f5f5",
                padding: "10px 15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
              }}
            >
              <input
                type="text"
                value={fullUrl}
                readOnly
                disabled
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "#e9ecef",
                  color: "#495057",
                  fontSize: "14px",
                  cursor: "not-allowed",
                }}
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(fullUrl);
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
                    title: "Certificate URL copied",
                  });
                  //  alert("✅ Certificate URL copied to clipboard!");
                }}
                style={{
                  padding: "10px 16px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                📋 Copy
              </button>
            </div>

            <div className="certificate-container">
              <div className="certificate-frame">
                <div className="certificate-inner">
                  {/* Watermark */}
                  <div className="certificate-watermark">{websitelink}</div>

                  <h1 className="certificate-heading">
                    Certificate of Excellence
                  </h1>

                  <p className="certificate-organization">
                    Awarded by the International Platform -{" "}
                    <strong>W3 Programmer</strong>
                  </p>

                  <p className="certificate-subtitle">
                    This is proudly presented to
                  </p>

                  <h2 className="certificate-recipient">{userName}</h2>

                  <p className="certificate-subtitle">
                    for successfully completing the
                  </p>

                  <h3 className="certificate-course">{catName}</h3>

                  <p className="certificate-description">
                    In recognition of your outstanding commitment to learning,
                    dedication to excellence, and successful completion of all
                    required coursework and assessments under the international
                    standards of W3 Academy, an international education
                    platform.
                  </p>

                  <p className="certificate-date">Awarded on: {forDate}</p>

                  <div className="certificate-footer">
                    <div className="certificate-signature">
                      <img
                        src="/assets/images/mamun_sign.png"
                        className="signature-image"
                        alt="Signature"
                      />
                      <div className="signature-line"></div>
                      <p className="signature-name">Md. Mamunur Rashid</p>
                      <p className="signature-title">
                        Chief Executive Officer, {websitelink}
                      </p>
                    </div>

                    <div className="certificate-qr">
                      {qrCodeBase64 && (
                        <img
                          src={qrCodeBase64}
                          alt="QR Code"
                          style={{ width: "120px", height: "120px" }}
                        />
                      )}
                      <p className="qr-note text-center">Scan to Verify</p>
                    </div>
                  </div>

                  <div className="certificate-website">
                    <p>
                      Website:{" "}
                      <a
                        href="https://www.w3programmer.net"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {websitelink}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Inline CSS for the watermark */}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Certificate;
