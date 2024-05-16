import React from "react";
import NavbarMain from "../../components/navbar-main";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./results.css";
import { useState } from "react";
import { navigate } from "react-router-dom";
import { Document, Page } from '@react-pdf/renderer';
import IP_ADDRESS from "../consts";
import { useEffect } from "react";
import { BarLoader, CircleLoader, ClipLoader, BeatLoader, RotateLoader, ScaleLoader, HashLoader } from "react-spinners";
import Typewriter from 'typewriter-effect';


export default function Results() {
    const location = useLocation();

    const { apiResponse, textAreaValue } = location.state || {};

    const [text_area, setText_area] = useState(textAreaValue);


    
    const [isFocused, setIsFocused] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState(false);
    const [allBooks, setallBooks] = useState([]);


    const [selectedGenres, setSelectedGenres] = useState([]);
    const [startYear, setStartYear] = useState(1970);
    const [endYear, setEndYear] = useState(2024);

    const [summary, setSummary] = useState('');
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [showText, setShowText] = useState(false);


    const [isTyping, setIsTyping] = useState(false); // Initially not typing

    console.log("api response is ", apiResponse);

    useEffect(() => {
        if (loadingSummary) {
            // Reset states on loading start
            setIsTyping(false);
            setShowText(false);
        } else if (summary) {
            // Trigger animation only once
            setIsTyping(true);
            const timeout = setTimeout(() => {
                setIsTyping(false); // Set isTyping to false after animation
                setShowText(true); // Show static text after timeout
            }, 30 * summary.length);
            return () => clearTimeout(timeout);
        }
    }, [loadingSummary, summary]);


    // console.log("text area value is ", summary);



    // Fetch genre list from an API
    useEffect(() => {
        const fetchGenreList = async () => {

            setGenreList(apiResponse['genre']);
            setallBooks(apiResponse.result);
        };

        fetchGenreList();
    }, [textAreaValue]);

    let filteredBooks = allBooks;


    const [genreList, setGenreList] = useState([]);

    const handleGenreChange = (event) => {
        const genre = event.target.value;

        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres([...selectedGenres, genre]);
        }



    };

    const handleStartYearChange = (event) => {
        setStartYear(parseInt(event.target.value));
    };

    const handleEndYearChange = (event) => {
        setEndYear(parseInt(event.target.value));
    };


    // Filter the books based on the selected genre and publishing year range
    filteredBooks = filteredBooks.filter((book) => {

        if (selectedGenres.length === 0) {

            const bookYear = parseInt(book[3].slice(0, 4));
            // const isBookInSelectedGenres = (bookYear >= startYear &&  bookYear <= endYear) ? book : '';
            // return isBookInSelectedGenres;
            if (bookYear >= startYear && bookYear <= endYear) {
                return book;
            }

        }

        const bookGenres = book[6]?.split(",") || [];
        const bookYear = parseInt(book[3].slice(0, 4));
        const isBookInSelectedGenres =
            ((bookYear >= startYear &&
                bookYear <= endYear) ?
                bookGenres.every((g) => selectedGenres.includes(g)) : "");
        return isBookInSelectedGenres;
    });


    const navigate = useNavigate();

    async function handleButtonClick(event) {
        event.preventDefault(); // Prevent default form submission



        setLoading(true); // Set loading state

        const formData = new FormData();

        try {
            formData.append('query', text_area);
            // formData.append('genre', genre);


            var requestOptions1 = {
                method: 'POST',
                body: formData,
                headers: {

                    'Origin': `${IP_ADDRESS}` // Replace with your React app's origin

                },
                // redirect: 'follow'
            };


            const response = await fetch(`${IP_ADDRESS}/findBook/querySearch`, requestOptions1)

            const data = await response.json();
            // navigate("/upload-success")
            console.log(data);



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
            // setLoading(false); // Reset loading state
        }
        finally {
            setLoading(false); // Reset loading state
        }
    }


    async function handleTitleClick(bookId, title, author, pdf_url) { // Use bookId instead of location
        try {
            console.log(bookId);

            const formData = new FormData();
            formData.append('id', bookId);

            var requestOptions = {
                method: 'POST',
                body: formData,
                headers: {

                    'Origin': `${IP_ADDRESS}`, // Replace with your React app's origin

                },
                // redirect: 'follow'
            };


            const response = await fetch(`${IP_ADDRESS}/findBook/getPDF`, requestOptions)


            if (!response.ok) {
                throw new Error("Failed to fetch PDF"); // Handle errors gracefully
            }
            const pdfData = await response.blob();


            const reader = new FileReader();
            reader.readAsDataURL(pdfData); // Read the PDF data as a data URL


            reader.onload = function (event) {
                const pdfDataURL = event.target.result; // Get the data URL


                navigate("/view-pdf", {
                    state: {
                        apiResponse,
                        pdfDataURL,
                        pdfData,
                        bookDetails: {
                            id: bookId, // Include book ID in details
                            // title: apiResponse.result[bookId][1], // Assuming title is at index 1
                            // author: apiResponse.result[bookId][2], // Assuming author is at index 2
                            // ... Add other details as needed
                            title: title,
                            author: author,
                        },


                    },
                });
            }

            reader.onerror = function (error) {
                console.error("Error reading PDF:", error);
                // Handle errors gracefully
            };
        } catch (error) {
            console.error(error);
            // Handle errors, e.g., display an error message
        }
    }


    async function handleSummary() {

        if (apiResponse['answer']) {
            setLoadingSummary(false);
            setSummary(apiResponse['answer']);

        }

        else {
            try {

                setLoadingSummary(true); // Set loading state

                const formData = new FormData();
                formData.append('id', apiResponse['result'][0][0]);
                formData.append('query', apiResponse['query']);
                formData.append('keywords_query', apiResponse['keywords_query'])


                var requestOptions2 = {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Origin': `${IP_ADDRESS}`,
                    },

                };

                const response1 = await fetch(`${IP_ADDRESS}/findBook/getSummary`, requestOptions2)

                if (!response1.ok) {
                    throw new Error("failed"); // Handle errors gracefully
                }

                console.log(response1)

                const data1 = await response1.json();

                setSummary(data1['answer']);
                console.log("summary details :" ,data1);
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setLoadingSummary(false); // Reset loading state
            }
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
                        <rect x="0.328613" width="32" height="32" rx="16" fill="#6C70BF" />
                        <path d="M15.3286 22C19.1946 22 22.3286 18.866 22.3286 15C22.3286 11.134 19.1946 8 15.3286 8C11.4626 8 8.32861 11.134 8.32861 15C8.32861 18.866 11.4626 22 15.3286 22Z" stroke="white" stroke-width="2" />
                        <path d="M24.3286 24L21.3286 21" stroke="white" stroke-width="2" stroke-linecap="round" />
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

                    {
                        loading && (
                            <ScaleLoader color="#424587" size={100} />
                        )
                    }

                </div>
                <div className="search-space-2">
                    <button type="submit" disabled={loading} onClick={handleButtonClick}>

                        {loading ? "Searching" : "Search"}
                    </button>

                </div>
            </div>
            </div>

            <div className="container-result">
                <div className="filter">
                    <span className="Filter-Header">Filter</span>
                    <div className="filtercontent">



                        <div className="genre-filter">
                            <span className="genre-label">Genre:</span>
                            {genreList.map((genre) => (
                                <div key={genre} className="genre-checkbox" onClick={() => setFiltered(true)}>
                                    <input className="genre-items"
                                        type="checkbox"
                                        value={genre}
                                        checked={selectedGenres.includes(genre)}
                                        onChange={handleGenreChange}
                                    />
                                    <label htmlFor={genre}>{genre}</label>
                                </div>
                            ))}
                        </div>
                        <div className="year-filter">
                            <span className="year-label">Publishing Year:</span>
                            <div className="year-input"><input
                                type="number"
                                value={startYear}
                                min={1970}
                                max={endYear}
                                onChange={handleStartYearChange}
                            />
                                <span> - </span>
                                <input
                                    type="number"
                                    value={endYear}
                                    min={startYear}
                                    max={2024}
                                    onChange={handleEndYearChange}
                                /></div>
                        </div>







                    </div>
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
                                                <span className="Title-name" onClick={() => handleTitleClick(item[0],item[1],item[2],item[5])}>{item[1]}</span>
                                                <span className="Author-name">{item[2]}</span>
                                                <span className="Doc-type">{item[4]}</span>
                                                <span className="year-of-publish">{item[3]}</span>

                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        </div>
                    </div>
                </div>

                <div className="get-summary">
                    <span className="gts-title">Want a quick answer ?</span>
                    <span className="gts-subtitle">Get quick answerss for your queries in seconds</span>
                    <button className="button-glow btn"  onClick={handleSummary}>

                        {loadingSummary ? "Generating" : "Generate Answer"}
                        
                        {
                        loadingSummary &&
                        (
                            <div className="loading">
                                <HashLoader color="#8487E2" size={"25"} />
                            </div>)
                    }



                    </button>

                    <div className="answer">
                        {/* {summary} */}


                        {
                            showText && (
                                <div className="summary-text">
                                    {summary}
                                </div>
                            )
                        }

                        {isTyping && ( // Display summary only if available
                            <Typewriter
                                options={{
                                    autoStart: true, // Start animation only when isTyping is true
                                    delay: 20,
                                    strings: [summary],
                                    cursor: "",
                                    loop: 0, // Set loop to 0 to disable looping
                                }}
                            />
                        )
                        }



                    </div>

                    {/* {
                        loadingSummary &&
                        (
                            <div className="loading">
                                <BeatLoader color="#424587" />
                            </div>)
                    }
 */}



                </div>



            </div>
        </div>

    
    );
}