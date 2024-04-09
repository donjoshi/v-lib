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
        <div className="main">
            <div className="dash-board">
                <NavLink to="/dash-board" className="nav-dashboard">Dashboard</NavLink>
            </div>

            <div className="logout">
                <NavLink to="/" className="nav-logout">Logout</NavLink>
            </div>

            <button onClick={handleOnButtonClick}>Add new book</button>


        </div>
    </div>
}