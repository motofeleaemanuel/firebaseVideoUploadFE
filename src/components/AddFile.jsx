import { Container } from "@mui/material";
import React from "react";

const AddFile = ({ handleAddFile, handleSubmitForm, uploadText }) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ marginBottom: "24px", padding: "0px" }}
    >
      <div style={{ width: "100%" }}>
        <h2>Upload file</h2>
        <form onSubmit={handleSubmitForm}>
          <input
            type="file"
            id="fileInput"
            name="file"
            onChange={handleAddFile}
          />
          <button>upload</button>
        </form>
        {uploadText && <p>{uploadText}</p>}
      </div>
    </Container>
  );
};

export default AddFile;
