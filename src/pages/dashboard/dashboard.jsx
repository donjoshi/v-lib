import React from "react";
import Navbar from "../../components/navbar";
import NavbarDashboard from "../../components/navbar-dashboard";



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