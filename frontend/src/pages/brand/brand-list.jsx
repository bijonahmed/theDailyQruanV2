import React, { useState, useEffect } from "react";
import axios from "/config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const BrandList = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);

  
  const fetchData = async () => {
    try {
      const response = await axios.get("/brands/allbrandlist");
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("for testing....");
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.get(`/brands/delete/${id}`);
      console.log(response.data.message);
      fetchData();
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };


 const handleEdit = async (brandId) => {
  navigate(`/edit-brand/${brandId}`);
  };
  

  const addBrand = () => {
    navigate("/add-brand");
  };

  return (
    <div>
       <Helmet>
        <title>Brand List</title>
      </Helmet>
      <div className="container">
        <br />
        <div className="row">
          <div className="col-9">
            <h2>Brand List</h2>
          </div>
          <div className="col-2">
            <button className="btn btn-primary" onClick={addBrand}>
              Add New Brand
            </button>
          </div>
        </div>
     
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Brand Name</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{brand.name}</td>
              <td>
                {brand.status == 1 ? (
                  <span style={{ color: "green" }}>Active</span>
                ) : (
                  <span style={{ color: "red" }}>Inactive</span>
                )}
              </td>
              <td>
              <button onClick={() => handleEdit(brand.id)}>Edit</button>
                <button onClick={() => handleDelete(brand.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default BrandList;
