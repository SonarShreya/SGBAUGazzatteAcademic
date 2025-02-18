import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState(""); 
  const [password, setPassword] = React.useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/"); // If user is already logged in, redirect to home
    }
  }, [navigate]);

  const handleLogin = async () => {
  try {
    let result = await fetch("http://localhost:5001/api/login", { // Ensure the URL is correct
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error("Login failed");
    }

    result = await result.json();
    console.log("Login result:", result);

    if (result.message === "Login successful") {
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/DisplayData");
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login. Please try again.");
  }
};


// const handleLogin = async () => {
//   try {
//     const response = await fetch("http://localhost:5001/api/login", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//       headers: { "Content-Type": "application/json" },
//     });

//     console.log("Response status:", response.status);
//     console.log("Response headers:", response.headers);

//     const result = await response.json();
//     console.log("Login result:", result);

//     if (result.message === "Login successful") {
//       localStorage.setItem("user", JSON.stringify(result.user));
//       navigate("/DisplayData");
//     } else {
//       alert(result.message || "Login failed");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     alert("An error occurred during login. Please try again.");
//   }
// };


  return (
    <div className="login">
      <h1>Login Page</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className="inputBox"
        placeholder="Enter password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleLogin} className="appButton">
        Login
      </button>
    </div>
  );
};

export default Login;
