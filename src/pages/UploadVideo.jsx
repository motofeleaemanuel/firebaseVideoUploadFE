import React, { useState } from "react";
import AddFile from "../components/AddFile";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const UploadVideo = () => {
  const [file, setFile] = useState();
  const [uploadText, setUploadText] = useState("");
  const navigate = useNavigate();

  const handleAddFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      const response = await fetch("http://localhost:5000/api/storage", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUploadText("File uploaded successfully");
      } else {
        const errorData = await response.json();
        setUploadText(errorData.message);
      }
    } catch (error) {
      console.error("Error uploading file", error.response);
    }
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          height: "calc(100vh - 50px)",
          display: "flex",
          justifyContent: "center",
          maxWidth: "1024px",
          margin: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AddFile
            handleAddFile={handleAddFile}
            handleSubmitForm={handleSubmitForm}
            uploadText={uploadText}
          />
          <Button  id="viewAllButton" variant="contained" onClick={() => navigate("/files")}>
            View All Files
          </Button>
        </div>
      </div>
    </>
  );
};

export default UploadVideo;
