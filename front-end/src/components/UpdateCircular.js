// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UpdateCircular = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     draftCircularNo: "",
//     draftCircularDate: "",
//     finalCircularNo: "",
//     finalCircularDate: "",
//     publicationDate: "",
//     ConcernSection: "",
//     pdf: "",
//   });

//   useEffect(() => {
//     const fetchCircularDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/circular/${id}`);
//         setFormData(response.data);
//       } catch (error) {
//         console.error("Error fetching circular details:", error);
//       }
//     };

//     fetchCircularDetails();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       pdf: selectedFile,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
  
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("draftCircularNo", formData.draftCircularNo);
//     formDataToSend.append("draftCircularDate", formData.draftCircularDate);
//     formDataToSend.append("finalCircularNo", formData.finalCircularNo);
//     formDataToSend.append("finalCircularDate", formData.finalCircularDate);
//     formDataToSend.append("publicationDate", formData.publicationDate);
//     formDataToSend.append("ConcernSection", formData.ConcernSection);
  
//     if (formData.pdf instanceof File) {
//       formDataToSend.append("pdfFile", formData.pdf);
//     }
  
//     // ✅ Log the form data before sending
//     for (let [key, value] of formDataToSend.entries()) {
//       console.log(`${key}:`, value);
//     }
  
//     try {
//       // Use PATCH instead of PUT
//       const response = await axios.patch(
//         `http://localhost:5001/api/updateCircular/${id}`,
//         formDataToSend,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
  
//       alert(response.data.message);
//       navigate("/circular");
//     } catch (error) {
//       console.error("Error updating circular:", error.response ? error.response.data : error.message);
//       alert("Failed to update circular. Please try again.");
//     }
//   };
  
  

//   return (
//     <div className="form-container">
//       <h1>Update Circular</h1>
//       <form onSubmit={handleSubmit}>
//       <div>
//           <label>srNo:</label>
//           <input type="text" name="title" value={formData.title} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Title:</label>
//           <input type="text" name="title" value={formData.title} onChange={handleChange} required />
//         </div>

//         <div>
//           <label>Draft Circular No and Date:</label>
//           <input type="text" name="draftCircularNo" value={formData.draftCircularNo} onChange={handleChange} />
//           <input type="date" name="draftCircularDate" value={formData.draftCircularDate} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Final Circular No and Date:</label>
//           <input type="text" name="finalCircularNo" value={formData.finalCircularNo} onChange={handleChange} />
//           <input type="date" name="finalCircularDate" value={formData.finalCircularDate} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Date of Publication:</label>
//           <input type="date" name="publicationDate" value={formData.publicationDate} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Concern Section:</label>
//           <input type="text" name="ConcernSection" value={formData.ConcernSection} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Upload PDF:</label>
//           <input type="file" name="pdf" accept="application/pdf" onChange={handleFileChange} />
//         </div>

//         <button type="submit">Update</button>
//         <button type="button" onClick={() => navigate("/circular")}>Cancel</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateCircular;
































import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateCircular = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    draftCircularNo: "",
    draftCircularDate: "",
    publicationDate: "",
    ConcernSection: "",
    pdf: "",
  });

  useEffect(() => {
    const fetchCircularDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/circular/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching circular details:", error);
      }
    };

    fetchCircularDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      pdf: selectedFile,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
  
    formDataToSend.append("title", formData.title);
    formDataToSend.append("draftCircularNo", formData.draftCircularNo);
    formDataToSend.append("draftCircularDate", formData.draftCircularDate);
    formDataToSend.append("publicationDate", formData.publicationDate);
    formDataToSend.append("ConcernSection", formData.ConcernSection);
  
    if (formData.pdf instanceof File) {
      formDataToSend.append("pdfFile", formData.pdf);
    }
  
    try {
      const response = await axios.patch(
        `http://localhost:5001/api/updateCircular/${id}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      alert(response.data.message);
      navigate("/circular");
    } catch (error) {
      console.error("Error updating circular:", error.response ? error.response.data : error.message);
      alert("Failed to update circular. Please try again.");
    }
  };
  
  return (
    <div className="form-container">
      <h1>Update Circular</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <label>Draft Circular No and Date:</label>
          <input type="text" name="draftCircularNo" value={formData.draftCircularNo} onChange={handleChange} />
          <input type="date" name="draftCircularDate" value={formData.draftCircularDate} onChange={handleChange} />
        </div>

        <div>
          <label>Date of Publication:</label>
          <input type="date" name="publicationDate" value={formData.publicationDate} onChange={handleChange} />
        </div>

        <div>
          <label>Concern Section:</label>
          <input type="text" name="ConcernSection" value={formData.ConcernSection} onChange={handleChange} />
        </div>

        <div>
          <label>Upload PDF:</label>
          <input type="file" name="pdf" accept="application/pdf" onChange={handleFileChange} />
        </div>

        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate("/circular")}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateCircular;
