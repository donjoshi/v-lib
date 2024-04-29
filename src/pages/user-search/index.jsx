import React from "react";
import NavbarMain from "../../components/navbar-main";
import "./styles.css";
import "./style.css";
import { useState, CSSProperties, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IP_ADDRESS from "../consts";
import { BarLoader, CircleLoader, ClipLoader } from "react-spinners";



export default function UserSearch() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [text_area, setText_area] = useState('');
    const [genre, setGenre] = useState('');

    const navigate = useNavigate();

    const [backgroundFade, setBackgroundFade] = useState(false);

    const genre_list = [];



    async function handleOnSubmit(event) {
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

            // console.log("genre is :  ",data['genre']);
            genre_list.push(data['genre']);





            navigate("/results", {
                state: {
                    apiResponse: data,
                    textAreaValue: text_area,
                },
            });
        }

        catch (error) {
            console.error(error);
            setError('Error submitting form.');
            <h1>Error Occurred</h1>

            setLoading(false); // Reset loading state

        }

        finally {
            setLoading(false); // Reset loading state
        }


    }

    useEffect(() => {
        // Update background fade based on loading state
        setBackgroundFade(loading);
    }, [loading]);





    return (

        <div className={`MainContainer  ${backgroundFade ? "fade" : ""}`}>
            <div>
                <NavbarMain />
            </div>
            {
                        loading && (

                            <div className="overlay">


                                <div class="AnimationBox">
                                    <div class="star">
                                        <svg class="star1" width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_761_828)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0487 2.69824C12.2415 2.6984 10.4605 3.13073 8.85435 3.95917C7.24821 4.78761 5.86347 5.98813 4.81566 7.46058C3.76785 8.93303 3.08736 10.6347 2.83096 12.4236C2.57455 14.2126 2.74968 16.0369 3.34172 17.7444C3.93375 19.4518 4.92554 20.993 6.23433 22.2392C7.54311 23.4854 9.13095 24.4006 10.8654 24.9084C12.5998 25.4161 14.4305 25.5018 16.2047 25.1581C17.9789 24.8145 19.6453 24.0515 21.0647 22.9329L25.934 27.8022C26.1855 28.0451 26.5223 28.1795 26.8719 28.1765C27.2215 28.1734 27.5559 28.0332 27.8031 27.786C28.0503 27.5388 28.1905 27.2044 28.1936 26.8548C28.1966 26.5052 28.0622 26.1684 27.8193 25.9169L22.95 21.0476C24.2673 19.3764 25.0876 17.3681 25.3168 15.2525C25.5461 13.137 25.1751 10.9996 24.2463 9.08503C23.3175 7.17046 21.8685 5.55605 20.0651 4.42655C18.2616 3.29705 16.1766 2.6981 14.0487 2.69824ZM5.38201 14.0316C5.38201 11.733 6.2951 9.52863 7.92042 7.90332C9.54573 6.278 11.7501 5.36491 14.0487 5.36491C16.3472 5.36491 18.5516 6.278 20.1769 7.90332C21.8023 9.52863 22.7153 11.733 22.7153 14.0316C22.7153 16.3301 21.8023 18.5345 20.1769 20.1598C18.5516 21.7852 16.3472 22.6982 14.0487 22.6982C11.7501 22.6982 9.54573 21.7852 7.92042 20.1598C6.2951 18.5345 5.38201 16.3301 5.38201 14.0316Z" fill="#797DD5" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_761_828">
                                                    <rect width="32" height="32" fill="white" transform="translate(0.048584 0.0317383)" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </div>
                                    <div class="book"> <svg class="book" width="89" height="119" viewBox="0 0 89 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="10.5793" y="3.16602" width="75.2194" height="104.774" rx="5.5" stroke="#DAE2FF" stroke-width="5" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M74.6782 24.2559H8.07946V33.805H74.6782V24.2559ZM74.6781 47.0981H8.07935V56.6473H74.6781V47.0981ZM8.07935 69.9404H74.6781V79.4895H8.07935V69.9404ZM74.6781 92.7827H8.07935V102.332H74.6781V92.7827Z" fill="url(#paint0_linear_607_682)" />
                                        <rect x="0.808105" y="8.90625" width="79.2194" height="108.774" rx="7.5" fill="url(#paint1_linear_607_682)" stroke="#DAE2FF" />
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M74.6782 29.0294C74.6782 26.3925 72.5405 24.2549 69.9036 24.2549H12.854C10.2171 24.2549 8.07946 26.3925 8.07946 29.0294V29.0294C8.07946 31.6664 10.2171 33.804 12.854 33.804H69.9036C72.5405 33.804 74.6782 31.6664 74.6782 29.0294V29.0294ZM74.6781 51.8717C74.6781 49.2348 72.5404 47.0972 69.9035 47.0972H12.8539C10.217 47.0972 8.07935 49.2348 8.07935 51.8717V51.8717C8.07935 54.5086 10.217 56.6463 12.8539 56.6463H69.9035C72.5404 56.6463 74.6781 54.5086 74.6781 51.8717V51.8717ZM8.07935 74.714C8.07935 72.0771 10.217 69.9394 12.8539 69.9394H69.9035C72.5404 69.9394 74.6781 72.0771 74.6781 74.714V74.714C74.6781 77.3509 72.5404 79.4886 69.9035 79.4886H12.8539C10.217 79.4886 8.07935 77.3509 8.07935 74.714V74.714ZM74.6781 97.5563C74.6781 94.9194 72.5404 92.7817 69.9035 92.7817H12.8539C10.217 92.7817 8.07935 94.9194 8.07935 97.5563V97.5563C8.07935 100.193 10.217 102.331 12.8539 102.331H69.9035C72.5404 102.331 74.6781 100.193 74.6781 97.5563V97.5563Z" fill="url(#paint2_linear_607_682)" />
                                        <defs>
                                            <linearGradient id="paint0_linear_607_682" x1="8.07935" y1="102.727" x2="74.6781" y2="102.727" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#EFEFFF" />
                                                <stop offset="1" stop-color="#D3D2FF" />
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_607_682" x1="40.4178" y1="8.40625" x2="40.4178" y2="118.18" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#7073CA" />
                                                <stop offset="1" stop-color="#8487E2" />
                                            </linearGradient>
                                            <linearGradient id="paint2_linear_607_682" x1="8.07935" y1="102.726" x2="74.6781" y2="102.726" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#EFEFFF" />
                                                <stop offset="1" stop-color="#D3D2FF" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    </div>
                                    <div class="star down">
                                        <svg class="star2" width="19" height="19" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_761_828)">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0487 2.69824C12.2415 2.6984 10.4605 3.13073 8.85435 3.95917C7.24821 4.78761 5.86347 5.98813 4.81566 7.46058C3.76785 8.93303 3.08736 10.6347 2.83096 12.4236C2.57455 14.2126 2.74968 16.0369 3.34172 17.7444C3.93375 19.4518 4.92554 20.993 6.23433 22.2392C7.54311 23.4854 9.13095 24.4006 10.8654 24.9084C12.5998 25.4161 14.4305 25.5018 16.2047 25.1581C17.9789 24.8145 19.6453 24.0515 21.0647 22.9329L25.934 27.8022C26.1855 28.0451 26.5223 28.1795 26.8719 28.1765C27.2215 28.1734 27.5559 28.0332 27.8031 27.786C28.0503 27.5388 28.1905 27.2044 28.1936 26.8548C28.1966 26.5052 28.0622 26.1684 27.8193 25.9169L22.95 21.0476C24.2673 19.3764 25.0876 17.3681 25.3168 15.2525C25.5461 13.137 25.1751 10.9996 24.2463 9.08503C23.3175 7.17046 21.8685 5.55605 20.0651 4.42655C18.2616 3.29705 16.1766 2.6981 14.0487 2.69824ZM5.38201 14.0316C5.38201 11.733 6.2951 9.52863 7.92042 7.90332C9.54573 6.278 11.7501 5.36491 14.0487 5.36491C16.3472 5.36491 18.5516 6.278 20.1769 7.90332C21.8023 9.52863 22.7153 11.733 22.7153 14.0316C22.7153 16.3301 21.8023 18.5345 20.1769 20.1598C18.5516 21.7852 16.3472 22.6982 14.0487 22.6982C11.7501 22.6982 9.54573 21.7852 7.92042 20.1598C6.2951 18.5345 5.38201 16.3301 5.38201 14.0316Z" fill="#797DD5" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_761_828">
                                                    <rect width="32" height="32" fill="white" transform="translate(0.048584 0.0317383)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>
                                </div>

                            </div>


                        )
                    }

            <div className="container4">
                <h1 className="Hero-header">No more keywords.<br></br>
                    Search whatever you like.</h1>

                <div className="search-space">
                    <form onSubmit={handleOnSubmit}>
                        <div className="search-space-1">
                            <div className="content">
                                <svg className="searchIcon" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.328613" width="32" height="32" rx="16" fill="#6C70BF" />
                                    <path d="M15.3286 22C19.1946 22 22.3286 18.866 22.3286 15C22.3286 11.134 19.1946 8 15.3286 8C11.4626 8 8.32861 11.134 8.32861 15C8.32861 18.866 11.4626 22 15.3286 22Z" stroke="white" stroke-width="2" />
                                    <path d="M24.3286 24L21.3286 21" stroke="white" stroke-width="2" stroke-linecap="round" />
                                </svg>
                                <textarea className="text-area" placeholder="I want to know more about Artificial Intelligence..." onChange={e => setText_area(e.target.value)}></textarea>
                            </div>
                            {/* <div className="genre">
                                <label htmlFor="genre">Genre</label>
                                <input className="genre-input" type="text" placeholder="Type genres you are searching for(optional)" onChange={e => setGenre(e.target.value)} />
                            </div> */}

                            <div className="search-space-2">
                                <button className="primary" type="submit" disabled={loading}>

                                    {loading ? "Searching" : "Search"}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* {loading && ( // Render spinner if loading state is true
                        <div className="overlay">    
                            <div className="spinner-container">
                                <ClipLoader color="#6C70BF" loading={loading} size={35}  aria-label="Loading Spinner" data-testid="loader" />
                            </div>
                        </div>
                    )} */}
                </div>
            </div>

        </div>

    )
}