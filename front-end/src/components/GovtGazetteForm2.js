
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const GovtGazetteForm2 = () => {
  const [title, setTitle] = useState('');
  const [draftGovNo, setDraftGovNo] = useState('');
  const [draftGovDate, setDraftGovDate] = useState('');
  const [finalGovNo, setFinalGovNo] = useState('');
  const [finalGovDate, setFinalGovDate] = useState('');
  const [dateOfPublication, setDateOfPublication] = useState('');
  const [concernSection, setConcernSection] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [records, setRecords] = useState([]);
  const { id } = useParams(); // Get ID from URL for editing
  const navigate = useNavigate();

  // Fetch existing records
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/gazette2');
      setRecords(response.data); // Update state with fetched records
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts

    // If editing an existing record, fetch and populate form fields
    if (id) {
      axios.get(`http://localhost:5001/gazette2/${id}`)
        .then(response => {
          const data = response.data;
          setTitle(data.title);
          setDraftGovNo(data.draftGovNo);
          setDraftGovDate(data.draftGovDate);
          setFinalGovNo(data.finalGovNo);
          setFinalGovDate(data.finalGovDate);
          setDateOfPublication(data.dateOfPublication);
          setConcernSection(data.concernSection);
          setPdfFile(null); // Reset file input
        })
        .catch(error => console.error('Error fetching record:', error));
    }
  }, [id]);

  // Handle form submission for both Add & Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('draftGovNo', draftGovNo);
    formData.append('draftGovDate', draftGovDate);
    formData.append('finalGovNo', finalGovNo);
    formData.append('finalGovDate', finalGovDate);
    formData.append('dateOfPublication', dateOfPublication);
    formData.append('concernSection', concernSection);

    if (pdfFile) {
      formData.append('pdfFile', pdfFile);
    }

    try {
      if (id) {
        // UPDATE existing record
        await axios.put(`http://localhost:5001/gazette2/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Record updated successfully');
      } else {
        // ADD new record
        await axios.post('http://localhost:5001/gazette2', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Record added successfully');
      }

      fetchData(); // Refresh data to show updates
      navigate('/govtGazetteII'); // Redirect after submission
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h1>{id ? 'Edit' : 'Add New'} Govt Gazette II Record</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Draft Govt Gazette No and Date:</label>
          <input type="text" value={draftGovNo} onChange={(e) => setDraftGovNo(e.target.value)} placeholder="Enter Draft Govt Gazette Number" style={{ marginRight: "10px" }} />
          <input type="date" value={draftGovDate} onChange={(e) => setDraftGovDate(e.target.value)} />
        </div>
        <div>
          <label>Final Govt Gazette No and Date:</label>
          <input type="text" value={finalGovNo} onChange={(e) => setFinalGovNo(e.target.value)} placeholder="Enter Final Govt Gazette Number" style={{ marginRight: "10px" }} />
          <input type="date" value={finalGovDate} onChange={(e) => setFinalGovDate(e.target.value)} />
        </div>
        <div>
          <label>Date of Publication</label>
          <input type="date" value={dateOfPublication} onChange={(e) => setDateOfPublication(e.target.value)} required />
        </div>
        <div>
          <label>Concern Section</label>
          <input type="text" value={concernSection} onChange={(e) => setConcernSection(e.target.value)} required />
        </div>
        <div>
          <label>Upload PDF File (optional)</label>
          <input type="file" onChange={(e) => setPdfFile(e.target.files[0])} />
        </div>
        <div>
          <button type="submit">{id ? 'Update' : 'Add'} Record</button>
        </div>
      </form>

      <h2>Existing Records</h2>
      <ul>
        {records.map((record) => (
          <li key={record._id}>
            <strong>{record.title}</strong> - {record.draftGovNo} ({record.draftGovDate})
            <br />
            <button onClick={() => navigate(`/govtGazetteII/edit/${record._id}`)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GovtGazetteForm2;
