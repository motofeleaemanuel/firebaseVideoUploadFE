import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WithAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const fetchCheckAuth = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/check", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        await response.json();
      } else {
        navigate("/");
      }
    } catch (err) {
      navigate("/");
      console.error(err);
    }
  };
  useEffect(() => {
    fetchCheckAuth();
  }, [location.pathname]);
  return <div>{children}</div>;
};

export default WithAuth;
