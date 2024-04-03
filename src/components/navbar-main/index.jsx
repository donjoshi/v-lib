import React from "react";
import './styles.css';
import { NavLink } from "react-router-dom";



export default function NavbarMain()
{

    return <div className="navbar-main">
        <div className="logo"></div>
        <div className="nav-items">
            <div className="one">
                <NavLink to ={'/journals'}>
                    Journals
                </NavLink>
            </div>

            <div className="two">
                <span>Books</span>
            </div>

            <div className="three">
                <span>How it works</span>
            </div>

            <div className="login">
                <NavLink to={'/admin'}>Login</NavLink>
            </div>
        </div>
    </div>
}