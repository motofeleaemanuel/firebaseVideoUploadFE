import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import theme from "../theme";

export default function FilesTable({
  files,
  handleDownloadFile,
  handleDeleteFile,
}) {
  console.log(files);
  return (
    <TableContainer component={Paper} style={{ maxWidth: "1024px" }}>
      <Table aria-label="simple table">
        <TableHead
          style={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <TableRow>
            <TableCell style={{ color: "white" }}>Nr.</TableCell>
            <TableCell style={{ color: "white" }} align="right">
              FileName
            </TableCell>
            <TableCell style={{ color: "white" }} align="right">
              Firestore video url
            </TableCell>
            <TableCell style={{ color: "white" }} align="right">
              Cloudflare video playback
            </TableCell>
            <TableCell style={{ color: "white" }} align="right">
              Download
            </TableCell>
            <TableCell style={{ color: "white" }} align="right">
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files && files.length > 0 ? (
            files?.map((file, index) => (
              <TableRow
                key={file.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{file.fileName}</TableCell>
                <TableCell align="right">
                  <a href={file.firestoreVideoUrl}>Access firestore video</a>
                </TableCell>
                <TableCell align="right">
                  <a href={file.cloudflarePlaybackUrl}>
                    Access cloudflare playback video
                  </a>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleDownloadFile(file.id, file.fileName)}
                  >
                    <FileDownloadIcon />
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button id="deleteButton"
                    onClick={() => handleDeleteFile(file.id, file.fileName)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                No data.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
