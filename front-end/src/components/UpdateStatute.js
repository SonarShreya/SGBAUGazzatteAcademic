import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateStatute = () => {
  const [statuteData, setStatuteData] = useState({
  
    title: '',
    draftStatute: '',
    finalStatute: '',
    renewalStatute: '',
    concernStatute: '',
    pdfFile: '',
  });
  
  const { id } = useParams(); // Retrieve the id from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the statute data by ID
    const fetchStatuteData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/api/updateStatute/${id}`);
        setStatuteData(response.data);
      } catch (error) {
        console.error("Error fetching statute data:", error);
      }
    };
    
    fetchStatuteData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatuteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    try {
      // Sending the PUT request to the backend with the statute data and the ID
      const response = await axios.put(
        `http://localhost:5001/api/updateStatute/${id}`,  // Make sure the ID is included in the URL
        statuteData // Sending the updated statute data in the request body
      );
      
      // Show success message and navigate to the main page
      alert(response.data.message);
      navigate('/');  // Redirect to the main statute page (or any other page)
    } catch (error) {
      console.error("Error updating statute:", error);
      alert("Failed to update the statute. Please try again.");
    }
  };
  

  return (
    <div className="form-container">
      <h2>Update Statute</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Draft Statute:</label>
          <input
            type="text"
            name="draftStatute"
            value={statuteData.draftStatute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Final Statute:</label>
          <input
            type="text"
            name="finalStatute"
            value={statuteData.finalStatute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Renewal Statute:</label>
          <input
            type="text"
            name="renewalStatute"
            value={statuteData.renewalStatute}
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
          <label>PDF File:</label>
          <input
            type="text"
            name="pdfFile"
            value={statuteData.pdfFile}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Statute</button>
      </form>
    </div>
  );
};

export default UpdateStatute;
