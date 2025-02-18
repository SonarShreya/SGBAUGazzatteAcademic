import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponents = () => {
  // Check if the user is authenticated by looking for a "user" item in localStorage
  const auth = localStorage.getItem("user");

  // If authenticated, render child routes (Outlet), otherwise redirect to /signup
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateComponents;
