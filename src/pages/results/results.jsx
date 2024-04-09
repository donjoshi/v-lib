import React from "react";
import NavbarMain from "../../components/navbar-main";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./results.css";
import { useState } from "react";
import { navigate } from "react-router-dom";



export default function Results() {

    const location = useLocation();

    const { apiResponse, textAreaValue } = location.state || {};

    const [text_area, setText_area] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function handleButtonClick(event) {
        event.preventDefault(); // Prevent default form submission

        console.log("entered the button click function");

        setIsLoading(true); // Set loading state

        const formData = new FormData();

        try {
            formData.append('query', text_area);
            // formData.append('genre', genre);


            var requestOptions1 = {
                method: 'POST',
                body: formData,
                headers: {
                    'Origin': 'http://192.168.138.176:8000' // Replace with your React app's origin
                },
                // redirect: 'follow'
            };

            const response = await fetch("http://192.168.138.176:8000/findBook", requestOptions1)

            const data = await response.json();
            // navigate("/upload-success")

            console.log(data['result'][0][0]);

            navigate("/results", {
                state: {
                    apiResponse: data,
                    textAreaValue: text_area,
                },
            });
        }

        catch (error) {
            console.error(error);
            <h1>Error Occurred</h1>
            setIsLoading(false); // Reset loading state
        }
    }


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
                        <textarea className={`text-area ${isFocused ? "focused" : ""}`}
                            name="query" id="" cols="50" rows="5" onChange={e => setText_area(e.target.value)}

                            onClick={() => setIsFocused(true)}
                        //onBlur={() => setIsFocused(false)}

                        >

                            {textAreaValue}



                        </textarea>

                        {isFocused && (
                            <div className="button-container">
                                <button type="submit" disabled={isLoading} onClick={handleButtonClick}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z" stroke="white" stroke-width="2"/>
<path d="M20 20L17 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>

                                    {isLoading ? "Searching...." : "Search"}
                                </button>
                            </div>
                        )}




                        {/* <div className="genre">
                            <label htmlFor="genre">Genre</label>
                        </div> */}
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
                                                <span className="Title-name">{item[0]}</span>
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