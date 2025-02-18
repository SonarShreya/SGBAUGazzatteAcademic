import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const RegulationForm = () => {
  // Initial State
  const [regulationData, setRegulationData] = useState({
    regulationDetails: {
      draft: {
        number: "",
        date: null, // Initialize as null for DatePicker compatibility
      },
      final: {
        number: "",
        date: null,
      },
    },
    statute: "",
    notification: "",
    circular: "",
    govtGazette: "",
  });

  // Handle changes for Draft Regulation Date
  const handleDraftDateChange = (date) => {
    setRegulationData((prevData) => ({
      ...prevData,
      regulationDetails: {
        ...prevData.regulationDetails,
        draft: { ...prevData.regulationDetails.draft, date },
      },
    }));
  };

  // Handle changes for Final Regulation Date
  const handleFinalDateChange = (date) => {
    setRegulationData((prevData) => ({
      ...prevData,
      regulationDetails: {
        ...prevData.regulationDetails,
        final: { ...prevData.regulationDetails.final, date },
      },
    }));
  };

  // Handle changes for text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "draftNumber" || name === "finalNumber") {
      setRegulationData((prevData) => ({
        ...prevData,
        regulationDetails: {
          ...prevData.regulationDetails,
          [name === "draftNumber" ? "draft" : "final"]: {
            ...prevData.regulationDetails[
              name === "draftNumber" ? "draft" : "final"
            ],
            number: value,
          },
        },
      }));
    } else {
      setRegulationData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/insertRegulation", // Ensure this matches your backend endpoint
        regulationData // The state data collected from the form
      );
      alert(response.data.message); // Success message
      setRegulationData({
        regulationDetails: {
          draft: { number: "", date: null },
          final: { number: "", date: null },
        },
        statute: "",
        notification: "",
        circular: "",
        govtGazette: "",
      });
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error.message);
      alert("Failed to submit the form. Please try again.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Draft Regulation No:</label>
        <input
          type="text"
          name="draftNumber"
          value={regulationData.regulationDetails.draft.number}
          onChange={handleInputChange}
          placeholder="Enter draft regulation number"
        />
        <label>Draft Regulation Date:</label>
        <DatePicker
          selected={regulationData.regulationDetails.draft.date}
          onChange={handleDraftDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select draft regulation date"
          isClearable
        />
      </div>
      <div>
        <label>Final Regulation No:</label>
        <input
          type="text"
          name="finalNumber"
          value={regulationData.regulationDetails.final.number}
          onChange={handleInputChange}
          placeholder="Enter final regulation number"
        />
        <label>Final Regulation Date:</label>
        <DatePicker
          selected={regulationData.regulationDetails.final.date}
          onChange={handleFinalDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select final regulation date"
          isClearable
        />
      </div>
      <div>
        <label>Statute:</label>
        <input
          type="text"
          name="statute"
          value={regulationData.statute}
          onChange={handleInputChange}
          placeholder="Enter statute"
        />
      </div>
      <div>
        <label>Notification:</label>
        <input
          type="text"
          name="notification"
          value={regulationData.notification}
          onChange={handleInputChange}
          placeholder="Enter notification"
        />
      </div>
      <div>
        <label>Circular:</label>
        <input
          type="text"
          name="circular"
          value={regulationData.circular}
          onChange={handleInputChange}
          placeholder="Enter circular"
        />
      </div>
      <div>
        <label>Govt Gazette:</label>
        <input
          type="text"
          name="govtGazette"
          value={regulationData.govtGazette}
          onChange={handleInputChange}
          placeholder="Enter govt gazette"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegulationForm;
