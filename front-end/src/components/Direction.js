

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const Direction = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [directionInfo, setDirectionInfo] = useState([]);
  const [error, setError] = useState(""); // Add error state
  const navigate = useNavigate();

  // Fetch directions from backend
  const fetchDirections = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/directions");
      setDirectionInfo(response.data);
    } catch (error) {
      setError("Failed to fetch directions. Please try again.");
    }
  };

  // Fetch directions initially and whenever the search query changes
  useEffect(() => {
    fetchDirections();
  }, []);

  // Handle search functionality
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      fetchDirections(); // If search query is empty, fetch all directions
    } else {
      try {
        const response = await axios.get(`http://localhost:5001/api/search?query=${searchQuery}`);
        setDirectionInfo(response.data); // Update with filtered data
      } catch (error) {
        setError("Failed to search directions.");
      }
    }
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/deleteDirection/${id}`);
        if (response.status === 200) {
          alert(response.data.message);
          setDirectionInfo((prev) => prev.filter((info) => info._id !== id));
        } else {
          alert("Failed to delete the record. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting record:", error);
        alert("Failed to delete the record. Please try again.");
      }
    }
  };

 

  
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Direction Records", 20, 20);
  
    // Convert all values to strings safely
    const tableData = directionInfo.map((info, index) => [
      (index + 1).toString(),
      (info.title || "").toString(),
      (info.draftDirectionNo || "").toString(),
      (info.draftDirectionDate || "").toString(),
      (info.dateOfRenewal || "").toString(),
      (info.concernSection || "").toString(),
      (info.pdfFile || "").toString(),
    ]);
  
    doc.autoTable({
      head: [
        [
          "Sr.No",
          "Title",
          "Draft Direction No",
          "Draft Direction Date",
          "Date of Renewal",
          "Concern Section",
          "PDF File",
        ],
      ],
      body: tableData,
    });
  
    doc.save("DirectionData.pdf");
  };
  


  return (
    <div className="table">
      <h1>Direction Page</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <Link to="/add-direction">
        <button>Add New Direction</button>
      </Link>

      <button onClick={generatePDF}>Download PDF</button>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display errors if any */}

      <table border="1px solid blue">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Title</th>
            <th>Direction No</th>
            <th> Direction Date</th>
            <th>Date of Renewal</th>
            <th>Concern Section</th>
            <th>PDF File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {directionInfo.length > 0 ? (
            directionInfo.map((info, index) => (
              <tr key={info._id}>
                <td>{index + 1}</td>
                <td>{info.title}</td>
                <td>{info.draftDirectionNo}</td>
                <td>{info.draftDirectionDate}</td>
                <td>{info.dateOfRenewal}</td>
                <td>{info.concernSection}</td>
                <td>
                  <a href={`http://localhost:5001/${info.pdfFile}`} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                </td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(info._id)}>
                    Delete
                  </button>
                  <Link to={`/updatedirection/${info._id}`} style={{ marginLeft: "10px" }}>
                    Update
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No directions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Direction;



























