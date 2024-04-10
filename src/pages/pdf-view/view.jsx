
import React from "react";
import Navbar from "../../components/navbar";
import NavbarMain from "../../components/navbar-main";
import "./view.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { BlobProvider, Document, Page, pdfjs } from '@react-pdf/renderer';
import { useEffect, useRef } from "react";

import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';


export default function PdfView() {
    const location = useLocation();
    const { pdfDataURL, pdfData, bookDetails } = location.state || {};

    const [isLoading, setIsLoading] = useState(false);
    const [downloadError, setDownloadError] = useState(null);

    const [blobURL, setBlobURL] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfDocument, setPdfDocument] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    console.log(pdfDataURL.length)
    console.log("pdf data ", pdfData)
    console.log(pdfData.size)

    const pdfViewerRef = useRef(null);
    const [pdfBlobUrl, setPdfBlobUrl] = useState(null);




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
            });

            return () => {
                viewer.destroy();
            };
        }
    }, [pdfBlobUrl]);


    // useEffect(() => {
    //     const fetchPdf = async () => {
    //       if (pdf_url) {
    //         setIsLoading(true);
    //         try {
    //           const response = await fetch(pdf_url);

    //           console.log(response.url)
    //           if (response.ok) {
    //             const blob = await response.blob();
    //             const url = window.URL.createObjectURL(blob);
    //             setBlobURL(url);
    //             setPdfFile(url); // Set pdfFile for rendering
    //           } else {
    //             throw new Error("Failed to fetch PDF");
    //           }
    //         } catch (error) {
    //           console.error("Error fetching PDF:", error);
    //           setDownloadError(error.message);
    //         } finally {
    //           setIsLoading(false);
    //         }
    //       }
    //     };

    //     fetchPdf();
    //   }, [pdf_url]);




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
                <div className="pdf-preview" ref={pdfViewerRef} >

                    {/* {pdfFile && (
                        <Document file={pdfFile}>
                            <Page size="A4" />
                        </Document>
                    )}

                    {!pdfFile && (
                        <div className="no-preview">
                            <h2>No PDF Preview Available</h2>
                            <p>The PDF preview could not be loaded.</p>
                        </div>
                    )} */}

                    {pdfBlobUrl ? (
                        <embed src={pdfBlobUrl} type="application/pdf" width="60%" height="600px"/>
                    ) : (
                        <p>PDF data is missing.</p>
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
