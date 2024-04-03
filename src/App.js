import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import AdminPdfUpload from './pages/admin-pdf-upload';
import AdminPdfUpload2 from './pages/admin-pdf-upload-2';
import AdminPdfUpload3 from './pages/admin-pdf-upload-3';
import UserSearch from './pages/user-search';

function App() {
  return (
    <div className="App">

      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<UserSearch/>} />
        <Route path="/upload-success" element={<AdminPdfUpload3/>} />
      </Routes>
      
    </div>
  );
}

export default App;
