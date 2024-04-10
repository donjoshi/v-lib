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
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleButtonClick(event) {
        event.preventDefault(); // Prevent default form submission

        console.log("entered the button click function");

        setLoading(true); // Set loading state

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
            setLoading(false); // Reset loading state
        }
    }


    return (
        <div className="main-container6">
            <div className="nav">
                <NavbarMain />
            </div>
            <div className="search-div"><div className="searchbar">
                    <div className="content">
                    <svg className="searchIcon" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.328613" width="32" height="32" rx="16" fill="#6C70BF"/>
<path d="M15.3286 22C19.1946 22 22.3286 18.866 22.3286 15C22.3286 11.134 19.1946 8 15.3286 8C11.4626 8 8.32861 11.134 8.32861 15C8.32861 18.866 11.4626 22 15.3286 22Z" stroke="white" stroke-width="2"/>
<path d="M24.3286 24L21.3286 21" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
                        <textarea className="text-area"
                            name="query" id="" onChange={e => setText_area(e.target.value)}

                            onClick={() => setIsFocused(true)}
                        //onBlur={() => setIsFocused(false)}

                        >

                            {textAreaValue}



                        </textarea>


                        {/* <div className="button-container">
                            <button type="submit" disabled={isLoading} onClick={handleButtonClick}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z" stroke="white" stroke-width="2" />
                                    <path d="M20 20L17 17" stroke="white" stroke-width="2" stroke-linecap="round" />
                                </svg>

                                {isLoading ? "Searching...." : "Search"}
                            </button>
                        </div> */}





                        {/* <div className="genre">
                            <label htmlFor="genre">Genre</label>
                        </div> */}
                    </div>
                    <div className="search-space-2">
                                <button type="submit" disabled={loading}>

                                    {loading ? "Search" : "Search"}
                                </button>
                        </div>
                    </div></div>
            <div className="container-result">
                <div className="filter">
                    <span className="Filter-Header">Filter</span>
                    <div className="filter-content"></div>
                </div>

                <div className="result-part">

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
                                                <div className="bookimage">
                                                <svg width="99" height="123" viewBox="0 0 99 123" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.26145 113.205H85.2607L88.8827 109.078L89.3827 109.078V109.077L89.3876 5.44796C89.3876 3.17141 87.5372 1.32104 85.2607 1.32104H5.26145C2.98492 1.32104 1.13455 3.17141 1.13455 5.44794V109.078C1.13455 111.354 2.98492 113.205 5.26145 113.205ZM9.40687 108.427C7.47387 108.427 5.90687 106.86 5.90687 104.927L5.90676 9.59822C5.90676 7.66522 7.47376 6.09821 9.40676 6.09821H81.11C83.0431 6.09821 84.6101 7.66532 84.61 9.59838L84.6055 104.928C84.6054 106.861 83.0385 108.427 81.1055 108.427H9.40687Z" fill="#6F72B7" stroke="#6F72B7"/>
<path d="M12.088 110.815V110.815L12.0832 119.03C12.0832 119.03 12.0832 119.03 12.0832 119.03M12.088 110.815L98.8412 119.03C98.8363 121.025 97.2097 122.657 95.2093 122.657H15.2101C13.2097 122.657 11.5832 121.03 11.5832 119.03L12.0832 119.03M12.088 110.815C12.088 110.047 12.709 109.426 13.4767 109.426C14.2443 109.426 14.8652 110.047 14.8653 110.815C14.8653 110.815 14.8653 110.815 14.8653 110.815L14.8629 114.877C14.8614 117.363 16.8765 119.379 19.3629 119.379H91.0591C93.5443 119.379 95.559 117.365 95.5591 114.88L95.5636 19.5505C95.5637 17.0651 93.549 15.0502 91.0636 15.0502H86.9992C86.2315 15.0502 85.6106 14.4293 85.6106 13.6616C85.6106 12.8939 86.2315 12.2729 86.9992 12.2729H95.2143C96.9385 12.2729 98.3412 13.6756 98.3412 15.3998V119.029M12.088 110.815L98.3412 119.029M12.0832 119.03C12.0833 120.754 13.4859 122.157 15.2101 122.157H95.2093C96.9329 122.157 98.337 120.75 98.3412 119.029M12.0832 119.03L98.3412 119.029" fill="#6F72B7" stroke="#6F72B7"/>
<path d="M74.8654 69.5366H15.6555C14.6116 69.5366 13.7668 68.6918 13.7668 67.6479C13.7668 66.6041 14.6117 65.7593 15.6555 65.7593H74.8654C75.9092 65.7593 76.754 66.6041 76.754 67.6479C76.7491 68.6918 75.9043 69.5366 74.8654 69.5366Z" fill="#BEC0E7"/>
<path d="M74.8649 79.9223H49.054C48.0101 79.9223 47.1653 79.0775 47.1653 78.0337C47.1653 76.9898 48.0102 76.145 49.054 76.145H74.8649C75.9087 76.145 76.7535 76.9898 76.7535 78.0337C76.7486 79.0727 75.9038 79.9223 74.8649 79.9223Z" fill="#BEC0E7"/>
<path d="M74.8649 90.3024H49.054C48.0101 90.3024 47.1653 89.4576 47.1653 88.4138C47.1653 87.37 48.0102 86.5251 49.054 86.5251H74.8649C75.9087 86.5251 76.7535 87.37 76.7535 88.4138C76.7486 89.4577 75.9038 90.3024 74.8649 90.3024Z" fill="#BEC0E7"/>
<path d="M74.8649 100.688H49.054C48.0101 100.688 47.1653 99.8434 47.1653 98.7995C47.1653 97.7557 48.0102 96.9109 49.054 96.9109H74.8649C75.9087 96.9109 76.7535 97.7557 76.7535 98.7995C76.7486 99.8434 75.9038 100.688 74.8649 100.688Z" fill="#BEC0E7"/>
<path d="M74.8654 59.1516H15.6555C14.6116 59.1516 13.7668 58.3067 13.7668 57.2629C13.7668 56.2191 14.6117 55.3743 15.6555 55.3743H74.8654C75.9092 55.3743 76.754 56.2191 76.754 57.2629C76.7491 58.3068 75.9043 59.1516 74.8654 59.1516Z" fill="#BEC0E7"/>
<path d="M74.8654 48.7661H15.6555C14.6116 48.7661 13.7668 47.9212 13.7668 46.8774C13.7668 45.8336 14.6117 44.9888 15.6555 44.9888H74.8654C75.9092 44.9888 76.754 45.8336 76.754 46.8774C76.7491 47.9213 75.9043 48.7661 74.8654 48.7661Z" fill="#BEC0E7"/>
<path d="M74.8649 38.3857H49.054C48.0101 38.3857 47.1653 37.5409 47.1653 36.497C47.1653 35.4532 48.0102 34.6084 49.054 34.6084H74.8649C75.9087 34.6084 76.7535 35.4532 76.7535 36.497C76.7486 37.5361 75.9038 38.3857 74.8649 38.3857Z" fill="#BEC0E7"/>
<path d="M74.8649 17.6152H49.054C48.0101 17.6152 47.1653 16.7704 47.1653 15.7265C47.1653 14.6827 48.0102 13.8379 49.054 13.8379H74.8649C75.9087 13.8379 76.7535 14.6827 76.7535 15.7265C76.7486 16.7704 75.9038 17.6152 74.8649 17.6152Z" fill="#BEC0E7"/>
<path d="M74.8649 27.9999H49.054C48.0101 27.9999 47.1653 27.1551 47.1653 26.1113C47.1653 25.0675 48.0102 24.2227 49.054 24.2227H74.8649C75.9087 24.2227 76.7535 25.0675 76.7535 26.1113C76.7486 27.1552 75.9038 27.9999 74.8649 27.9999Z" fill="#BEC0E7"/>
<path d="M40.3401 38.3861H15.6566C14.6128 38.3861 13.768 37.5413 13.768 36.4975V15.9206C13.768 14.8768 14.6128 14.032 15.6566 14.032H40.3401C41.384 14.032 42.2288 14.8768 42.2288 15.9206V36.4925C42.2288 37.5364 41.384 38.3861 40.3401 38.3861ZM17.5435 30.6099C17.5441 32.8186 19.3348 34.6087 21.5435 34.6087H34.4547C36.6643 34.6087 38.4553 32.8171 38.4547 30.6076L38.4521 21.808C38.4515 19.5993 36.6608 17.8091 34.4521 17.8091H21.5409C19.3314 17.8091 17.5403 19.6007 17.5409 21.8103L17.5435 30.6099Z" fill="#BEC0E7"/>
<path d="M40.3401 100.492H15.6566C14.6128 100.492 13.768 99.6477 13.768 98.6038V78.032C13.768 76.9881 14.6128 76.1433 15.6566 76.1433H40.3401C41.384 76.1433 42.2288 76.9881 42.2288 78.032V98.6038C42.2288 99.6429 41.384 100.492 40.3401 100.492ZM17.5446 92.7151C17.5446 94.9242 19.3355 96.7151 21.5446 96.7151H34.4558C36.665 96.7151 38.4558 94.9242 38.4558 92.7151V83.9205C38.4558 81.7113 36.665 79.9205 34.4558 79.9205H21.5446C19.3355 79.9205 17.5446 81.7113 17.5446 83.9205V92.7151Z" fill="#BEC0E7"/>
</svg>

                                                </div>
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