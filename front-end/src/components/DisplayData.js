import React from 'react';
import { useNavigate } from 'react-router-dom';

const DisplayData = () => {
  const navigate = useNavigate();

  const handleDirectionClick = (type) => {
    if (type === 'details') {
      navigate('/details');
    } else if (type === 'direction') {
      navigate('/direction');
    } else if (type === 'ordinance') { // Correct case for ordinance
      navigate('/ordinance'); // Navigate to the Ordinance page
    } else if (type === 'circular') {
      navigate('/circular');
    } else if (type === 'statute') {
      navigate('/statute');
    }else if (type === 'govtGazetteII') {
      navigate('/GovtGazetteII');
    }else if (type === 'notification') {
      navigate('/notification');
    } else if (type === 'govtGazette') {
      navigate('/govtGazette');
    } else if (type === 'regulation') {
      navigate('/regulation');
    }
  };
  
  
  return (
    <div className="table" >
   <div className ="display-data-container"></div>
      {/* <h1>Sant Gadge Baba Amravati University, Amravati</h1>
      <h3>University Publication</h3> */}
      <table>
        <thead>
            <tr>
            <th colSpan="5" className="part-header">
              Gazette Part - I
            </th>
            <th colSpan="3" className="part-header">
              Gazette Part - II
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td onClick={() => handleDirectionClick('regulation')}>Regulation</td>
            <td onClick={() => handleDirectionClick('direction')}>Direction</td>
            <td onClick={() => handleDirectionClick('ordinance')}>Ordinance</td>
            <td onClick={() => handleDirectionClick('statute')}>Statute</td>
            <td onClick={() => handleDirectionClick('govtGazette')}>GovtGazette I</td>
            <td onClick={() => handleDirectionClick('notification')}>Notification,</td>
            <td onClick={() => handleDirectionClick('circular')}>Circular</td>
            <td onClick={() => handleDirectionClick('govtGazetteII')}>GovtGazette II</td>
          </tr>
        </tbody>
      </table>
     
    </div>
  );
};

export default DisplayData;












