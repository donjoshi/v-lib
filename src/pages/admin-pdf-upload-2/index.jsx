import React from "react";
import Navbar from "../../components/navbar";
import './styles.css';




export default function AdminPdfUpload2()
{


    return (

        <div className="container">
            
            <div className="add-details">
                <div className="heading">
                    <div className="heading1">
                        Add details of the book
                    </div>
                    <div className="heading2">
                        Add details of your book for adding to library
                    </div>

                </div>
                <div className="details">
                    <form >
                        
                        <label htmlFor="book-name">Book Name</label>
                        <br />
                        <input type="text" id="book-name" name="book-name" placeholder="Name of the Book"/>
                        <br />
                        
                        <label htmlFor="author-name">Author Name</label>
                        <br />
                        <input type="text" id="author-name" name="author-name" placeholder="Name of the Author"/>
                        <br />
                        
                        <label htmlFor="publish-year">Publish Year</label>
                        <br />
                        <input type="text" id="publish-year" name="publish-year" placeholder="Year of the Publishing"/>
                        <br />
                        
                        <label htmlFor="genre">Genre</label>
                        <br />
                        <input type="text" id="genre" name="genre" placeholder="Genre"/>
                        <br />

                        <button>Next</button>
                        
                    </form>

                </div>

            </div>
            

        </div>

    )
}