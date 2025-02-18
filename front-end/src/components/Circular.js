
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";


// const Circular = () => {
//   const [circularData, setCircularData] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [searchQuery, setSearchQuery] = useState(""); // ✅ Added missing state
//   const navigate = useNavigate();

//   // ✅ Use `formData` correctly instead of `circularData`
//   const [formData, setFormData] = useState({
//     srNo: "",
//     title: "",
//     draftCircularNo: "",
//     draftCircularDate: "",
//     finalCircularNo: "",
//     finalCircularDate: "",
//     publicationDate: "",
//     ConcernSection: "",
//     pdf: "",
//   });

//   const fetchCirculars = async () => {
    
//     try {
      
//       const response = await axios.get("http://localhost:5001/api/api/circulars"); // ✅ Correct URL
//       console.log(response.data, "...............................");
//       setCircularData(response.data);
//     } catch (error) {
//       console.error("Error fetching circulars:", error);
//     }
//   };
  
  

//   useEffect(() => {
//     fetchCirculars();
//   }, []);
//   const deleteCircular = async (id) => {
//     if (window.confirm("Are you sure you want to delete this circular?")) {
//       try {
//         const response = await axios.delete(
//           `http://localhost:5001/api/deleteCircular/${id}`
//         );
//         alert(response.data.message);
//         fetchCirculars(); // Refresh list after deletion
//       } catch (error) {
//         console.error("Error deleting circular:", error);
//       }
//     }
//   };
  

//   // ✅ Corrected `handleChange` function to update formData
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value, // ✅ Ensures the correct field is updated
//     }));
//   };

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0]; // ✅ Fix undefined file issue
//     setFormData((prevData) => ({
//       ...prevData,
//       pdf: selectedFile, // ✅ Ensure file is stored
//     }));
//   };
  

  

//   // PDF generation function using jsPDF and autoTable
//   const generatePDF = () => {
//     const doc = new jsPDF();
//     doc.text("Circular Records", 20, 20);

//     const tableData = circularData.map((item) => [
//       item.srNo,
//       item.title,
//       item.draftCircularNo,
//       item.draftCircularDate,
//       item.finalCircularNo,
//       item.finalCircularDate,
//       item.publicationDate,
//       item.ConcernSection,
//       item.pdfFile ? "View PDF" : "No PDF",
//     ]);

//     doc.autoTable({
//       head: [
//         [
//           "Sr.No",
//           "Title",
//           "Draft Circular No",
//           "Draft Circular Date",
//           "Final Circular No",
//           "Final Circular Date",
//           "Date of Publication",
//           "Concern Section",
//           "PDF File",
//         ],
//       ],
//       body: tableData,
//     });

//     doc.save("circular_records.pdf");
//   };


//   const handleSearch = async () => {
//     if (searchQuery.trim()) {
//       try {
//         const response = await axios.get(
//           `http://localhost:5001/api/circulars/searchCirculars/${searchQuery}`
//         );
//         console.log(response.data); // Log the response
//         setCircularData(response.data);
//       } catch (error) {
//         console.error("Error during search:", error);
//       }
//     } else {
//       fetchCirculars();
//     }
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
  
//     formDataToSend.append("srNo", formData.srNo);
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("draftCircularNo", formData.draftCircularNo);
//     formDataToSend.append("draftCircularDate", formData.draftCircularDate);
//     formDataToSend.append("finalCircularNo", formData.finalCircularNo);
//     formDataToSend.append("finalCircularDate", formData.finalCircularDate);
//     formDataToSend.append("publicationDate", formData.publicationDate);
//     formDataToSend.append("ConcernSection", formData.ConcernSection);
//     formDataToSend.append("pdfFile", formData.pdf); // Ensure this matches backend
  
//     try {
//       const response = await axios.post("http://localhost:5001/api/insertCircular", formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
  
//       alert(response.data.message);
  
//       // Update circular data after successful addition
//       setCircularData(response.data.circulars); // Set the updated circular data from response
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error submitting form:", error.response ? error.response.data : error.message);
//       alert("Failed to add circular. " + (error.response ? error.response.data.error : error.message));
//     }
//   };
  

  

//   return (
//     <div className="table">
//       <h1>Welcome to Circular Page</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Search Circulars"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <button onClick={handleSearch}>Search</button>
//         <button onClick={() => setShowForm(true)}>Add Circular</button>
//         <button onClick={generatePDF}>Download PDF</button>
//       </div>



//       {!showForm ? (
//         <table border="1px solid blue">
//           <thead>
//             <tr>
//               <th>Sr.No</th>
//               <th>Title</th>
//               <th>Draft Circular No</th>
//               <th>Draft Circular Date</th>
//               <th>Final Circular No</th>
//               <th>Final Circular Date</th>
//               <th>Date of Publication</th>
//               <th>Concern Section</th>
//               <th>PDF File</th>
//               <th>Actions</th>
//             </tr>
//           </thead>


//           <tbody>
//   {Array.isArray(circularData) && circularData.length > 0 ? (
//     circularData.map((item, index) => (
//       <tr key={item._id}>
//         <td>{index + 1}</td>
//         <td>{item.title}</td>
//         <td>{item.draftCircularNo}</td>
//         <td>{item.draftCircularDate}</td>
//         <td>{item.finalCircularNo}</td>
//         <td>{item.finalCircularDate}</td>
//         <td>{item.publicationDate}</td>
//         <td>{item.ConcernSection}</td>
//         <td>
//           <a href={`http://localhost:5001/${item.pdfFile}`} target="_blank" rel="noopener noreferrer">
//             View PDF
//           </a>
//         </td>
//         <td>
//           <button onClick={() => deleteCircular(item._id)}>Delete</button>
//           <Link to={`/circular/update/${item._id}`}>Update</Link>
//         </td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan="8">No Circulars Found</td>
//     </tr>
//   )}
// </tbody>

//           {/* <tbody>
//   {circularData.length > 0 ? (
//     circularData.map((item, index) => (
//       <tr key={item._id}>
//         <td>{index + 1}</td>
//         <td>{item.title}</td>
//         <td>{item.draftCircularNo}</td>
//         <td>{item.draftCircularDate}</td>
//         <td>{item.finalCircularNo}</td>
//         <td>{item.finalCircularDate}</td>
//         <td>{item.publicationDate}</td>
//         <td>{item.ConcernSection}</td>
//         <td>
        
//   <a
//   href={`http://localhost:5001/uploads/${item.pdfFile}`}
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   View PDF
// </a>


//         </td>
//         <td>
//           <button onClick={() => deleteCircular(item._id)}>Delete</button>
//           <Link to={`/circular/update/${item._id}`}>Update</Link>
//         </td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan="8">No Circulars Found</td>
//     </tr>
//   )}
// </tbody> */}

//         </table>
//       ) : (
//         <form onSubmit={handleSubmit} className="form-container">
//           <div>
//             <label>Title:</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title} // ✅ Now correctly bound
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label>Draft Circular No and Date:</label>
//             <input
//               type="text"
//               name="draftCircularNo"
//               value={formData.draftCircularNo} // ✅ Correct state binding
//               onChange={handleChange}
//             />
//             <input
//               type="date"
//               name="draftCircularDate"
//               value={formData.draftCircularDate} // ✅ Correct state binding
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>Final Circular No and Date:</label>
//             <input
//               type="text"
//               name="finalCircularNo"
//               value={formData.finalCircularNo}
//               onChange={handleChange}
//             />
//             <input
//               type="date"
//               name="finalCircularDate"
//               value={formData.finalCircularDate}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>Date of Publication:</label>
//             <input
//               type="date"
//               name="publicationDate"
//               value={formData.publicationDate}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>Concern Section:</label>
//             <input
//               type="text"
//               name="ConcernSection"
//               value={formData.ConcernSection}
//               onChange={handleChange}
//             />
//           </div>

//           <div>
//             <label>Upload PDF:</label>
//             <input type="file" name="pdf" accept="application/pdf" onChange={handleFileChange} required />

//             {/* //<input type="file" name="pdf" onChange={handleFileChange} required /> */}
//           </div>

//           <button type="submit">Submit</button>
//           <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Circular;





































import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const Circular = () => {
  const [circularData, setCircularData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    srNo: "",
    title: "",
    draftCircularNo: "",
    draftCircularDate: "",
    publicationDate: "",
    ConcernSection: "",
    pdf: "",
  });

  const fetchCirculars = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/api/circulars");
      setCircularData(response.data);
    } catch (error) {
      console.error("Error fetching circulars:", error);
    }
  };

  useEffect(() => {
    fetchCirculars();
  }, []);

  const deleteCircular = async (id) => {
    if (window.confirm("Are you sure you want to delete this circular?")) {
      try {
        const response = await axios.delete(
          `http://localhost:5001/api/deleteCircular/${id}`
        );
        alert(response.data.message);
        fetchCirculars(); // Refresh list after deletion
      } catch (error) {
        console.error("Error deleting circular:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      pdf: selectedFile,
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Circular Records", 20, 20);

    const tableData = circularData.map((item) => [
      item.srNo,
      item.title,
      item.draftCircularNo,
      item.draftCircularDate,
      item.publicationDate,
      item.ConcernSection,
      item.pdfFile ? "View PDF" : "No PDF",
    ]);

    doc.autoTable({
      head: [
        [
          "Sr.No",
          "Title",
          "Draft Circular No",
          "Draft Circular Date",
          "Date of Publication",
          "Concern Section",
          "PDF File",
        ],
      ],
      body: tableData,
    });

    doc.save("circular_records.pdf");
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/circulars/searchCirculars/${searchQuery}`
        );
        setCircularData(response.data);
      } catch (error) {
        console.error("Error during search:", error);
      }
    } else {
      fetchCirculars();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("srNo", formData.srNo);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("draftCircularNo", formData.draftCircularNo);
    formDataToSend.append("draftCircularDate", formData.draftCircularDate);
    formDataToSend.append("publicationDate", formData.publicationDate);
    formDataToSend.append("ConcernSection", formData.ConcernSection);
    formDataToSend.append("pdfFile", formData.pdf);

    try {
      const response = await axios.post("http://localhost:5001/api/insertCircular", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
      setCircularData(response.data.circulars);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
      alert("Failed to add circular. " + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <div className="table">
      <h1>Welcome to Circular Page</h1>
      <div>
        <input
          type="text"
          placeholder="Search Circulars"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => setShowForm(true)}>Add Circular</button>
        <button onClick={generatePDF}>Download PDF</button>
      </div>

      {!showForm ? (
        <table border="1px solid blue">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Title</th>
              <th> Circular No</th>
              <th> Circular Date</th>
              <th>Date of Publication</th>
              <th>Concern Section</th>
              <th>PDF File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(circularData) && circularData.length > 0 ? (
              circularData.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.draftCircularNo}</td>
                  <td>{item.draftCircularDate}</td>
                  <td>{item.publicationDate}</td>
                  <td>{item.ConcernSection}</td>
                  <td>
                    <a href={`http://localhost:5001/${item.pdfFile}`} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
                  </td>
                  <td>
                    <button onClick={() => deleteCircular(item._id)}>Delete</button>
                    <Link to={`/circular/update/${item._id}`}>Update</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No Circulars Found</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Circular No and Date:</label>
            <input
              type="text"
              name="draftCircularNo"
              value={formData.draftCircularNo}
              onChange={handleChange}
            />
            <input
              type="date"
              name="draftCircularDate"
              value={formData.draftCircularDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Date of Publication:</label>
            <input
              type="date"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Concern Section:</label>
            <input
              type="text"
              name="ConcernSection"
              value={formData.ConcernSection}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Upload PDF:</label>
            <input type="file" name="pdf" accept="application/pdf" onChange={handleFileChange} required />
          </div>

          <button type="submit">Submit</button>
          <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Circular;
