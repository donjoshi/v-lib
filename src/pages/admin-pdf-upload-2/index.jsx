import React from "react";
import Navbar from "../../components/navbar";
import './styles.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPdfUpload2() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filename,setfilename]=useState('Chose File');
    const [title,setTitle]=useState('');
    const [author,setAuthor]=useState('');
    const [year,setYear]=useState('');
    const [type,setType]=useState('');
    const [genre,setGenre]=useState('');
    const [file,setfile]=useState('');

    const navigate = useNavigate();

    const change = (e) => {
        setfile(e.target.files[0]);
        setfilename(e.target.files[0].name);
    }

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        setLoading(true); // Set loading state

        const formData = new FormData();
        formData.append('file',file);
    
        try {

            // var metaData = {
            //     "title": title,
            //     "author": author,
            //     "year": year,
            //     "type": type,
            //     "genre": genre,
            // };
            // formData.append('metadata', metaData);
            formData.append('title', title);
            formData.append('author', author);
            formData.append('year', year);
            formData.append('genre', genre);
            formData.append('type', type);

            var requestOptions = {
                method: 'POST',
                body: formData, 
                headers: {
                    'Origin': 'http://192.168.138.176:8000' // Replace with your React app's origin
                  },
                // redirect: 'follow'
            };

            const response1 = await fetch("http://192.168.138.176:8000/addBook", requestOptions)
            // .then(response => response.text())
            // .then(result => console.log(result))
            // .catch(error => console.log('error', error));


            // const response1 = await fetch("http://192.168.1.75:8000/addBook", {
            //     method: "POST",
            //     data: {
            //         "title": title,
            //         "author":author,
            //         "year"  :year,
            //         "type"  :type,
            //         "genre" :genre,
            //     },
            //     headers: {
            //         "Content-Type": "application/json",
            //     },

            // });

            console.log("successs")
            const data = await response1.text();
            console.log("successs")
            console.log(data);
            // Handle successful response (redirect, etc.)

            if (data) {
                navigate("/upload-success")
            }

        } catch (error) {
            console.error(error);
            setError('Error submitting form.');
            <h1>Error Occurred</h1>

            setLoading(false); // Reset loading state

        }

    }


    return (
        <div className="main-container">
            <div>
                <Navbar />
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
                        <form onSubmit={handleSubmit}>
                            <div className="form-textfield">

                                <label htmlFor="book-name">Book Name</label>
                                <br />
                                <input type="text" id="book-name" name="book-name" placeholder="Name of the Book" onChange={e=>setTitle(e.target.value)} />
                                <br />

                                <label htmlFor="author-name">Author Name</label>
                                <br />
                                <input type="text" id="author-name" name="author-name" placeholder="Name of the Author" onChange={e=>setAuthor(e.target.value)}/>
                                <br />

                                <label htmlFor="publish-year">Publish Year</label>
                                <br />
                                <input type="text" id="publish-year" name="publish-year" placeholder="Year of the Publishing" onChange={e=>setYear(e.target.value)}/>
                                <br />

                                <label htmlFor="type-of-doc">Type Of Doc</label>
                                <br />
                                <input type="drop-down" id="type-of-doc" name="type-of-doc" placeholder="Type of doc" onChange={e=>setType(e.target.value)}/>
                                <br />

                                <label htmlFor="genre">Genre</label>
                                <br />
                                <input type="text" id="genre" name="genre" placeholder="Genre" onChange={e=>setGenre(e.target.value)}/>
                                <br />
                            </div>

                            {/* <PdfUpload setFormData={setFormData} /> */}

                            <div className="upload">
                                <div className="drag-and-drop">
                                    <span>Drag & drop your books here</span>
                                </div>
                                <div className="or">or</div>

                                <div className="upload-button">
                                    <input type="file" id="file" name="file" accept=".pdf" className="file" onChange={change}/>
                                </div>

                            </div>

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