
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateGazetteII = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    draftGovNo: "",
    draftGovDate: "",
    dateOfPublication: "",
    concernSection: "",
    pdfFile: null, // Store file instead of string
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/gazette2/updategazette2${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to load the Gazette details.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pdfFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("draftGovNo", formData.draftGovNo);
    formDataToSend.append("draftGovDate", formData.draftGovDate);
    formDataToSend.append("dateOfPublication", formData.dateOfPublication);
    formDataToSend.append("concernSection", formData.concernSection);
  
    if (formData.pdfFile) {
      formDataToSend.append("pdfFile", formData.pdfFile);
    }
  
    console.log("Form Data Before Submit:", [...formDataToSend]);
  
    try {
      const response = await axios.put(
        `http://localhost:5001/gazette2/updategazette2/${id}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      console.log("Server Response:", response);
  
      if (response.status === 200) {
        alert("Gazette updated successfully");
        navigate("/govt-gazette2"); 
      } else {
        alert("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Error updating record:", error.response ? error.response.data : error.message);
      alert("Failed to submit data. Please try again.");
    }
  };
  
  return (
    <div className="form-container">
      <h1>Update Gazette II</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />

        <label>Draft Government No:</label>
        <input
          type="text"
          name="draftGovNo"
          value={formData.draftGovNo}
          onChange={handleInputChange}
          required
        />

        <label>Draft Government Date:</label>
        <input
          type="date"
          name="draftGovDate"
          value={formData.draftGovDate}
          onChange={handleInputChange}
          required
        />

        <label>Date of Publication:</label>
        <input
          type="date"
          name="dateOfPublication"
          value={formData.dateOfPublication}
          onChange={handleInputChange}
          required
        />

        <label>Concern Section:</label>
        <input
          type="text"
          name="concernSection"
          value={formData.concernSection}
          onChange={handleInputChange}
          required
        />

        <label>PDF File:</label>
        <input type="file" name="pdfFile" onChange={handleFileChange} />

        <button type="submit">Update Gazette</button>
      </form>
    </div>
  );
};

export default UpdateGazetteII;
