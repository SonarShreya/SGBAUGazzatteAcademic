




import React, { useState } from 'react';
import axios from 'axios';

const AddGazetteForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    draftGovNo: '',
    draftGovDate: '',
    finalGovNo: '',
    finalGovDate: '',
    dateOfPublication: '',
    concernSection: '',
    pdfFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      pdfFile: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5001/api/gazettes', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error adding Gazette');
    }
  };

  return (
    <div className="form-container">
      <h1>Add New Gazette</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        <br />
        <label>Draft Govt Gazette No:</label>
        <input type="text" name="draftGovNo" value={formData.draftGovNo} onChange={handleChange} required />
        <br />
        <label>Draft Govt Gazette Date:</label>
        <input type="date" name="draftGovDate" value={formData.draftGovDate} onChange={handleChange} required />
        <br />
        <label>Final Govt Gazette No:</label>
        <input type="text" name="finalGovNo" value={formData.finalGovNo} onChange={handleChange} />
        <br />
        <label>Final Govt Gazette Date:</label>
        <input type="date" name="finalGovDate" value={formData.finalGovDate} onChange={handleChange} />
        <br />
        <label>Date of Publication:</label>
        <input type="date" name="dateOfPublication" value={formData.dateOfPublication} onChange={handleChange} required />
        <br />
        <label>Concern Section:</label>
        <input type="text" name="concernSection" value={formData.concernSection} onChange={handleChange} required />
        <br />
        <label>PDF File:</label>
        <input type="file" name="pdfFile" onChange={handleFileChange} required />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddGazetteForm;
