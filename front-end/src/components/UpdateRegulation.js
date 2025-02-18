

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateRegulation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [regulationData, setRegulationData] = useState({
    direction: "",
    rule: "",
    ordinance: "",
    statute: "",
    pdfFile: null,
  });

  useEffect(() => {
    axios.get(`http://localhost:5001/regulations/${id}`)
      .then(response => {
        setRegulationData(response.data);
      })
      .catch(error => {
        console.error("Error fetching regulation:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setRegulationData({ ...regulationData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setRegulationData({ ...regulationData, pdfFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    console.log(".....................................");
    e.preventDefault();
    const formData = new FormData();
    formData.append("direction", regulationData.direction);
    formData.append("rule", regulationData.rule);
    formData.append("ordinance", regulationData.ordinance);
    formData.append("statute", regulationData.statute);
    if (regulationData.pdfFile) {
      formData.append("pdfFile", regulationData.pdfFile);
    }
    
    try {await axios.patch(`http://localhost:5001/regulations/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    navigate("/Regulation");
    } catch (error) {
      console.error("Error updating regulation:", error);
    }
  };

  return (
    <div className="form-container">
      <h1>Update Regulation</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:
          <input type="text" name="direction" value={regulationData.direction} onChange={handleChange} />
        </label>
        <br />
        <label>Draft Regulation No and Date:
          <input type="text" name="rule" value={regulationData.rule} onChange={handleChange} />
        </label>
        <br />
        <label>Final Regulation No and Date:
          <input type="text" name="ordinance" value={regulationData.ordinance} onChange={handleChange} />
        </label>
        <br />
        <label>Concern Section:
          <input type="text" name="statute" value={regulationData.statute} onChange={handleChange} />
        </label>
        <br />
        <label>PDF File:</label>
        <input type="file" name="pdfFile" onChange={handleFileChange} />
        <br />
        <button type="submit">Update</button>
        <button type="button" onClick={handleSubmit}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateRegulation;
