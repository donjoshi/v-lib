import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import AdminPdfUpload from './pages/admin-pdf-upload';
import AdminPdfUpload2 from './pages/admin-pdf-upload-2';

function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route path="/" element={<AdminPdfUpload/>} />
        <Route path="/admin-pdf-upload-2" element={<AdminPdfUpload2/>} />
      </Routes>
      
    </div>
  );
}

export default App;
