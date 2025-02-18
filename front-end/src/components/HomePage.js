import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="slider-container">
      <div className="image-slider">
        <img src="https://www.scientiaeducare.com/wp-content/uploads/2016/11/state-university..214.gif" alt="Slide 1" className="slide-image" />
        <img src="https://th.bing.com/th/id/OIP.701_ygz2GMexwfbdNYl_ygHaEe?w=290&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Slide 2" className="slide-image" />  {/* Replace with actual URL */}
        <img src="https://th.bing.com/th/id/OIP.ooozqaGb0Z5K3LIv1KnQIgHaE-?w=273&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Slide 3" className="slide-image" />  {/* Replace with actual URL */}
        {/* Duplicate images for smooth looping */}
        <img src="https://www.scientiaeducare.com/wp-content/uploads/2016/11/state-university..214.gif" alt="Slide 1" className="slide-image" />
        <img src= "https://th.bing.com/th/id/OIP.701_ygz2GMexwfbdNYl_ygHaEe?w=290&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Slide 2" className="slide-image"/>
        <img src= "https://th.bing.com/th/id/OIP.ooozqaGb0Z5K3LIv1KnQIgHaE-?w=273&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Slide 3" className="slide-image" />
      </div>
    </div>
  );
};

export default HomePage;
