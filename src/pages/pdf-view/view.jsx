
import React from "react";
import Navbar from "../../components/navbar";
import NavbarMain from "../../components/navbar-main";
import "./view.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Page, Text, View, Document, PDFViewer, StyleSheet } from '@react-pdf/renderer';
import { usePdf } from '@mikecousins/react-pdf';

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import { useHistory } from 'react-router-dom';
import IP_ADDRESS from "../consts";
import { BeatLoader } from "react-spinners";

import { saveAs } from "file-saver"; // Import file-saver library



import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';
import { type } from "@testing-library/user-event/dist/type";


export default function PdfView() {
    const history = useNavigate();
    const location = useLocation();
    const { apiResponse, pdfDataURL, pdfData, bookDetails } = location.state || {};

    const [isLoading, setIsLoading] = useState(false);
    const [downloadError, setDownloadError] = useState(null);


    const pdfViewerRef = useRef(null);
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(false);

    const [imageUrl, setImageUrl] = useState(null);
    const [summary, setSummary] = useState(null);




    useEffect(() => {
        const fetchPdf = async () => {
            if (pdfData) {
                setIsLoading(true);
                try {
                    // Convert binary data to Blob object
                    const blob = new Blob([pdfData], { type: 'application/pdf' });

                    // Generate Blob URL
                    const blobUrl = URL.createObjectURL(blob);
                    setPdfBlobUrl(blobUrl);
                    console.log("blob url : ", blobUrl)


                } catch (error) {
                    console.error('Error fetching PDF:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchPdf();

        // Clean up Blob URL when component unmounts
        return () => {
            if (pdfBlobUrl) {
                URL.revokeObjectURL(pdfBlobUrl);
            }
        };
    }, [pdfData]);

    useEffect(() => {

        if (pdfBlobUrl && pdfViewerRef.current) {
            // Render PDF using Viewer.js
            const viewer = new Viewer(pdfViewerRef.current, {
                url: pdfBlobUrl,
                viewed() {
                    console.log("Done viewing")
                    viewer.view(5);
                    viewer.rotate(180);
                },
            });
            viewer.rotate(180); // Show the first page by default

            return () => {
                viewer.destroy();
            };
        }
    }, [pdfBlobUrl]);

    // useEffect(() => {
    //     const handleDownload = async () => {
    //       if (pdfDataURL) {
    //         setIsLoading(true);

    //         const filename = `book-${bookDetails?.title || "unknown"}.pdf`;

    //         try {
    //           const response = await fetch(pdfDataURL, {
    //             method: "GET",
    //             responseType: "blob",
    //           });

    //           if (response.ok) {
    //             const blob = await response.blob();
    //             saveAs(blob, filename); // Use file-saver to save the PDF
    //           } else {
    //             throw new Error("Failed to download PDF");
    //           }
    //         } catch (error) {
    //           setDownloadError(error.message);
    //           console.error("Download error:", error);
    //         } finally {
    //           setIsLoading(false);
    //         }
    //       }
    //     };

    //     // Trigger the download on component mount
    //     handleDownload();
    //   },);


    const handleDownloadClick = async () => {
        if (pdfDataURL) {
            setIsLoading(true);

            const filename = `book-${bookDetails?.title || "unknown"}.pdf`;

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


    const handleBack = () => {
        history(-1); // Use useHistory to navigate back
    };


    async function handleSummary() {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append('id', bookDetails['id']);
            formData.append('query', apiResponse['query']);
            formData.append('keywords_query', apiResponse['keywords_query'])
            formData.append('want_pages', 1)

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

            const data2 = await response1.json();
            console.log("data is ", data2)

            if (!data2.image_list) {
                console.error("Missing image data in API response");
                return; // Handle missing image data gracefully
            }


            const images = data2.image_list; // Assuming data2.image_list is an array of base64 strings
            const imageUrls = images.map((image) => {
                let format = null; // Assuming format information is not provided by the API

                if (image.startsWith('data:image/')) {
                    format = image.split('/')[1].split(';')[0]; // Extract format if available in data URL
                } else {
                    console.warn("Unable to determine image format for an image");
                }

                return `data:${format || 'image/jpeg'};base64,${image}`;
            });

            setImageUrl(imageUrls); // Update state with an array of image URLs

            setSummary(data2['answer'])

            setPages(data2['pages'])




        }
        catch (e) {
            console.log("error occured : ", e)
        }

        finally {
            setLoading(false);
        }


    }

    console.log("pdf data url : ", pdfBlobUrl)

    const [page, setPage] = useState(1);
    const canvasRef = useRef(null);


    // const { pdfDocument, pdfPage } = usePdf({
    //     file: 'test.pdf',
    //     page,
    //     canvasRef,
    // });
    //const { pdfDocument, pdfPage } = usePdf({ canvasRef, file: pdfBlobUrl, page });
    const pageMessage = "Please refer to the following pages: ";
    return (
        <div className="main-container-pdfview">
            <div className="nav-container">
                <NavbarMain />
            </div>
            {/* <div>
                <PDFViewer style={{ width: '50%', height: '100vh' }}>
                    {!pdfDocument && <span>Loading...</span>}
                    <canvas ref={canvasRef} />
                    {Boolean(pdfDocument && pdfDocument.numPages) && (
                        <nav>
                            <ul className="pager">
                                <li className="previous">
                                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                                        Previous
                                    </button>
                                </li>
                                <li className="next">
                                    <button
                                        disabled={page === pdfDocument.numPages}
                                        onClick={() => setPage(page + 1)}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </PDFViewer>
            </div> */}

            <div className="back-btn" onClick={handleBack}>
                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.55663 16.6667L17.2793 24.3894L16.3286 25.3334L6.9953 16.0001L16.3286 6.66675L17.2793 7.61075L9.55663 15.3334H25.662V16.6667H9.55663Z" fill="#2C2D3C" />
                </svg>

                <span>Back</span>
            </div>
            <div className="pdf-view-container">
                <div className="pdf-preview"  >


                    {pdfBlobUrl ? (
                        <embed ref={pdfViewerRef} className="embed-pdf" src={pdfBlobUrl} type="application/pdf" width="60%" height="600px" />
                    ) : (
                        <p>PDF data is missing.</p>
                    )}




                </div>

                <div className="side-box">
                    <div className="pdf-details">
                        {pdfDataURL ? (
                            <div className="details">
                                {isLoading && <p>Downloading PDF...</p>}
                                {downloadError && <p>Error downloading PDF: {downloadError}</p>}



                                <div className="book-details">

                                    <ul>
                                        {/* <li>ID: {bookDetails?.id || "NA"}</li> */}
                                        <li className="Title-book"> {bookDetails?.title || "NA"}</li>
                                        <li className="author">{bookDetails?.author || "NA"}</li>
                                        {/* Add other details as needed */}
                                    </ul>
                                </div>
                                <button className="primary btn" type="button" onClick={handleDownloadClick} disabled={isLoading}>
                                    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.3286 22.0002V5.00024M9.32861 16.0002L16.3286 23.0002L23.3286 16.0002M9.32861 27.0002H23.3286" stroke="#FCFDFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Download PDF
                                </button>
                            </div>
                        ) : (
                            <div className="no-pdf">
                                <h2>Couldn't retrieve PDF</h2>
                                <p>There might be an issue fetching the PDF. Please try again.</p>
                            </div>
                        )}

                        {/* <div>
                        {imageUrl && <img src={imageUrl} height={"500px"} alt="Image from API" />}
                    </div> */}




                    </div>




                    <div className="summary-section">
                        <span className="section-tt">Get answer from this book</span>
                        <span className="section-subtt">You can generate specific answer from this book for your query</span>
                        <button className="button-glow btn" onClick={handleSummary}>

                            {loading ? "Generating answer..." : "Get answer"}
                            {
                                loading && <BeatLoader color="#424587" size={7} />
                            }


                        </button>


                        <div className="pages">
                            {pages.length != 0 && <p>Please refer to the following page numbers:<span>&nbsp;</span></p>}
                            {pages.map((page, index) => (
                                <div key={index} className="page">
                                    {index == pages.length - 1 ? <p>{page}</p> : <p>{page}, </p>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {summary && (<div className="summary">
                        <p>{summary}</p>
                    </div>)}
                </div>

            </div>

            {imageUrl && (
                <div className="images-container">
                    {imageUrl.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} height={"800px"} width={"500px"} alt={`Image from API ${index + 1}`} />
                    ))}
                </div>
            )}
        </div>
    );
}


