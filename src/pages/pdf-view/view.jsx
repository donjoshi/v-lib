// import React from "react";
// import Navbar from "../../components/navbar";
// import NavbarMain from "../../components/navbar-main";
// import "./view.css";
// import { useLocation } from "react-router-dom";

// export default function PdfView() {
//     const location = useLocation();
//     const { pdfDataURL, bookDetails } = location.state || {};



//     return (
//         <div className="main-container">
//             <div>
//                 <NavbarMain />
//             </div>

//             <div className="one">
//                 <div className="back">
//                     back
//                     {pdfDataURL ? (
//                         <div className="pdf-container">
//                             {/* Assuming you're using react-pdf */}
//                             <iframe
//                                 src={pdfDataURL}
//                                 width="100%"
//                                 height="700px"
//                                 title="Book PDF"
//                             />
//                         </div>
//                     ) : (
//                         <div className="no-pdf">
//                             <h2>Couldn't retrieve PDF</h2>
//                             <p>There might be an issue fetching the PDF. Please try again.</p>
//                         </div>
//                     )}

//                 </div>

//                 <div className="pdf-view">
//                     <div className="pdf-file">
//                         view here
//                     </div>

//                     <div className="details">
//                         the details should be here
//                     </div>
//                 </div>
//             </div>

//         </div>
//     )
// }

import React from "react";
import Navbar from "../../components/navbar";
import NavbarMain from "../../components/navbar-main";
import "./view.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function PdfView() {
    const location = useLocation();
    const { pdfDataURL, bookDetails } = location.state || {};

    const [isLoading, setIsLoading] = useState(false);
    const [downloadError, setDownloadError] = useState(null);

    const handleDownloadClick = async () => {
        if (pdfDataURL) {
            setIsLoading(true);

            const filename = `book-${bookDetails?.id || "unknown"}.pdf`;

            try {
                const response = await fetch(pdfDataURL, {
                    method: "GET",
                    responseType: "blob",
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = url;
                    link.download = filename;
                    link.click();

                    window.URL.revokeObjectURL(url);
                } else {
                    throw new Error("Failed to download PDF");
                }
            } catch (error) {
                setDownloadError(error.message);
                console.error("Download error:", error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="main-container">
            <div className="nav-container">
                <NavbarMain />
            </div>

            <div className="pdf-view-container">
                <div className="pdf-preview">
                    {pdfDataURL ? (
            <iframe
              src={pdfDataURL}
              width="60%"
              height="100%" // Adjust height as needed
              title="Book PDF Preview"
            />
          ) : (
            <div className="no-preview">
              <h2>No PDF Preview Available</h2>
              <p>The PDF preview could not be loaded.</p>
            </div>
          )}
                   
                </div>

                <div className="pdf-details">
                    {pdfDataURL ? (
                        <div>
                            {isLoading && <p>Downloading PDF...</p>}
                            {downloadError && <p>Error downloading PDF: {downloadError}</p>}

                            <button type="button" onClick={handleDownloadClick} disabled={isLoading}>
                                Download PDF
                            </button>

                            <div className="book-details">
                                <h2>Book Details</h2>
                                <ul>
                                    <li>ID: {bookDetails?.id || "NA"}</li>
                                    <li>Title: {bookDetails?.title || "NA"}</li>
                                    <li>Author: {bookDetails?.author || "NA"}</li>
                                    {/* Add other details as needed */}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="no-pdf">
                            <h2>Couldn't retrieve PDF</h2>
                            <p>There might be an issue fetching the PDF. Please try again.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
