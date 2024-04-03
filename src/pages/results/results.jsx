import React from "react";
import NavbarMain from "../../components/navbar-main";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./results.css";



export default function Results() 
{

    const location = useLocation();

    const {apiResponse,textAreaValue} = location.state || {};
    
    return (
        <div className="main-container6">
            <div className="nav">
                <NavbarMain />
            </div>

            <div className="container6">
                <div className="filter">
                    <span className="Filter">filter</span>
                </div>

                <div className="result-part">
                    <div className="search-field">
                        <textarea name="query" id="" cols="50" rows="5" value={textAreaValue} ></textarea>
                        <div className="genre">
                            <label htmlFor="genre">Genre</label>
                        </div>
                    </div>

                    <div className="result-show">
                        <div className="flow">
                            results of the books
                            {apiResponse['result'][1][0]}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}