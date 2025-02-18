

import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Ordinance = () => {
  const [ordinanceData, setOrdinanceData] = useState({
    srNo: "",
    title: "",
    draftOrdinanceNo: "",
    draftOrdinanceDate: "",
    finalOrdinanceNo: "",
    finalOrdinanceDate: "",
    dateOfPublication: "",
    concernSection: "",
    pdfFile: null, // null to represent no file initially
  });
  const [showForm, setShowForm] = useState(false); // Toggle to show the update form
  const [ordinanceInfo, setOrdinanceInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch ordinance info from the backend
  const getOrdinanceInfo = async () => {
    try {
      const response = await fetch("http://localhost:5001/Ordinances/getOrdinances");
      const result = await response.json();
      console.log("Fetched Ordinances:", result);
      setOrdinanceInfo(result); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching Ordinance info:", error);
    }
  };

  // Handle update button click
  const handleUpdateClick = (id) => {
    const ordinanceToUpdate = ordinanceInfo.find((info) => info._id === id);
    
    if (ordinanceToUpdate) {
      console.log("Updating ordinance data: ", ordinanceToUpdate); // Debugging line

      setOrdinanceData({
        srNo: ordinanceToUpdate.srNo,
        title: ordinanceToUpdate.title,
        draftOrdinanceNo: ordinanceToUpdate.draftOrdinanceNo,
        draftOrdinanceDate: ordinanceToUpdate.draftOrdinanceDate,
        finalOrdinanceNo: ordinanceToUpdate.finalOrdinanceNo,
        finalOrdinanceDate: ordinanceToUpdate.finalOrdinanceDate,
        dateOfPublication: ordinanceToUpdate.dateOfPublication,
        concernSection: ordinanceToUpdate.concernSection,
        pdfFile: ordinanceToUpdate.pdfFile, // Optional: you may or may not display it here
      });
      setShowForm(true); // Show the form to update
    }
  };

  // Search functionality
  const searchHandle = async (event) => {
    const key = event.target.value;
    setSearchQuery(key);
    if (key) {
      try {
        const response = await fetch(`http://localhost:5001/Ordinances/searchOrdinances/${key}`);
        const result = await response.json();
        setOrdinanceInfo(result.length > 0 ? result : []);
      } catch (error) {
        console.error("Error searching Ordinance info:", error);
      }
    } else {
      getOrdinanceInfo();
    }
  };


 
  

  useEffect(() => {
    getOrdinanceInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrdinanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setOrdinanceData((prevData) => ({
      ...prevData,
      pdfFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("srNo", ordinanceData.srNo);
    formData.append("title", ordinanceData.title);
    formData.append("draftOrdinanceNo", ordinanceData.draftOrdinanceNo);
    formData.append("draftOrdinanceDate", ordinanceData.draftOrdinanceDate);
    formData.append("finalOrdinanceNo", ordinanceData.finalOrdinanceNo);
    formData.append("finalOrdinanceDate", ordinanceData.finalOrdinanceDate);
    formData.append("dateOfPublication", ordinanceData.dateOfPublication);
    formData.append("concernSection", ordinanceData.concernSection);
    formData.append("pdfFile", ordinanceData.pdfFile);

    try {
      const response = await axios.post("http://localhost:5001/Ordinances/createOrdinances", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(response.data.message);
      setShowForm(false);
      setOrdinanceData({
        srNo: "",
        title: "",
        draftOrdinanceNo: "",
        draftOrdinanceDate: "",
        finalOrdinanceNo: "",
        finalOrdinanceDate: "",
        dateOfPublication: "",
        concernSection: "",
        pdfFile: null,
      }); // Reset form after submit
      getOrdinanceInfo();
    } catch (error) {
      alert("Failed to submit the form.");
    }
  };

  const deleteOrdinanceInfo = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const response = await axios.delete(`http://localhost:5001/ordinances/deleteOrdinance/${id}`);
        alert(response.data.message || "Deleted successfully.");
        setOrdinanceInfo((prevInfo) => prevInfo.filter(info => info._id !== id));
      } catch (error) {
        console.error("Error deleting ordinance:", error);
        alert("Failed to delete.");
      }
    }
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Ordinance Records", 20, 20);
  
    const tableData = ordinanceInfo.map((info) => [
      info.srNo,
      info.title,
      info.draftOrdinanceNo,
      info.draftOrdinanceDate,
      info.finalOrdinanceNo,
      info.finalOrdinanceDate,
      info.dateOfPublication,
      info.concernSection,
      info.pdfFile ? `View PDF` : "No File",  // Show if PDF exists or not
    ]);
  
    doc.autoTable({
      head: [
        [
          "Sr.No",
          "Title",
          "Draft Ordinance No",
          "Draft Ordinance Date",
          "Final Ordinance No",
          "Final Ordinance Date",
          "Date of Publication",
          "Concern Section",
          "PDF File",
        ],
      ],
      body: tableData,
    });
  
    doc.save("ordinance_records.pdf");
  };
  
  
  return (
    <div className="table">
      <h1>Welcome to the Ordinance Page</h1>
      <input
        type="text"
        className="search-ordinance-box"
        placeholder="Search Ordinance"
        value={searchQuery}
        onChange={searchHandle}
      />
      <button className="add-button" onClick={() => setShowForm(true)}>
        Add Ordinance
      </button>

      <button className="generate-pdf-button" onClick={generatePDF}>
  Download PDF
</button>


      {!showForm ? (
        <table border="1px solid blue">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Title</th>
              <th>Draft Ordinance No</th>
              <th>Draft Ordinance Date</th>
              <th>Final Ordinance No</th>
              <th>Final Ordinance Date</th>
              <th>Date of Publication</th>
              <th>Concern Section</th>
              <th>PDF File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordinanceInfo.length > 0 ? (
              ordinanceInfo.map((info, index) => (
                <tr key={info._id}>
                  <td>{index + 1}</td>
                  <td>{info.title}</td>
                  <td>{info.draftOrdinanceNo}</td>
                  <td>{info.draftOrdinanceDate}</td>
                  <td>{info.finalOrdinanceNo}</td>
                  <td>{info.finalOrdinanceDate}</td>
                  <td>{info.dateOfPublication}</td>
                  <td>{info.concernSection}</td>
                  {/* <td>
                    {info.pdfFile && (
                      <a href={`http://localhost:5001/${info.pdfFile}`} target="_blank" rel="noopener noreferrer">
                        View PDF
                      </a>
                    )}
                  </td> */}

<td>
  {info.pdfFile && (
    <a
      href={`http://localhost:5001/${info.pdfFile}`}
      target="_blank"
      rel="noopener noreferrer"
      type="application/pdf"
    >
      View PDF
    </a>
  )}
</td>

                  <td>
                    <button className="delete-button" onClick={() => deleteOrdinanceInfo(info._id)}>Delete</button>
                    <button onClick={() => handleUpdateClick(info._id)}>Update</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <form onSubmit={handleSubmit} className="form-container" encType="multipart/form-data">
          <div>
            <label>Title:</label>
            <input type="text" name="title" value={ordinanceData.title} onChange={handleChange} required />
          </div>
          <div>
            <label>Draft Ordinance No:</label>
            <input type="text" name="draftOrdinanceNo" value={ordinanceData.draftOrdinanceNo} onChange={handleChange} required />
          </div>
          <div>
            <label>Draft Ordinance Date:</label>
            <input type="date" name="draftOrdinanceDate" value={ordinanceData.draftOrdinanceDate} onChange={handleChange} required />
          </div>
          <div>
            <label>Final Ordinance No:</label>
            <input type="text" name="finalOrdinanceNo" value={ordinanceData.finalOrdinanceNo} onChange={handleChange} required />
          </div>
          <div>
            <label>Final Ordinance Date:</label>
            <input type="date" name="finalOrdinanceDate" value={ordinanceData.finalOrdinanceDate} onChange={handleChange} required />
          </div>
          <div>
            <label>Date of Publication:</label>
            <input type="date" name="dateOfPublication" value={ordinanceData.dateOfPublication} onChange={handleChange} required />
          </div>
          <div>
            <label>Concern Section:</label>
            <input type="text" name="concernSection" value={ordinanceData.concernSection} onChange={handleChange} required />
          </div>
          <div>
            <label>Upload PDF:</label>
            <input type="file" name="pdfFile" onChange={handleFileChange} />
          </div>
          <div className="form-buttons">
            <button type="submit" className="submit-button">Update</button>
            <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Ordinance;
