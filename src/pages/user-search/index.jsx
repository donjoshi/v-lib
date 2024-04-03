import React from "react";
import NavbarMain from "../../components/navbar-main";
import "./styles.css";


export default function UserSearch()
{

    return (

        <div className="main-container">
            <div className="navbar">
                <NavbarMain />
            </div>

            <div className="container4">
                <div className="text">Get contextual results</div>

                <div className="search-space">
                    <div className="search-space-1">
                        <div className="content">
                            <textarea class="text-area" placeholder="Paste your content"></textarea>
                        </div>
                        <div className="genre">
                            <label htmlFor="genre">Genre</label>
                            <input type="text" placeholder="Type genres you are searching for(optional)"/>
                        </div>
                    </div>

                    <div className="search-space-2">
                        <button>Search</button>
                    </div>

                </div>
            </div>
        </div>

    )
}