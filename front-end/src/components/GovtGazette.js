import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';

const GovtGazette = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/gazettes");
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Delete record
  const deleteRecord = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await axios.delete(`http://localhost:5001/api/gazettes/${id}`);
        if (response.status === 200) {
          alert('Record deleted successfully');
          setData(data.filter((item) => item._id !== id));
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
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleAddButtonClick = () => {
    navigate('/AddGazetteForm'); // Navigate to the form for adding
  };

  // PDF generation function
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Govt Gazette Details', 20, 20);

    // Table headers (removed the final no and date columns)
    doc.setFontSize(12);
    doc.text('Sr.No', 20, 30);
    doc.text('Title', 40, 30);
    doc.text('Draft Govt Gazette No', 80, 30);
    doc.text('Draft Govt Gazette Date', 120, 30);
    doc.text('Date of Publication', 160, 30);
    doc.text('Concern Section', 200, 30);
    doc.text('pdfFile', 220, 30);

    // Table rows (removed finalGovNo and finalGovDate)
    filteredData.forEach((item, index) => {
      const yPosition = 40 + index * 10;
      doc.text((index + 1).toString(), 20, yPosition);
      doc.text(item.title, 40, yPosition);
      doc.text(item.draftGovNo, 80, yPosition);
      doc.text(item.draftGovDate, 120, yPosition);
      doc.text(item.dateOfPublication, 160, yPosition);
      doc.text(item.concernSection, 200, yPosition);
      doc.text(item.pdfFile, 220, yPosition);
    });

    doc.save('GovtGazetteDetails.pdf');
  };

  return (
    <div className="table">
      <h1>Govt. Gazette Details</h1>
      <button className="add-button" onClick={handleAddButtonClick}>Add</button>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
      />
      <button onClick={generatePDF}>Download PDF</button>
      <table border="1px solid blue">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Title</th>
            <th>Draft Govt Gazette No</th>
            <th>Draft Govt Gazette Date</th>
            <th>Date of Publication</th>
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
                <td>{item.draftGovNo}</td>
                <td>{item.draftGovDate}</td>
                <td>{item.dateOfPublication}</td>
                <td>{item.concernSection}</td>
                <td>
                  <a href={`http://localhost:5001/${item.pdfFile}`} target="_blank" rel="noopener noreferrer">
                    View PDF
                  </a>
                </td>
                <td>
                  <button className="delete-button" onClick={() => deleteRecord(item._id)}>
                    Delete
                  </button>
                  <Link to={`/govt-gazette/${item._id}`}>Update</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GovtGazette;









