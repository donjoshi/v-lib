import React from "react";
import NavbarMain from "../../components/navbar-main";
import { useNavigate } from "react-router-dom";



export default function Results() 
{
    return (
        <div className="main-container6">
            <div className="nav">
                <NavbarMain />
            </div>

            <div className="container6">
                <div className="filter">
                    filter
                </div>

                <div className="result-part">
                    <div className="search-field">
                        <textarea name="query" id="" cols="30" rows="10" ></textarea>
                        <div className="genre">
                            <label htmlFor="genre">Genre</label>
                        </div>
                    </div>

                    <div className="result-show">
                        <div className="flow">
                            results of the books
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}