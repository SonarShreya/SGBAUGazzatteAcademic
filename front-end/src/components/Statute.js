import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Statute = () => {
  const [statuteData, setStatuteData] = useState({
    title: "",
    draftStatuteNo: "",
    draftStatuteDate: "",
    finalStatuteNo: "",
    finalStatuteDate: "",
    publicationDate: "", 
    concernStatute: "",
    pdfFile: "",
    action: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [statuteInfo, setStatuteInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const fetchStatuteById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/Statute/${id}`);
      const data = await response.json();
      console.log("Statute Data:", data);
    } catch (error) {
      console.error("Error fetching statute:", error);
    }
  };
  

  

  const searchHandle = async (event) => {
    const key = event.target.value;
    setSearchQuery(key);
  
    if (key) {
      try {
        const response = await fetch(`http://localhost:5001/api/searchStatute/${key}`);
        const data = await response.json();
        setStatuteInfo(data.length > 0 ? data : []);
      } catch (error) {
        console.error("Error searching statute info:", error);
      }
    } else {
      getStatuteInfo();
    }
  };
 
  useEffect(() => {
    console.log("useEffect triggered!");
    getStatuteInfo(); // This ensures that data is fetched when the component is first rendered
  }, []);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatuteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0]; 
    setStatuteData((prevData) => ({
      ...prevData,
      pdfFile: file,
    }));
  };

  // 
  





  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("srNO", statuteData.srNo);
    formData.append("title", statuteData.title);
    formData.append("draftStatuteNo", statuteData.draftStatuteNo);
    formData.append("draftStatuteDate", statuteData.draftStatuteDate);
    formData.append("finalStatuteNo", statuteData.finalStatuteNo);
    formData.append("finalStatuteDate", statuteData.finalStatuteDate);
    formData.append("publicationDate", statuteData.publicationDate);
    formData.append("concernStatute", statuteData.concernStatute);
    formData.append("pdfFile", statuteData.pdfFile);
  
    try {
      const response = await axios.post("http://localhost:5001/api/insertStatute", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      alert(response.data.message); // Display success message
      setShowForm(false); // Close the form
  
      // Clear form data
      setStatuteData({
        title: "",
        draftStatuteNo: "",
        draftStatuteDate: "",
        finalStatuteNo: "",
        finalStatuteDate: "",
        publicationDate: "",
        concernStatute: "",
        pdfFile: "",
        action: "",
      });
  
      // Ensure the table is updated after the form submission
      getStatuteInfo();
  
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };
  
  const getStatuteInfo = async () => {
    try {
        console.log("Fetching data from API...");
        const response = await fetch("http://localhost:5001/api/api/Statute"); // Double-check the endpoint

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received:", data); // Check what data is coming from the API
        setStatuteInfo(data); // Update state with received data
    } catch (error) {
        console.error("Error fetching statute info:", error);
    }
};

  
 
  
  const deleteStatuteInfo = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/deleteStatute/${id}`);
        alert(response.data.message || "Deleted successfully.");
        getStatuteInfo();
      } catch (error) {
        console.error("Error deleting statute:", error);
        alert(error?.response?.data?.message || "Failed to delete.");
      }
    }
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Statute Records", 20, 20);
    const tableData = statuteInfo.map((info) => [
      info.title,
      info.draftStatuteNo,
      info.draftStatuteDate,
      info.finalStatuteNo,
      info.finalStatuteDate,
      info.publicationDate,
      info.concernStatute,
      info.pdfFile,
      info.action,
    ]);

    doc.autoTable({
      head: [
        [
          "Title",
          "Draft Statute No",
          "Draft Statute Date",
          "Final Statute No",
          "Final Statute Date",
          "Date of Publication",
          "Concern Section",
          "PDF File",
          "Action",
        ],
      ],
      body: tableData,
    });

    doc.save("statute_records.pdf");
  };

  return (
    <div className="table">
      <h1>Welcome to the Statute Page</h1>
      <input
        type="text"
        className="search-statute-box"
        placeholder="Search Statute"
        value={searchQuery}
        onChange={searchHandle}
      />
      <button className="add-button" onClick={() => setShowForm(true)}>
        Add Statute
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
              <th>Draft Statute No</th>
              <th>Draft Statute Date</th>
              <th>Final Statute No</th>
              <th>Final Statute Date</th>
              <th>Concern Statute</th>
              <th>PDF File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {statuteInfo.length > 0 ? (
    statuteInfo.map((info, index) => (
      <tr key={info._id}>
        <td>{index + 1}</td>
        <td>{info.title}</td>
        <td>{info.draftStatuteNo}</td>
        <td>{info.draftStatuteDate}</td>
        <td>{info.finalStatuteNo}</td>
        <td>{info.finalStatuteDate}</td>
        <td>{info.concernStatute}</td>
        <td>
          {info.pdfFile && (
            <a href={`http://localhost:5001${info.pdfFile}`} target="_blank" rel="noopener noreferrer">
              {info.pdfFile.split("/").pop()}
            </a>
          )}
        </td>
        <td>
          <button className="delete-button" onClick={() => deleteStatuteInfo(info._id)}>
            Delete
          </button>
          <button onClick={() => setShowForm(true)}>Update</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9" style={{ textAlign: "center" }}>
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
            <input
              type="text"
              name="title"
              value={statuteData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Draft Statute No and Date:</label>
            <input
              type="text"
              name="draftStatuteNo"
              value={statuteData.draftStatuteNo}
              onChange={handleChange}
            />
            <input
              type="date"
              name="draftStatuteDate"
              value={statuteData.draftStatuteDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Final Statute No and Date:</label>
            <input
              type="text"
              name="finalStatuteNo"
              value={statuteData.finalStatuteNo}
              onChange={handleChange}
            />
            <input
              type="date"
              name="finalStatuteDate"
              value={statuteData.finalStatuteDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Publication Date:</label>
            <input
              type="date"
              name="publicationDate"
              value={statuteData.publicationDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Concern Statute:</label>
            <input
              type="text"
              name="concernStatute"
              value={statuteData.concernStatute}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Upload PDF:</label>
            <input
              type="file"
              name="pdfFile"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-button">Submit</button>
            <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Statute;





