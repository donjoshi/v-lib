import React from "react";
import { NavLink, Navigate } from 'react-router-dom';
import './styles.css';
import { useNavigate } from "react-router-dom";



export default function NavbarDashboard() {


    const navigate = useNavigate();

    function handleOnButtonClick() {
        navigate("/admin")
    }

    return <div className="navbar">
        <div className="main-dashboard">
            <div className="dash-board">
                <NavLink to="/dashboard" className="nav-dashboard">Dashboard</NavLink>
            </div>

            <div className="logout">
                <NavLink to="/" className="nav-logout">Logout</NavLink>
            </div>

            <button className="primary" onClick={handleOnButtonClick}><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.15784 4.172C3.98584 5.343 3.98584 7.229 3.98584 11V13C3.98584 16.771 3.98584 18.657 5.15784 19.828C6.32884 21 8.21484 21 11.9858 21H13.9858C17.7568 21 19.6428 21 20.8138 19.828C21.9858 18.657 21.9858 16.771 21.9858 13V11C21.9858 7.229 21.9858 5.343 20.8138 4.172C19.6428 3 17.7568 3 13.9858 3H11.9858C8.21484 3 6.32884 3 5.15784 4.172ZM11.9858 7V11H7.98584V13H11.9858V17H13.9858V13H17.9858V11H13.9858V7H11.9858Z" fill="white"/>
</svg>Add new book</button>


        </div>
    </div>
}