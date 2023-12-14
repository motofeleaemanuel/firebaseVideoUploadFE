import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UploadVideo from "./pages/UploadVideo";
import DownloadFile from "./pages/DownloadFile";
import WithAuth from "./components/WithAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/main"
          element={
            <WithAuth>
              <UploadVideo />
            </WithAuth>
          }
        />
        <Route
          path="/files"
          element={
            <WithAuth>
              <DownloadFile />
            </WithAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
