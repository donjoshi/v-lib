import React from "react";
import './styles.css';
import { NavLink } from "react-router-dom";



export default function NavbarMain()
{

    return <div className="navbar-main">
        
        <div className="container5">
            <div className="one">
                <NavLink to ={'/journals'}>
                    Journals
                </NavLink>
            </div>

            <div className="two">
                Books
            </div>

            <div className="three">
                How it works
            </div>

            <div className="four">
                <NavLink to={'/'}>Login</NavLink>
            </div>
        </div>
    </div>
}