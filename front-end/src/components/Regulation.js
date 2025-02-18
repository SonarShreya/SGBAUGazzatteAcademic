import { FaSearch } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import jsPDF autotable plugin

const Regulation = () => {
  const [regulationData, setRegulationData] = useState({
    srNo: "",
    title: "",
    draftRegulationNo: "",
    draftRegulationDate: "",
    finalRegulationNo: "",
    finalRegulationDate: "",
    dateOfPublication: "",
    concernSection: "",
    pdfFile: "", // For file upload (e.g., PDF)
  });
  const [showForm, setShowForm] = useState(false);
  const [regulationInfo, setRegulationInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentRecord, setCurrentRecord] = useState({}); 
  const navigate = useNavigate();


  
  const getRegulationInfo = async () => {
    try {
      const response = await fetch("http://localhost:5001/Regulations");
      const result = await response.json();
      setRegulationInfo(result); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching Regulation info:", error);
    }
  };

  const handleUpdateClick = (id) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const regulationToUpdate = regulationInfo.find((info) => info._id === id);
    if (regulationToUpdate) {
      setRegulationData({
        srNo: regulationToUpdate.srNo,
        title: regulationToUpdate.title,
        draftRegulationNo: regulationToUpdate.draftRegulationNo,
        draftRegulationDate: regulationToUpdate.draftRegulationDate,
        finalRegulationNo: regulationToUpdate.finalRegulationNo,
        finalRegulationDate: regulationToUpdate.finalRegulationDate,
        dateOfPublication: regulationToUpdate.dateOfPublication,
        concernSection: regulationToUpdate.concernSection,
        pdfFile: regulationToUpdate.pdfFile, // Optional: you may or may not display it here
      });
      setShowForm(true);
    }
  };


  const searchHandle = async (event) => {
    const key = event.target.value;
    setSearchQuery(key); // Store the search query
  
    if (key) {
      try {
        const response = await fetch(`http://localhost:5001/regulations/searchRegulations/${key}`);
        const result = await response.json();
        setRegulationInfo(result.length > 0 ? result : []); // Update state with the search results
      } catch (error) {
        console.error("Error searching Regulation info:", error);
      }
    } else {
      getRegulationInfo(); // If the search query is empty, fetch all regulations
    }
  };
  

  const handleAddButtonClick = () => {
    setShowForm(true);  // Show the form
    setCurrentRecord({});  // Clear the current record for adding new entry
  };

  // Handle update button click (populate form with existing data)
  const handleUpdateButtonClick = (record) => {
    setCurrentRecord(record);  // Set the current record to the clicked one
    setShowForm(true);  // Show the form to edit the record
  };




  useEffect(() => {
    getRegulationInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegulationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setRegulationData((prevData) => ({
      ...prevData,
      pdfFile: file,
    }));
  };


  
 
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("srNo", regulationData.srNo);
  formData.append("title", regulationData.title);
  formData.append("draftRegulationNo", regulationData.draftRegulationNo);
  formData.append("draftRegulationDate", regulationData.draftRegulationDate);
  formData.append("finalRegulationNo", regulationData.finalRegulationNo);
  formData.append("finalRegulationDate", regulationData.finalRegulationDate);
  formData.append("dateOfPublication", regulationData.dateOfPublication);
  formData.append("concernSection", regulationData.concernSection);
  formData.append("pdfFile", regulationData.pdfFile); // Optional file upload

  try {
    const response = await axios.post('http://localhost:5001/Regulations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for file uploads
      },
    });
    alert(response.data.message);
    setShowForm(false);
    setRegulationData({
      srNo: "",
      title: "",
      draftRegulationNo: "",
      draftRegulationDate: "",
      finalRegulationNo: "",
      finalRegulationDate: "",
      dateOfPublication: "",
      concernSection: "",
      pdfFile: "", // Clear file input field after submission
    });
    getRegulationInfo();  // Refresh the data after adding
  } catch (error) {
    console.error('Error submitting Regulation data:', error.response?.data || error.message);
    alert("Failed to submit the form. Please try again.");
  }
};


const deleteRegulationInfo = async (id) => {
  if (window.confirm("Are you sure you want to delete this record?")) {
    try {
      const response = await axios.delete(`http://localhost:5001/regulations/${id}`);
      alert(response.data.message || "Deleted successfully.");
      getRegulationInfo();  // Fetch updated list after deletion
    } catch (error) {
      console.error("Error deleting Regulation:", error);
      alert("Failed to delete the record.");
    }
  }
};



  // PDF generation function using jsPDF and autoTable
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Regulation Records", 20, 20);
    const tableData = regulationInfo.map((info) => [
      info.srNo,
      info.title,
      info.draftRegulationNo,
      info.draftRegulationDate,
      info.finalRegulationNo,
      info.finalRegulationDate,
      info.dateOfPublication,
      info.concernSection,
      info.pdfFile,
    ]);

    doc.autoTable({
      head: [
        [
          "Sr.No",
          "Title",
          "Draft Regulation No",
          "Draft Regulation Date",
          "Final Regulation No",
          "Final Regulation Date",
          "Date of Publication",
          "Concern Section",
          "PDF File",
        ],
      ],
      body: tableData,
    });

    doc.save("regulation_records.pdf");
  };

  return (
    <div className="table">
      <h1>Regulation Page</h1>
      <input
        type="text"
        className="search-regulation-box"
        placeholder="Search Regulation"
        value={searchQuery}
        onChange={searchHandle}
      />
      <button className="add-button" onClick={() => setShowForm(true)}>
        Add Regulation
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
              <th>Draft Regulation No</th>
              <th>Draft Regulation Date</th>
              <th>Final Regulation No</th>
              <th>Final Regulation Date</th>
              <th>Date of Publication</th>
              <th>Concern Section</th>
              <th>PDF File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {regulationInfo.length > 0 ? (
              regulationInfo.map((info, index) => (
                <tr key={info._id}>
                  <td>{index + 1}</td>
                  <td>{info.title}</td>
                  <td>{info.draftRegulationNo}</td>
                  <td>{info.draftRegulationDate}</td>
                  <td>{info.finalRegulationNo}</td>
                  <td>{info.finalRegulationDate}</td>
                  <td>{info.dateOfPublication}</td>
                  <td>{info.concernSection}</td>
                  <td>
  <a
    href={`http://localhost:5001/${info.pdfFile}`} // Ensure the URL is correct for serving the file
    target="_blank" // Opens the PDF in a new tab
    rel="noopener noreferrer" // For security reasons
  >
    View PDF
  </a>
</td>
                  <td>
                    <button onClick={() => deleteRegulationInfo(info._id)}>Delete</button>
                    <button onClick={() => handleUpdateClick(info._id)}>Update</button>



                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <form onSubmit={handleSubmit} className="form-container" encType="multipart/form-data">
          <label>Sr. No</label>
          <input
            type="number"
            name="srNo"
            value={regulationData.srNo}
            onChange={handleChange}
            required
          />
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={regulationData.title}
            onChange={handleChange}
            required
          />
          <label>Draft Regulation No</label>
          <input
            type="text"
            name="draftRegulationNo"
            value={regulationData.draftRegulationNo}
            onChange={handleChange}
            required
          />
          <label>Draft Regulation Date</label>
          <input
            type="date"
            name="draftRegulationDate"
            value={regulationData.draftRegulationDate}
            onChange={handleChange}
            required
          />
          <label>Final Regulation No</label>
          <input
            type="text"
            name="finalRegulationNo"
            value={regulationData.finalRegulationNo}
            onChange={handleChange}
            required
          />
          <label>Final Regulation Date</label>
          <input
            type="date"
            name="finalRegulationDate"
            value={regulationData.finalRegulationDate}
            onChange={handleChange}
            required
          />
          <label>Date of Publication</label>
          <input
            type="date"
            name="dateOfPublication"
            value={regulationData.dateOfPublication}
            onChange={handleChange}
            required
          />
          <label>Concern Section</label>
          <input
            type="text"
            name="concernSection"
            value={regulationData.concernSection}
            onChange={handleChange}
            required
          />
          <label>PDF File</label>
          <input type="file" name="pdfFile" onChange={handleFileChange} required />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Regulation;













