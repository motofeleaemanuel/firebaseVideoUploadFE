import { Button, Typography } from "@mui/material";
import React from "react";
import theme from "../theme";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <div
      style={{
        height: "50px",
        backgroundColor: theme.palette.primary.main,
        boxShadow: "0 2px 0px 0px gray",
      }}
    >
      <div
        style={{
          maxWidth: "1024px",
          margin: "auto",
          display: "flex",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ padding: "12px" }}>
          <Typography
            variant="h5"
            style={{ color: "white", fontWeight: "bold" }}
          >
            Logo
          </Typography>
        </div>
        <Button onClick={handleLogout} variant="contained" color="secondary">
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
