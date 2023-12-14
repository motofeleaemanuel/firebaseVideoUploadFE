import React, { useEffect, useState } from "react";
import FileList from "../components/FileList";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Navbar from "../components/Navbar";

const DownloadFile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [files, setFiles] = useState([]);
  const fetchFileNames = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/storage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setFiles(data);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const handleDownloadFile = (fileId, fileName) => {
    fetch(
      `http://localhost:5000/api/storage/download?fileId=${fileId}&fileName=${fileName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error downloading file.");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteFile = (fileId, fileName) => {
    fetch(
      `http://localhost:5000/api/storage/?fileId=${fileId}&fileName=${fileName}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          console.log("wokei");
        }
        window.location.reload();
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchFileNames();
  }, []);
  return (
    <>
      <Navbar />
      <div
        style={{
          height: "calc(100vh - 50px)",
          maxWidth: "1024px",
          margin: "auto",
        }}
      >
        <div style={{ padding: "12px" }}>
          <Button variant="outlined" onClick={() => navigate("/main")}>
            Upload a file
          </Button>
          <h2 style={{ textAlign: "start" }}>Uploaded Files:</h2>
          <FileList
            files={files}
            handleDownloadFile={handleDownloadFile}
            handleDeleteFile={handleDeleteFile}
          />
        </div>
      </div>
    </>
  );
};

export default DownloadFile;
