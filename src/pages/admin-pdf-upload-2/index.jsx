import React from "react";
import Navbar from "../../components/navbar";
import './styles.css';
import PdfUpload from "../../components/pdf-upload";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function AdminPdfUpload2() {

    const [formData, setFormData] = useState(new FormData());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    function handleChange(event) {
        setFormData(new FormData(event.target));
    }

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        setLoading(true); // Set loading state

        try {
            const response = await fetch('your-api-endpoint', {
                method: 'POST',
                // Include necessary headers (e.g., Content-Type: multipart/form-data)
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const data = await response.json();
            console.log(data);
            // Handle successful response (redirect, etc.)

            if (data)
            {
                navigate("/xyz")
            }

        } catch (error) {
            console.error(error);
            setError('Error submitting form.');
            setLoading(false); // Reset loading state

        } 
            
    }


    return (
        <div>
        <div>
            <Navbar/>
            </div> 

        <div className="container">

            <div className="add-details">
                <div className="heading">
                    <div className="heading-title">
                        Add a new  book
                    </div>
                    <div className="heading-subheading">
                        Uploading books you want to add to library
                    </div>

                </div>
                <div className="details">
                    <form onSubmit={handleSubmit} onChange={handleChange}>
                        <div className="form-textfield">
                       
                        <label htmlFor="book-name">Book Name</label>
                        <br />
                        <input type="text" id="book-name" name="book-name" placeholder="Name of the Book" />
                        <br />

                        <label htmlFor="author-name">Author Name</label>
                        <br />
                        <input type="text" id="author-name" name="author-name" placeholder="Name of the Author" />
                        <br />

                        <label htmlFor="publish-year">Publish Year</label>
                        <br />
                        <input type="text" id="publish-year" name="publish-year" placeholder="Year of the Publishing" />
                        <br />

                        <label htmlFor="genre">Genre</label>
                        <br />
                        <input type="text" id="genre" name="genre" placeholder="Genre" />
                        <br />
                        </div>
                        
                        <PdfUpload setFormData={setFormData} />

                        <button type="submit" disabled={loading}>
                            {loading ? "Uploading...." : "Upload Book"}
                        </button>

                    </form>

                </div>

            </div>


        </div>
        </div>

    )
}