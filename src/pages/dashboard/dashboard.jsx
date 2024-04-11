import React from "react";
import Navbar from "../../components/navbar";
import NavbarDashboard from "../../components/navbar-dashboard";
import { NavLink, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./dashboard.css";



export default function Dashboard() {

    const [totalBooks, setTotalBooks] = useState(0);
    const [recentlyAddedBooks, setRecentlyAddedBooks] = useState([]);

    useEffect(() => {
        fetchTotalBooks();
        fetchRecentlyAddedBooks();
    }, []);

    const fetchTotalBooks = async () => {
        try {
            const response = await fetch("http://192.168.1.75:8000/findBook/getAllBooks");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            // console.log(data['result'].length);
            setTotalBooks(data['result'].length);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchRecentlyAddedBooks = async () => {
        try {
            const response = await fetch("http://192.168.1.75:8000/findBook/getTenBooks");
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();

            console.log("10 books :", data);
            setRecentlyAddedBooks(data['result']);
        } catch (error) {
            console.error('Error fetching recently added books:', error);
        }
    };


    return (
        <div className="main-container">
            <div>
                <NavbarDashboard />
            </div>

            <div className="container">
                <div className="search">
                    <input type="text" placeholder="Search book" />
                </div>

                <div className="total-book-count">
                    <div className="count">
                        {totalBooks}
                    </div>
                    <div className="text">
                        Total Books
                    </div>

                </div>

                <div className="display-details">
                    Recently added

                    <div className="table">
                        <table border={1}>
                            <thead>
                                <tr>
                                    <th>Books</th>                
                                    <th>Publishing Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentlyAddedBooks.map((book, index) => (
                                    <tr key={index}>
                                        <td>{book[1]}</td>
                                        <td>{book[3]}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    )


}