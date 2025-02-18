import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear(); // Clear user data
    setTimeout(() => {
      navigate("/homepage"); // Redirect to home page after logout
    }, 2000);
  }, [navigate]);

  return (
    <div>
      <h2>You have been logged out.</h2>
      <p>Redirecting to home page...</p>
    </div>
  );
};

export default Logout;
