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

            <div className="container-result">
                <div className="filter">
                    <span className="Filter-Header">Filter</span>
                </div>

                <div className="result-part">
                    <div className="search-field">
                        <textarea className="text-area textarea-res" name="query" id="" cols="50" rows="5" value={textAreaValue} ></textarea>
                        <div className="genre">
                            <label htmlFor="genre">Genre</label>
                        </div>
                    </div>

                    <div className="result-show">
                        <div className="results">
                            <span className="results-header">Results</span>
                            <div className="display">
                                {apiResponse && apiResponse.result && ( // Check for both apiResponse and result
                                    <ul className="search-result">
                                        {/* Loop through each item in apiResponse.result */}
                                        {apiResponse.result.map((item, index) => (
                                            <li key={index}>
                                                {/* Access and display properties of each item */}
                                                <span className="Title-name">{item[0] }</span>
                                                <span className="Author-name">{item[1]}</span>
                                                <span className="Doc-type">{item[3]}</span>
                                                <span className="year-of-publish">{item[2]}</span>
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