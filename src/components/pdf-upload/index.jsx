import React from "react";
import './styles.css';
import { useState } from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


export default function PdfUpload()
{

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleUploadOption()
    {
        setLoading(true);

        try
        {

            const response = await fetch('your-api-endpoint', {
                method: 'POST',
                // Include necessary headers and body with the PDF file
            });


            const data= await response.json();
            console.log(data);
            // Handle successful response (redirect to different page, etc.)
            navigate("/admin-pdf-upload-2");


        }
        catch(error)
        {
            setError('Failed to upload PDF.Please try agian');
            console.error(error);
            setLoading(false);
            navigate("/admin-pdf-upload-2");
            

        }

    }
    
        return (
        <div className="admin-pdf-upload">
            <div className="title">
                <div className="add">Add new book</div>
                
                <p>Upload book you want to add to library</p>

            </div>

            <div className="upload">
                <div className="drag-and-drop">
                    Drag & drop your books here
                </div>
                <div className="or">or</div>

                <div className="upload-button">
                    <button onClick={handleUploadOption} disabled={loading}>
                        {loading ? "Uploading..." : "Upload a book from computer"}
                    </button>
                </div>

            </div>

        </div>
        )
}