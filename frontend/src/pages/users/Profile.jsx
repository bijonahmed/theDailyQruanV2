import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import GuestNavbar from "../../components/GuestNavbar";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "/config/axiosConfig";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Add loading state
  const [nationality_id, setnationality_id] = useState("");
  const [countrys, setCountry] = useState([]);
  const [w3_address, setw3Address] = useState("");
  const [name, setUserFName] = useState("");
  const [lname, setUserlName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [inviteCode, setinviteCode] = useState("");
  const [image, setImage] = useState("");
  const [whtsapp, setWhtsapp] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(sessionStorage.getItem("token"));
      const formData = new FormData();
      formData.append("nationality_id", nationality_id);
      formData.append("name", name);
     // formData.append("email", email);
      formData.append("phone_number", phone_number);
  
      if (image) {
        formData.append("file", image);
      }

      const response = await axios.post("/user/updateUser", formData, {
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

  const handleFnameChange = (e) => {
    setUserFName(e.target.value);
  };
  const handleLnameChange = (e) => {
    setUserlName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleWhatsAppChange = (e) => {
    setWhtsapp(e.target.value);
  };

  const handlePicChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (event) => {
    setnationality_id(event.target.value);
  };

  const handleInviteCodeChange = (e) => {
    setinviteCode(e.target.value);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const token = JSON.parse(sessionStorage.getItem("token")); // Retrieve the token from local storage
        const response = await axios.get("/user/checkCurrentUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        //console.log("response", response.data.country);
        setw3Address(response.data.user.w3_id);
        setUserFName(response.data.user.name);
        setEmail(response.data.user.email);
        setPhoneNumber(response.data.user.phone_number);
        setinviteCode(response.data.user.inviteCode);
        setnationality_id(response.data.user.nationality_id);
        setImage(response.data.image);
        setTimeout(() => {
          setCountry(response.data.country);
        }, 1000);

        //setStatus(response.data.data.status.toString());
      } catch (error) {
        console.error("Error fetching brand data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchUserData();
  }, []);

  return (
    <>
      <Helmet>
        <title>w3programmer - Profile</title>
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
              <li>Profile</li>
            </ul>
          </div>
        </section>

        <main className="page_content">
  {loading ? (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
      <div className="spinner-border text-primary" role="status" />
    </div>
  ) : (
    <section
      className="container py-5 px-4 shadow-sm"
      style={{
        backgroundColor: "#fdfdfd",
        borderRadius: "12px",
        border: "1px solid #ddd",
      }}
    >
      <form className="row g-4" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label fw-semibold">My W3 ID:</label>
          <div className="border p-2 rounded bg-light">{w3_address}</div>
        </div>

        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input type="text" value={name} className="form-control" onChange={handleFnameChange} />
          {errors.name && <div className="text-danger mt-1">{errors.name[0]}</div>}
        </div>


        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" disabled readOnly value={email} className="form-control" onChange={handleEmailChange} />
          {errors.email && <div className="text-danger mt-1">{errors.email[0]}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input type="text" value={phone_number} className="form-control" onChange={handlePhoneChange} />
          {errors.phone_number && <div className="text-danger mt-1">{errors.phone_number[0]}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Invite Code</label>
          <input type="text" className="form-control" value={inviteCode} readOnly disabled />
          {errors.inviteCode && <div className="text-danger mt-1">{errors.inviteCode[0]}</div>}
        </div>


        <div className="col-md-6">
          <label className="form-label">Country</label>
          <select className="form-select" value={nationality_id} onChange={handleChange}>
            <option value="">Select a country...</option>
            {countrys.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.nationality_id && <div className="text-danger mt-1">{errors.nationality_id[0]}</div>}
        </div>

        <div className="col-md-6">
          <label className="form-label">Upload Your Picture</label>
          <input type="file" className="form-control" onChange={handlePicChange} />
          {errors.file && <div className="text-danger mt-1">{errors.file[0]}</div>}
        </div>

        {image && (
          <div className="col-md-12 text-center">
            <img src={image} alt="Uploaded" className="img-thumbnail mt-3" style={{ maxWidth: "150px" }} />
          </div>
        )}

        <div className="col-12 mt-4 text-center">
          <button type="submit" className="btn btn-primary px-4 py-2">
            Submit
          </button>
        </div>
      </form>
    </section>
  )}
</main>

        <br />

        <Footer />
      </div>
    </>
  );
};

export default Profile;
