import React from "react";
import FilesTable from "./FilesTable";

const FileList = ({ files, handleDownloadFile, handleDeleteFile }) => {
  return (
    <div>
      <FilesTable
        files={files}
        handleDownloadFile={handleDownloadFile}
        handleDeleteFile={handleDeleteFile}
      />
    </div>
  );
};

export default FileList;
