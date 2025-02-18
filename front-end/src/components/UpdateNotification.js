

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const UpdateNotification = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [notificationData, setNotificationData] = useState({
//     title: "",
//     draftNotificationNo: "",
//     draftNotificationDate: "",
//     finalNotificationNo: "",
//     finalNotificationDate: "",
//     dateOfPublication: "",
//     concernSection: "",
//     pdfFile: null,
//   });

//   useEffect(() => {
//     const fetchNotification = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/api/NotificationForms/${id}`);
//         setNotificationData(response.data);
//       } catch (error) {
//         console.error("Error fetching notification data:", error);
//       }
//     };

//     fetchNotification();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNotificationData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type !== "application/pdf") {
//       alert("Only PDF files are allowed");
//       return;
//     }
//     setNotificationData((prevData) => ({
//       ...prevData,
//       pdfFile: file,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData();
//     formData.append("title", notificationData.title);
//     formData.append("draftNotificationNo", notificationData.draftNotificationNo);
//     formData.append("draftNotificationDate", notificationData.draftNotificationDate);
//     formData.append("finalNotificationNo", notificationData.finalNotificationNo);
//     formData.append("finalNotificationDate", notificationData.finalNotificationDate);
//     formData.append("dateOfPublication", notificationData.dateOfPublication);
//     formData.append("concernSection", notificationData.concernSection);
    
//     if (notificationData.pdfFile) {
//       formData.append("pdfFile", notificationData.pdfFile);
//     }

//     try {
      
//       await axios.put(`http://localhost:5001/Notification/updateNotification/${id}`, formData ,{

//         headers: {

//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Notification updated successfully");
//       navigate("/notification");
//     } catch (error) {
//       console.error("Error updating notification:", error);
//       alert("Failed to update notification");
//     }
//   };

//   return (
//     <div className="form-container">
//       <h1>Update Notification</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={notificationData.title}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Draft Notification No and Date:</label>
//           <input
//             type="text"
//             name="draftNotificationNo"
//             value={notificationData.draftNotificationNo}
//             onChange={handleChange}
//             placeholder="Enter Draft Notification Number"
//             style={{ marginRight: "10px" }}
//           />
//           <input
//             type="date"
//             name="draftNotificationDate"
//             value={notificationData.draftNotificationDate}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Final Notification No and Date:</label>
//           <input
//             type="text"
//             name="finalNotificationNo"
//             value={notificationData.finalNotificationNo}
//             onChange={handleChange}
//             placeholder="Enter Final Notification Number"
//             style={{ marginRight: "10px" }}
//           />
//           <input
//             type="date"
//             name="finalNotificationDate"
//             value={notificationData.finalNotificationDate}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Date of Publication:</label>
//           <input
//             type="date"
//             name="dateOfPublication"
//             value={notificationData.dateOfPublication}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Concern Section:</label>
//           <input
//             type="text"
//             name="concernSection"
//             value={notificationData.concernSection}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Upload PDF:</label>
//           <input
//             type="file"
//             name="pdfFile"
//             onChange={handleFileChange}
//           />
//         </div>
//         <button type="submit">Update</button>
//         <button type="button" onClick={() => navigate("/notifications")}>
//           Cancel
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateNotification;




























import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateNotification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notificationData, setNotificationData] = useState({
    title: "",
    draftNotificationNo: "",
    draftNotificationDate: "",
    dateOfPublication: "",
    concernSection: "",
    pdfFile: null,
  });

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/NotificationForms/${id}`);
        setNotificationData(response.data);
      } catch (error) {
        console.error("Error fetching notification data:", error);
      }
    };

    fetchNotification();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotificationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }
    setNotificationData((prevData) => ({
      ...prevData,
      pdfFile: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", notificationData.title);
    formData.append("draftNotificationNo", notificationData.draftNotificationNo);
    formData.append("draftNotificationDate", notificationData.draftNotificationDate);
    formData.append("dateOfPublication", notificationData.dateOfPublication);
    formData.append("concernSection", notificationData.concernSection);
    
    if (notificationData.pdfFile) {
      formData.append("pdfFile", notificationData.pdfFile);
    }

    try {
      await axios.put(`http://localhost:5001/Notification/updateNotification/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Notification updated successfully");
      navigate("/notification");
    } catch (error) {
      console.error("Error updating notification:", error);
      alert("Failed to update notification");
    }
  };

  return (
    <div className="form-container">
      <h1>Update Notification</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="title" value={notificationData.title} onChange={handleChange} />
        </div>
        <div>
          <label> Notification No and Date:</label>
          <input type="text" name="draftNotificationNo" value={notificationData.draftNotificationNo} onChange={handleChange} placeholder="Enter Draft Notification Number" style={{ marginRight: "10px" }} />
          <input type="date" name="draftNotificationDate" value={notificationData.draftNotificationDate} onChange={handleChange} />
        </div>
        <div>
          <label>Date of Publication:</label>
          <input type="date" name="dateOfPublication" value={notificationData.dateOfPublication} onChange={handleChange} />
        </div>
        <div>
          <label>Concern Section:</label>
          <input type="text" name="concernSection" value={notificationData.concernSection} onChange={handleChange} />
        </div>
        <div>
          <label>Upload PDF:</label>
          <input type="file" name="pdfFile" onChange={handleFileChange} />
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate("/notifications")}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateNotification;
