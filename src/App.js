import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import AdminPdfUpload from "./pages/admin-pdf-upload";
import AdminPdfUpload2 from "./pages/admin-pdf-upload-2";
import AdminPdfUpload3 from "./pages/admin-pdf-upload-3";
import UserSearch from "./pages/user-search";
import Results from "./pages/results/results";


function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}

      <Routes>
        {/* <Route path="/" element={<Results />} /> */}
        <Route path="/" element={<UserSearch />} />
        <Route path="/admin" element={<AdminPdfUpload2 />} />
        <Route path="/upload-success" element={<AdminPdfUpload3 />} />
        <Route path="/results" element={<Results />} />
        
      </Routes>
    </div>
  );
}

export default App;
