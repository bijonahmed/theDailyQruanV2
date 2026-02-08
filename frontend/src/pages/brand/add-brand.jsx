import React, { useState, useEffect } from "react";
import axios from "/config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const AddBrand = () => {
  const navigate = useNavigate();
  const [name, setBrandName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({}); // Define errors state

  const handleBrandNameChange = (e) => {
    setBrandName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/brands/save", {
        name,
        description,
        status,
      });
      console.log(response.data.message);
      navigate("/brand-list");
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("Validation errors:", error.response.data.errors);
        setErrors(error.response.data.errors);
      } else {
        console.error("Error adding brand:", error);
      }
    }
  };

  const backtoBrandlist = () => {
    navigate("/brand-list");
  };

  return (
    <div>
      <Helmet>
        <title>Add Brand</title>
      </Helmet>
      <div className="container">
        <br />
        <div className="row">
          <div className="col-9">
            <h2>Add Brand</h2>
          </div>
          <div className="col-2">
            <button className="btn btn-primary" onClick={backtoBrandlist}>
              Back to Brand List
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="brandName">Brand Name:</label>
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
            <label htmlFor="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>

          <div>
            <label htmlFor="description">Status:</label>
            <select
              className="form-control"
              id="status"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            {errors.status && (
              <div className="error" style={{ color: "red" }}>
                {errors.status[0]}
              </div>
            )}
          </div>

          <div>
            <br />
            <button type="submit" className="btn btn-primary w-100">
              Add Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
