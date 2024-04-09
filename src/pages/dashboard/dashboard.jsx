import React from "react";
import Navbar from "../../components/navbar";
import NavbarDashboard from "../../components/navbar-dashboard";
import { NavLink, Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



export default function Dashboard() 
{

    return(
        <div className="main-container">
            <div>
                <NavbarDashboard />
            </div>

            <div className="container">
                Dashboard
            </div>
        </div>
    )
        

}