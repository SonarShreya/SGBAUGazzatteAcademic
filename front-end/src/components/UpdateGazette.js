import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateGazette = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    draftGovNo: "",   
    draftGovDate: "",
    dateOfPublication: "",
    concernSection: "",
    pdfFile: null,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/gazette/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, pdfFile: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    
    form.append("title", formData.title);
    form.append("draftGovNo", formData.draftGovNo);
    form.append("draftGovDate", formData.draftGovDate);
    form.append("dateOfPublication", formData.dateOfPublication);
    form.append("concernSection", formData.concernSection);
    if (formData.pdfFile) form.append("pdfFile", formData.pdfFile);

    try {
        console.log("Submitting Update Request:", formData);
        const response = await axios.put(
            `http://localhost:5001/api/updategazette/${id}`,
            form,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        if (response.status === 200) {
            alert("Record updated successfully");
            navigate("/govt-gazette");
        }
    } catch (error) {
        console.error("Error updating record:", error);
        alert("Failed to update the record.");
    }
  };

  return (
    <div>
      <h1>Update Gazette</h1>
      <form onSubmit={handleSubmit} className="form-container" encType="multipart/form-data">
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label> Gazette No:</label>
          <input
            type="text"
            name="draftGovNo"
            value={formData.draftGovNo}
            onChange={handleChange}
            required
          />
          <label> Gazette Date:</label>
          <input
            type="date"
            name="draftGovDate"
            value={formData.draftGovDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Date of Publication:</label>
          <input
            type="date"
            name="dateOfPublication"
            value={formData.dateOfPublication}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Concern Section:</label>
          <input
            type="text"
            name="concernSection"
            value={formData.concernSection}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Upload PDF:</label>
          <input type="file" name="pdfFile" onChange={handleFileChange} />
        </div>
        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Update
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/govt-gazette")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateGazette;
