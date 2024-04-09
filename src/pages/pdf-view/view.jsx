import React from "react";
import Navbar from "../../components/navbar";
import NavbarMain from "../../components/navbar-main";
import "./view.css";

export default function PdfView()
{
    return (
        <div className="main-container">
            <div>
                <NavbarMain />
            </div>

            <div className="one">
                <div className="back">
                    back
                </div>

                <div className="pdf-view">
                    <div className="pdf-file">
                        view here
                    </div>

                    <div className="details">
                        the details should be here
                    </div>
                </div>
            </div>

        </div>
    )
}