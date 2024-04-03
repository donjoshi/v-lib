import React from "react";
import NavbarMain from "../../components/navbar-main";
import "./styles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function UserSearch() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [text_area, setText_area] = useState('');
    const [genre, setGenre] = useState('');

    const navigate = useNavigate();



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
                    'Origin': 'http://192.168.1.75:8000' // Replace with your React app's origin
                },
                // redirect: 'follow'
            };



            const response = await fetch("http://192.168.1.75:8000/findBook", requestOptions1)


            const data = await response.json();
            // navigate("/upload-success")
            console.log(data);

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
            setError('Error submitting form.');
            <h1>Error Occurred</h1>

            setLoading(false); // Reset loading state

        }


    }




    return (

        <div className="MainContainer">
            <div>
                <NavbarMain />
            </div>

            <div className="container4">
                <h1 className="Hero-header">Get contextual results</h1>

                <div className="search-space">
                    <form onSubmit={handleOnSubmit}>
                        <div className="search-space-1">
                            <div className="content">
                                
                                <textarea className="text-area" placeholder="Paste your content" onChange={e => setText_area(e.target.value)}></textarea>
                            </div>
                            <div className="genre">
                                <label htmlFor="genre">Genre</label>
                                <input className="genre-input" type="text" placeholder="Type genres you are searching for(optional)" onChange={e => setGenre(e.target.value)} />
                            </div>

                            <div className="search-space-2">
                                <button type="submit" disabled={loading}>
                                <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18Z" stroke="white" stroke-width="2"/>
<path d="M20 20L17 17" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>

                                    {loading ? "Searching...." : "Search"}
                                </button>
                            </div>
                        </div>
                    </form>



                </div>
            </div>
        </div>

    )
}