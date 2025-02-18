

// import React, { useState } from "react";
// import axios from "axios";
// import jsPDF from "jspdf"; // Import jsPDF
// import { Navigate } from "react-router-dom";

// const AddDirection = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     draftDirectionNo: "",
//     draftDirectionDate: "",
//     dateOfRenewal: "",
//     concernSection: "",
//     pdfFile: "",
//   });
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
// console.log("........................................");
//     const formattedDateOfRenewal = new Date(formData.dateOfRenewal).toISOString().split("T")[0];

//     // Check if date is valid
//     if (isNaN(new Date(formattedDateOfRenewal).getTime())) {
//       alert("Invalid date format for dateOfRenewal");
//       return;
//     }

//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append("title", formData.title);
//     formDataToSubmit.append("draftDirectionNo", formData.draftDirectionNo);
//     formDataToSubmit.append("draftDirectionDate", formData.draftDirectionDate);
//     formDataToSubmit.append("dateOfRenewal", formattedDateOfRenewal);
//     formDataToSubmit.append("concernSection", formData.concernSection);
//     formDataToSubmit.append("pdfFile", selectedFile);

//     try {
//       const response = await axios.post("http://localhost:5001/api/direction", formDataToSubmit, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Response:", response); // Log the response

//       alert("Direction Added Successfully!");
//       Navigate("/govtGazette");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to add direction.");
//     }
//   };


//   const generatePDF = () => {
//     const doc = new jsPDF(); // Initialize jsPDF
//     doc.setFontSize(18);
//     doc.text("Direction Data", 20, 20);

//     doc.setFontSize(12);
//     doc.text("Sr.No", 20, 30);
//     doc.text("Title", 40, 30);
//     doc.text("Direction No", 80, 30);
//     doc.text("Draft Direction Date", 120, 30);
//     doc.text("Date of Renewal", 160, 30);
//     doc.text("Concern Section", 200, 30);
//     doc.text("PDF File", 240, 30);

//     // This should be dynamic data
//     const directionInfo = [
//       { 
//         title: "Direction 1", 
//         draftDirectionNo: "123", 
//         draftDirectionDate: "2022-01-01", 
//         dateOfRenewal: "2023-01-01", 
//         concernSection: "Section A", 
//         pdfFile: "file1.pdf" 
//       },
//       // Add more mock data if needed
//     ];

//     directionInfo.forEach((info, index) => {
//       const yPosition = 40 + index * 10; // Define yPosition inside forEach

//       doc.text((index + 1).toString(), 20, yPosition);
//       doc.text(info.title || "", 40, yPosition);
//       doc.text(info.draftDirectionNo || "", 80, yPosition);
//       doc.text(info.draftDirectionDate || "", 120, yPosition);
//       doc.text(info.dateOfRenewal || "", 160, yPosition);
//       doc.text(info.concernSection || "", 200, yPosition);
//       doc.text(info.pdfFile || "", 240, yPosition);
//     });

//     doc.save("DirectionData.pdf");
//   };

//   return (
//     <div className="form-container" encType="multipart/form-data">
//       <h2>Add New Direction</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Title:
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Draft Direction No:
//           <input
//             type="text"
//             name="draftDirectionNo"
//             value={formData.draftDirectionNo}
//             onChange={handleChange}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Draft Direction Date:
//           <input
//             type="date"
//             name="draftDirectionDate"
//             value={formData.draftDirectionDate}
//             onChange={handleChange}
//             required
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
//             required
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
//             required
//           />
//         </label>
//         <br />

//         <label>
//           PDF File:
//           <input
//             type="file"
//             onChange={handleFileChange}
//           />
//         </label>
//         <br />

//         <button type="submit">Submit</button>
//       </form>
//       <button onClick={generatePDF}>Generate PDF</button>
//     </div>
//   );
// };

// export default AddDirection;























import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf"; // Import jsPDF
import { Navigate } from "react-router-dom";

const AddDirection = () => {
  const [formData, setFormData] = useState({
    title: "",
    draftDirectionNo: "",
    draftDirectionDate: "",
    dateOfRenewal: "",
    concernSection: "",
    pdfFile: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("........................................");
    const formattedDateOfRenewal = new Date(formData.dateOfRenewal).toISOString().split("T")[0];

    // Check if date is valid
    if (isNaN(new Date(formattedDateOfRenewal).getTime())) {
      alert("Invalid date format for dateOfRenewal");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("draftDirectionNo", formData.draftDirectionNo);
    formDataToSubmit.append("draftDirectionDate", formData.draftDirectionDate);
    formDataToSubmit.append("dateOfRenewal", formattedDateOfRenewal);
    formDataToSubmit.append("concernSection", formData.concernSection);
    formDataToSubmit.append("pdfFile", selectedFile);

    try {
      const response = await axios.post("http://localhost:5001/api/direction", formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response:", response); // Log the response

      alert("Direction Added Successfully!");
      Navigate("/govtGazette");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add direction.");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF(); // Initialize jsPDF
    doc.setFontSize(18);
    doc.text("Direction Data", 20, 20);

    doc.setFontSize(12);
    doc.text("Sr.No", 20, 30);
    doc.text("Title", 40, 30);
    doc.text("Direction No", 80, 30);
    doc.text("Draft Direction Date", 120, 30);
    doc.text("Date of Renewal", 160, 30);
    doc.text("Concern Section", 200, 30);
    doc.text("PDF File", 240, 30);

    // This should be dynamic data
    const directionInfo = [
      { 
        title: "Direction 1", 
        draftDirectionNo: "123", 
        draftDirectionDate: "2022-01-01", 
        dateOfRenewal: "2023-01-01", 
        concernSection: "Section A", 
        pdfFile: "file1.pdf" 
      },
      // Add more mock data if needed
    ];

    directionInfo.forEach((info, index) => {
      const yPosition = 40 + index * 10; // Define yPosition inside forEach

      doc.text((index + 1).toString(), 20, yPosition);
      doc.text(info.title || "", 40, yPosition);
      doc.text(info.draftDirectionNo || "", 80, yPosition);
      doc.text(info.draftDirectionDate || "", 120, yPosition);
      doc.text(info.dateOfRenewal || "", 160, yPosition);
      doc.text(info.concernSection || "", 200, yPosition);
      doc.text(info.pdfFile || "", 240, yPosition);
    });

    doc.save("DirectionData.pdf");
  };

  return (
    <div className="form-container" encType="multipart/form-data">
      <h2>Add New Direction</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
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
            required
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
            required
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
            required
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
            required
          />
        </label>
        <br />

        <label>
          PDF File:
          <input
            type="file"
            onChange={handleFileChange}
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default AddDirection;
