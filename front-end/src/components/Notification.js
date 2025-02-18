

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { jsPDF } from "jspdf"; // Import jsPDF
// import { Link } from "react-router-dom";

// const Notification = () => {
//   const [notificationData, setNotificationData] = useState({
//     srNo: "",
//     title: "",
//     draftNotificationNo: "",
//     draftNotificationDate: "",
//     finalNotificationNo: "",
//     finalNotificationDate: "",
//     dateOfPublication: "",
//     concernSection: "",
//     pdfFile: "",
//   });

//   const [showForm, setShowForm] = useState(false);
//   const [notificationInfo, setNotificationInfo] = useState([]);
//   const navigate = useNavigate();

//   const getNotificationInfo = async () => {
//     try {
//       const response = await axios.get("http://localhost:5001/Notification/NotificationForms");
//       setNotificationInfo(response.data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   useEffect(() => {
//     getNotificationInfo();
//   }, []);

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

//     // Check if required fields are filled
//     if (!notificationData.title || !notificationData.draftNotificationNo || !notificationData.draftNotificationDate ||
//         !notificationData.finalNotificationNo || !notificationData.finalNotificationDate || !notificationData.dateOfPublication ||
//         !notificationData.concernSection || !notificationData.pdfFile) {
//       alert("Please fill in all the fields");
//       return;
//     }

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
//       await axios.post("http://localhost:5001/Notification/createNotification", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Notification added successfully");

//       // Clear form data
//       setNotificationData({
//         srNo: "",
//         title: "",
//         draftNotificationNo: "",
//         draftNotificationDate: "",
//         finalNotificationNo: "",
//         finalNotificationDate: "",
//         dateOfPublication: "",
//         concernSection: "",
//         pdfFile: "",
//       });

//       // Re-fetch notification data
//       getNotificationInfo();
//       setShowForm(false); // Hide form after submission
//     } catch (error) {
//       alert("Failed to add notification");
//       console.error("Error adding notification:", error);
//     }
//   };

//   // Search function using axios
//   const searchHandle = async (event) => {
//     const key = event.target.value;
  
//     if (key) {
//       try {
//         // Ensure URL matches your backend
//         const response = await axios.get(`http://localhost:5001/Notification/api/searchNotification/${key}`);
//         setNotificationInfo(response.data.length > 0 ? response.data : []);  // If data is found, update; otherwise, set empty array
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       }
//     } else {
//       getNotificationInfo(); // If the search box is empty, reload all notifications
//     }
//   };
  

//   const handleAddButtonClick = () => {
//     setShowForm(true);
//   };

//   const deleteNotificationInfo = async (id) => {
//     if (window.confirm("Are you sure you want to delete this record?")) {
//       try {
//         const response = await axios.delete(`http://localhost:5001/Notification/deleteNotification/${id}`);
//         alert(response.data.message);
//         getNotificationInfo(); // Refresh list after deletion
//       } catch (error) {
//         alert("Failed to delete notification");
//         console.error("Error deleting notification:", error);
//       }
//     }
//   };

//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text("Notification List", 14, 20);
//     let y = 30;

//     // Add table headers
//     doc.text("Sr.No", 14, y);
//     doc.text("Title", 40, y);
//     doc.text("Draft Notification No", 80, y);
//     doc.text("Draft Notification Date", 120, y);
//     doc.text("Final Notification No", 160, y);
//     doc.text("Final Notification Date", 200, y);
//     doc.text("Date of Publication", 240, y);
//     doc.text("Concern Section", 280, y);
//     doc.text("PDF File", 320, y);

//     // Add table rows
//     y += 10;
//     notificationInfo.forEach((info, index) => {
//       doc.text((index + 1).toString(), 14, y);
//       doc.text(info.title, 40, y);
//       doc.text(info.draftNotificationNo, 80, y);
//       doc.text(info.draftNotificationDate, 120, y);
//       doc.text(info.finalNotificationNo, 160, y);
//       doc.text(info.finalNotificationDate, 200, y);
//       doc.text(info.dateOfPublication, 240, y);
//       doc.text(info.concernSection, 280, y);
//       doc.text(info.pdfFile, 320, y);
//       y += 10;
//     });

//     doc.save("notification_list.pdf");
//   };

//   return (
//     <div className="table">
//       <h1>Welcome to Notification Page</h1>
//       <input
//         type="text"
//         className="search-box"
//         placeholder="Search Notifications"
//         onChange={searchHandle}
//       />
//       <button className="add-button" onClick={handleAddButtonClick}>
//         Add
//       </button>
//       <button className="pdf-button" onClick={generatePDF}>
//         Download PDF
//       </button>

//       {!showForm ? (
//         <div>
//           <table border="1px solid blue">
//             <thead>
//               <tr>
//                 <th>Sr.No</th>
//                 <th>Title</th>
//                 <th>Draft Notification No</th>
//                 <th>Draft Notification Date</th>
//                 <th>Final Notification No</th>
//                 <th>Final Notification Date</th>
//                 <th>Date of Publication</th>
//                 <th>Concern Section</th>
//                 <th>PDF File</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {notificationInfo.map((info, index) => (
//                 <tr key={info._id}>
//                   <td>{index + 1}</td>
//                   <td>{info.title}</td>
//                   <td>{info.draftNotificationNo}</td>
//                   <td>{info.draftNotificationDate}</td>
//                   <td>{info.finalNotificationNo}</td>
//                   <td>{info.finalNotificationDate}</td>
//                   <td>{info.dateOfPublication}</td>
//                   <td>{info.concernSection}</td>
//                   <td>
//                     <a href={`http://localhost:5001/${info.pdfFile}`} target="_blank" rel="noopener noreferrer">
//                       View PDF
//                     </a>
//                   </td>
//                   <td>
//                     <button
//                       className="delete-button"
//                       onClick={() => deleteNotificationInfo(info._id)}
//                     >
//                       Delete
//                     </button>
//                     <Link to={`/notification/update/${info._id}`}>Update</Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <form onSubmit={handleSubmit} className="form-container">
//           <div>
//             <label>Title:</label>
//             <input
//               type="text"
//               name="title"
//               value={notificationData.title}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Draft Notification No and Date:</label>
//             <input
//               type="text"
//               name="draftNotificationNo"
//               value={notificationData.draftNotificationNo}
//               onChange={handleChange}
//               placeholder="Enter Draft Notification Number"
//               style={{ marginRight: "10px" }}
//             />
//             <input
//               type="date"
//               name="draftNotificationDate"
//               value={notificationData.draftNotificationDate}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Final Notification No and Date:</label>
//             <input
//               type="text"
//               name="finalNotificationNo"
//               value={notificationData.finalNotificationNo}
//               onChange={handleChange}
//               placeholder="Enter Final Notification Number"
//               style={{ marginRight: "10px" }}
//             />
//             <input
//               type="date"
//               name="finalNotificationDate"
//               value={notificationData.finalNotificationDate}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Date of Publication:</label>
//             <input
//               type="date"
//               name="dateOfPublication"
//               value={notificationData.dateOfPublication}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Concern Section:</label>
//             <input
//               type="text"
//               name="concernSection"
//               value={notificationData.concernSection}
//               onChange={handleChange}
//             />
//           </div>
//           <div>
//             <label>Upload PDF:</label>
//             <input
//               type="file"
//               name="pdfFile"
//               onChange={handleFileChange}
//               required
//             />
//           </div>
//           <button type="submit">Submit</button>
//           <button type="button" onClick={() => setShowForm(false)}>
//             Cancel
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Notification;













import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF
import { Link } from "react-router-dom";

const Notification = () => {
  const [notificationData, setNotificationData] = useState({
    srNo: "",
    title: "",
    draftNotificationNo: "",
    draftNotificationDate: "",
    dateOfPublication: "",
    concernSection: "",
    pdfFile: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [notificationInfo, setNotificationInfo] = useState([]);
  const navigate = useNavigate();

  const getNotificationInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5001/Notification/NotificationForms");
      setNotificationInfo(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    getNotificationInfo();
  }, []);

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

    // Check if required fields are filled
    if (!notificationData.title || !notificationData.draftNotificationNo || !notificationData.draftNotificationDate ||
        !notificationData.dateOfPublication || !notificationData.concernSection || !notificationData.pdfFile) {
      alert("Please fill in all the fields");
      return;
    }

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
      await axios.post("http://localhost:5001/Notification/createNotification", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Notification added successfully");

      // Clear form data
      setNotificationData({
        srNo: "",
        title: "",
        draftNotificationNo: "",
        draftNotificationDate: "",
        dateOfPublication: "",
        concernSection: "",
        pdfFile: "",
      });

      // Re-fetch notification data
      getNotificationInfo();
      setShowForm(false); // Hide form after submission
    } catch (error) {
      alert("Failed to add notification");
      console.error("Error adding notification:", error);
    }
  };

  // Search function using axios
  const searchHandle = async (event) => {
    const key = event.target.value;
  
    if (key) {
      try {
        // Ensure URL matches your backend
        const response = await axios.get(`http://localhost:5001/Notification/api/searchNotification/${key}`);
        setNotificationInfo(response.data.length > 0 ? response.data : []);  // If data is found, update; otherwise, set empty array
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      getNotificationInfo(); // If the search box is empty, reload all notifications
    }
  };
  

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const deleteNotificationInfo = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const response = await axios.delete(`http://localhost:5001/Notification/deleteNotification/${id}`);
        alert(response.data.message);
        getNotificationInfo(); // Refresh list after deletion
      } catch (error) {
        alert("Failed to delete notification");
        console.error("Error deleting notification:", error);
      }
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Notification List", 14, 20);
    let y = 30;

    // Add table headers
    doc.text("Sr.No", 14, y);
    doc.text("Title", 40, y);
    doc.text("Draft Notification No", 80, y);
    doc.text("Draft Notification Date", 120, y);
    doc.text("Date of Publication", 160, y);
    doc.text("Concern Section", 200, y);
    doc.text("PDF File", 240, y);

    // Add table rows
    y += 10;
    notificationInfo.forEach((info, index) => {
      doc.text((index + 1).toString(), 14, y);
      doc.text(info.title, 40, y);
      doc.text(info.draftNotificationNo, 80, y);
      doc.text(info.draftNotificationDate, 120, y);
      doc.text(info.dateOfPublication, 160, y);
      doc.text(info.concernSection, 200, y);
      doc.text(info.pdfFile, 240, y);
      y += 10;
    });

    doc.save("notification_list.pdf");
  };

  return (
    <div className="table">
      <h1>Welcome to Notification Page</h1>
      <input
        type="text"
        className="search-box"
        placeholder="Search Notifications"
        onChange={searchHandle}
      />
      <button className="add-button" onClick={handleAddButtonClick}>
        Add
      </button>
      <button className="pdf-button" onClick={generatePDF}>
        Download PDF
      </button>

      {!showForm ? (
        <div>
          <table border="1px solid blue">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Title</th>
                <th> Notification No</th>
                <th> Notification Date</th>
                <th>Date of Publication</th>
                <th>Concern Section</th>
                <th>PDF File</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notificationInfo.map((info, index) => (
                <tr key={info._id}>
                  <td>{index + 1}</td>
                  <td>{info.title}</td>
                  <td>{info.draftNotificationNo}</td>
                  <td>{info.draftNotificationDate}</td>
                  <td>{info.dateOfPublication}</td>
                  <td>{info.concernSection}</td>
                  <td>
                    <a href={`http://localhost:5001/${info.pdfFile}`} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
                  </td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => deleteNotificationInfo(info._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/notification/update/${info._id}`}>Update</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={notificationData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label> Notification No and Date:</label>
            <input
              type="text"
              name="draftNotificationNo"
              value={notificationData.draftNotificationNo}
              onChange={handleChange}
              placeholder="Enter Draft Notification Number"
              style={{ marginRight: "10px" }}
            />
            <input
              type="date"
              name="draftNotificationDate"
              value={notificationData.draftNotificationDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Date of Publication:</label>
            <input
              type="date"
              name="dateOfPublication"
              value={notificationData.dateOfPublication}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Concern Section:</label>
            <input
              type="text"
              name="concernSection"
              value={notificationData.concernSection}
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
          <button type="submit">Submit</button>
          <button type="button" onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default Notification;

