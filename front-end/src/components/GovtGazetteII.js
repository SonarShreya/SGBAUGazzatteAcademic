
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import "jspdf-autotable";

const GovtGazetteII = () => {
  const [data, setData] = useState([]);  // Store the fetched data
  const [searchQuery, setSearchQuery] = useState('');  // Search input state
  const [showForm, setShowForm] = useState(false);  // Toggle form visibility
  const [currentRecord, setCurrentRecord] = useState({});  // State for the current record being added/edited
  const navigate = useNavigate();  // Used for navigation (if needed)

  // Fetch data for GovtGazette2
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/gazette2/gazette2');
      setData(response.data);  // Update state with the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);  // Error handling
    }
  };

  useEffect(() => {
    fetchData();  // Fetch data on component mount
  }, []);

  // Delete record
  const deleteRecord = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await axios.delete(`http://localhost:5001/gazette2/${id}`);
        if (response.status === 200) {
          alert('Record deleted successfully');
          setData(data.filter((item) => item._id !== id));  // Remove the deleted record from state
        } else {
          alert('Failed to delete the record');
        }
      } catch (error) {
        console.error('Error deleting record:', error.message);
        alert('Failed to delete the record. Check your server or network.');
      }
    }
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Handle add button click (show form)
  const handleAddButtonClick = () => {
    setShowForm(true);  // Show the form
    setCurrentRecord({});  // Clear the current record for adding new entry
  };

  // Handle update button click (populate form with existing data)
  const handleUpdateButtonClick = (record) => {
    setCurrentRecord(record);  // Set the current record to the clicked one
    setShowForm(true);  // Show the form to edit the record
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", currentRecord.title || "");
    formData.append("draftGovNo", currentRecord.draftGovNo || "");
    formData.append("draftGovDate", currentRecord.draftGovDate || "");
    formData.append("dateOfPublication", currentRecord.dateOfPublication || "");
    formData.append("concernSection", currentRecord.concernSection || "");

    if (currentRecord.pdfFile instanceof File) {
      formData.append("pdfFile", currentRecord.pdfFile);
    }

    console.log("Submitting Form Data:", [...formData.entries()]); // ✅ Log FormData to verify

    try {
      if (currentRecord._id) {
        const response = await axios.put(
          `http://localhost:5001/updategazette2/${currentRecord._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("Update Response:", response.data);
        alert("Record updated successfully");
      } else {
        const response = await axios.post(
          "http://localhost:5001/gazette2/gazette2",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        console.log("Insert Response:", response.data);
        alert("Record added successfully");
      }

      fetchData(); // Refresh table data
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error.message);
      alert("Failed to submit data. Please try again.");
    }
  };

  // Generate PDF for the table data
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Govt. Gazette II Report', 20, 10);

    const tableData = filteredData.map(item => [
      item.srNo,
      item.title,
      item.draftGovNo,
      item.draftGovDate,
      item.dateOfPublication,
      item.concernSection,
      item.pdfFile,
    ]);

    doc.autoTable({
      head: [
        ["Sr.No", "Title", "Draft GovtGazette No and Date", "Date of Publication", "Concern Section", "PDF File"],
      ],
      body: tableData,
    });

    doc.save('Govt_Gazette_II_Report.pdf');
  };

  return (
    <div className="table">
      <h1>Govt. Gazette II Details</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}  // Update search query
      />
      <button onClick={handleAddButtonClick}>Add Record</button>
      <button onClick={generatePDF}>Download PDF</button>

      {!showForm ? (
        <table>
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Title</th>
              <th>GovtGazette No</th>
              <th>GovtGazette Date</th>
              <th>Publication Date</th>
              <th>Concern Section</th>
              <th>PDF File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.draftGovNo} </td>
                  <td>{item.draftGovDate}</td>
                  <td>{item.dateOfPublication}</td>
                  <td>{item.concernSection}</td>
                  <td>
                    <a href={`http://localhost:5001/uploads/${item.pdfFile}`} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
                  </td>

                  <td>
                    <button onClick={() => deleteRecord(item._id)}>Delete</button>
                    <button onClick={() => handleUpdateButtonClick(item)}>Update</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <form onSubmit={handleSubmit} className="form-container" encType="multipart/form-data">
          <label>Title:</label>
          <input
            type="text"
            value={currentRecord.title || ''}
            onChange={(e) => setCurrentRecord({ ...currentRecord, title: e.target.value })}
          />
          <label>GovtGazette No:</label>
          <input
            type="text"
            value={currentRecord.draftGovNo || ''}
            onChange={(e) => setCurrentRecord({ ...currentRecord, draftGovNo: e.target.value })}
          />
          <label>GovtGazette Date:</label>
          <input
            type="date"
            value={currentRecord.draftGovDate || ''}
            onChange={(e) => setCurrentRecord({ ...currentRecord, draftGovDate: e.target.value })}
          />
          <label>Date of Publication:</label>
          <input
            type="date"
            value={currentRecord.dateOfPublication || ''}
            onChange={(e) => setCurrentRecord({ ...currentRecord, dateOfPublication: e.target.value })}
          />
          <label>Concern Section:</label>
          <input
            type="text"
            value={currentRecord.concernSection || ''}
            onChange={(e) => setCurrentRecord({ ...currentRecord, concernSection: e.target.value })}
          />
          <label>PDF File:</label>
          <input
            type="file"
            onChange={(e) => setCurrentRecord({ ...currentRecord, pdfFile: e.target.files[0] })}
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default GovtGazetteII;
