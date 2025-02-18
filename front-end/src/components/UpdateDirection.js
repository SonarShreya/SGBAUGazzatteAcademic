// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UpdateDirection = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     draftDirectionNo: "",
//     draftDirectionDate: "",
//     dateOfRenewal: "",
//     concernSection: "",
//     pdfFile: "", // This can store a file or a URL from the backend
//   });

//   // Fetch the current direction details so the form is pre-filled
//   useEffect(() => {
//     const fetchDirectionDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/directions/${id}`);
//         if (response.status === 200) {
//           setFormData(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching direction details:", error);
//       }
//     };

//     fetchDirectionDetails();
//   }, [id]);

//   // Handle text/number/date input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle file selection
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       pdfFile: file, // Save the file object (to be uploaded)
//     }));
//   };

//   // Submit updated data to the backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("draftDirectionNo", formData.draftDirectionNo);
//       formDataToSend.append("draftDirectionDate", formData.draftDirectionDate);
//       formDataToSend.append("dateOfRenewal", formData.dateOfRenewal);
//       formDataToSend.append("concernSection", formData.concernSection);
//       if (formData.pdfFile) {
//         formDataToSend.append("pdfFile", formData.pdfFile);
//       }
  
//       const response = await axios.put(
//         `http://localhost:5001/api/updateDirection/${id}`,
//         formDataToSend,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
  
//       console.log("Update response:", response.data); // Debug log
//       if (response.status === 200) {
//         alert("Direction updated successfully.");
//         navigate("/direction");
//       }
//     } catch (error) {
//       console.error("Error updating direction:", error);
//       alert("Failed to update direction. Please try again.");
//     }
//   };

//   return (
//     <div className="form-container">
//       <h1>Update Direction</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//           />
//         </label>
//         <br />

//         <label>
//            Direction No:
//           <input
//             type="text"
//             name="draftDirectionNo"
//             value={formData.draftDirectionNo}
//             onChange={handleChange}
//           />
//         </label>
//         <br />

//         <label>
//            Direction Date:
//           <input
//             type="date"
//             name="draftDirectionDate"
//             value={formData.draftDirectionDate}
//             onChange={handleChange}
//           />
//         </label>
//         <br />

//         <label>
//           Date of Renewal:
//           <input
//             type="date"
//             name="dateOfRenewal"
//             value={formData.dateOfRenewal}
//             onChange={handleChange}
//           />
//         </label>
//         <br />

//         <label>
//           Concern Section:
//           <input
//             type="text"
//             name="concernSection"
//             value={formData.concernSection}
//             onChange={handleChange}
//           />
//         </label>
//         <br />

//         <label>
//           PDF File:
//           <input type="file" onChange={handleFileChange} />
//         </label>
//         <br />

//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default UpdateDirection;

























import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateDirection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    draftDirectionNo: "",
    draftDirectionDate: "",
    dateOfRenewal: "",
    concernSection: "",
    pdfFile: "", // This can store a file or a URL from the backend
  });

  const [initialData, setInitialData] = useState(null);

  // Fetch the current direction details so the form is pre-filled
  useEffect(() => {
    const fetchDirectionDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/directions/${id}`);
        if (response.status === 200) {
          setFormData(response.data);
          setInitialData(response.data);  // Save initial data for comparison
        }
      } catch (error) {
        console.error("Error fetching direction details:", error);
      }
    };

    fetchDirectionDetails();
  }, [id]);

  // Handle text/number/date input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      pdfFile: file, // Save the file object (to be uploaded)
    }));
  };

  // Submit updated data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any changes before updating
    const isDataChanged = JSON.stringify(formData) !== JSON.stringify(initialData);

    if (!isDataChanged) {
      alert("No changes detected. No update is needed.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("draftDirectionNo", formData.draftDirectionNo);
      formDataToSend.append("draftDirectionDate", formData.draftDirectionDate);
      formDataToSend.append("dateOfRenewal", formData.dateOfRenewal);
      formDataToSend.append("concernSection", formData.concernSection);
      if (formData.pdfFile) {
        formDataToSend.append("pdfFile", formData.pdfFile);
      }

      const response = await axios.put(
        `http://localhost:5001/api/updateDirection/${id}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Update response:", response.data); // Debug log
      if (response.status === 200) {
        alert("Direction updated successfully.");
        navigate("/direction");
      }
    } catch (error) {
      console.error("Error updating direction:", error);
      alert("Failed to update direction. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h1>Update Direction</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Direction No:
          <input
            type="text"
            name="draftDirectionNo"
            value={formData.draftDirectionNo}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Direction Date:
          <input
            type="date"
            name="draftDirectionDate"
            value={formData.draftDirectionDate}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Date of Renewal:
          <input
            type="date"
            name="dateOfRenewal"
            value={formData.dateOfRenewal}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Concern Section:
          <input
            type="text"
            name="concernSection"
            value={formData.concernSection}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          PDF File:
          <input type="file" onChange={handleFileChange} />
        </label>
        <br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateDirection;
