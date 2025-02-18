
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateOrdinance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    draftOrdinanceNo: "",
    draftOrdinanceDate: "",
    finalOrdinanceNo: "",
    finalOrdinanceDate: "",
    dateOfPublication: "",
    concernSection: "",
    pdfFile: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/Ordinances/${id}`);
      if (!response.data) {
        throw new Error("No data found");
      }
      setFormData({
        title: response.data.title || "",
        draftOrdinanceNo: response.data.draftOrdinanceNo || "",
        draftOrdinanceDate: response.data.draftOrdinanceDate || "",
        finalOrdinanceNo: response.data.finalOrdinanceNo || "",
        finalOrdinanceDate: response.data.finalOrdinanceDate || "",
        dateOfPublication: response.data.dateOfPublication || "",
        concernSection: response.data.concernSection || "",
        pdfFile: null, // Reset file input
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ ...formData, pdfFile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.append("title", formData.title);
    updatedFormData.append("draftOrdinanceNo", formData.draftOrdinanceNo);
    updatedFormData.append("draftOrdinanceDate", formData.draftOrdinanceDate);
    updatedFormData.append("finalOrdinanceNo", formData.finalOrdinanceNo);
    updatedFormData.append("finalOrdinanceDate", formData.finalOrdinanceDate);
    updatedFormData.append("dateOfPublication", formData.dateOfPublication);
    updatedFormData.append("concernSection", formData.concernSection);

    if (formData.pdfFile instanceof File) {
      updatedFormData.append("pdfFile", formData.pdfFile);
    }

    try {
      const response = await axios.put(`http://localhost:5001/Ordinances/Ordinances${id}`, updatedFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message || "Ordinance updated successfully");
      navigate("/ordinances");
    } catch (error) {
      console.error("Error updating ordinance:", error);
      alert("Failed to update the ordinance.");
    }
  };

  return (
    <div>
      <h1>Update Ordinance</h1>
      <form onSubmit={handleSubmit} className="form-container" encType="multipart/form-data">
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Draft Ordinance No and Date:</label>
          <input type="text" name="draftOrdinanceNo" value={formData.draftOrdinanceNo} onChange={handleChange} required />
          <input type="date" name="draftOrdinanceDate" value={formData.draftOrdinanceDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Final Ordinance No and Date:</label>
          <input type="text" name="finalOrdinanceNo" value={formData.finalOrdinanceNo} onChange={handleChange} required />
          <input type="date" name="finalOrdinanceDate" value={formData.finalOrdinanceDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Date of Publication:</label>
          <input type="date" name="dateOfPublication" value={formData.dateOfPublication} onChange={handleChange} required />
        </div>
        <div>
          <label>Concern Section:</label>
          <input type="text" name="concernSection" value={formData.concernSection} onChange={handleChange} required />
        </div>
        <div>
          <label>Upload PDF:</label>
          <input type="file" name="pdfFile" onChange={handleFileChange} />
        </div>
        <div className="form-buttons">
          <button type="submit">Update</button>
          <button type="button" onClick={() => navigate("/ordinances")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOrdinance;
