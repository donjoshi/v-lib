import React from "react";
import NavbarMain from "../../components/navbar-main";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./results.css";
import { useState } from "react";



export default function Results() {

    

    const location = useLocation();

    const { apiResponse, textAreaValue } = location.state || {};
    
    const [text_area, setText_area] = useState(textAreaValue);

    console.log(apiResponse);

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
                        <textarea name="query" id="" cols="50" rows="5" value={textAreaValue} ></textarea>
                        <div className="genre">
                            <label htmlFor="genre">Genre</label>
                        </div>
                    </div>

                    <div className="result-show">
                        <div className="flow">
                            results of the books
                            <div className="display">
                                {apiResponse && apiResponse.result && ( // Check for both apiResponse and result
                                    <ul>
                                        {/* Loop through each item in apiResponse.result */}
                                        {apiResponse.result.map((item, index) => (
                                            <li key={index}>
                                                {/* Access and display properties of each item */}
                                                <p>Title: {item[0] }</p>
                                                <p>Author: {item[1]}</p>
                                                <p>Type:{item[3]}</p>
                                                <p>Year: {item[2]}</p>
                                                {/* <p>
                                                    Download Link:{" "}
                                                    <a href={item[4]}>{item[0] || item[1]}</a>
                                                </p> */}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}