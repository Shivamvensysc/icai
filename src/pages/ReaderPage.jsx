import React, { useState, useEffect, useRef } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaSearchPlus,
  FaSearchMinus,
  FaSearch,
  FaDownload,
  FaPrint,
  FaTimes,
} from "react-icons/fa";

import { Document, Page, pdfjs } from "react-pdf";

import HTMLFlipBook from "react-pageflip";

import { publications } from "../data/publications";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// PDF WORKER
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const ReaderPage = () => {
  const thumbnailRefs = useRef([]);

  const flipBookRef = useRef(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const publication = publications.find((p) => p.id === parseInt(id));

  const [numPages, setNumPages] = useState(null);

  const [pageNumber, setPageNumber] = useState(1);

  // DEFAULT ZOOM
  const [scale, setScale] = useState(0.9);

  const [searchTerm, setSearchTerm] = useState("");

  const [showSearch, setShowSearch] = useState(false);

  const [pdfError, setPdfError] = useState(false);

  // AUTO SCROLL SIDEBAR
  useEffect(() => {
    const currentThumbnail = thumbnailRefs.current[pageNumber - 1];

    if (currentThumbnail) {
      currentThumbnail.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [pageNumber]);

  // CHECK PUBLICATION
  useEffect(() => {
    if (!publication) {
      navigate("/");
    }
  }, [publication, navigate]);

  // DISABLE RIGHT CLICK
  const disableContextMenu = (e) => {
    e.preventDefault();
  };

  // DISABLE COPY SHORTCUTS
  const disableCopy = (e) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      ["c", "u", "s", "p"].includes(e.key.toLowerCase())
    ) {
      e.preventDefault();
    }

    if (e.key === "PrintScreen") {
      e.preventDefault();
    }
  };

  // ADD EVENTS
  useEffect(() => {
    document.addEventListener("contextmenu", disableContextMenu);

    document.addEventListener("keydown", disableCopy);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);

      document.removeEventListener("keydown", disableCopy);
    };
  }, []);

  // PDF SUCCESS
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);

    setPdfError(false);
  };

  // PDF ERROR
  const onDocumentLoadError = (error) => {
    console.error("PDF Load Error:", error);

    setPdfError(true);
  };

  // ZOOM IN
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 1.5));
  };

  // ZOOM OUT
  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.6));
  };

  // FIT PAGE
  const fitToPage = () => {
    setScale(0.9);
  };

  // SEARCH
  const handleSearch = () => {
    if (searchTerm.trim()) {
      alert(`Search "${searchTerm}" functionality can be added`);
    }
  };

  // DOWNLOAD
  const handleDownload = () => {
    window.open(publication.pdfUrl, "_blank");
  };

  // PRINT
  const handlePrint = () => {
    window.print();
  };

  if (!publication) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl">Publication not found</p>

          <Link
            to="/"
            className="text-blue-400 hover:underline mt-4 inline-block"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  // RESPONSIVE WIDTH
  const bookWidth = Math.min(
    650,
    window.innerWidth - (window.innerWidth >= 768 ? 320 : 40),
  );

  const bookHeight = bookWidth * 1.3;

  const pdfWidth = Math.min(
    600,
    window.innerWidth - (window.innerWidth >= 768 ? 360 : 80),
  );

  return (
    <div className="min-h-screen bg-[#081225] overflow-hidden select-none">
      {/* HEADER */}
      <div className="bg-[#1e3a8a] text-white sticky top-0 z-50 shadow-lg">
        <div className="px-4 py-3">
          {/* TOP HEADER */}
          <div className="grid grid-cols-3 items-center">
            {/* LEFT SECTION */}
            <div className="flex items-center gap-4 min-w-0">
              <Link
                to="/"
                className="flex items-center gap-2 hover:opacity-80 whitespace-nowrap"
              >
                <FaArrowLeft />
                Back to Portal
              </Link>

              <h2 className="font-semibold text-lg truncate">
                {publication.title}
              </h2>
            </div>

            {/* CENTER TOOLBAR */}
            <div className="flex justify-center items-center gap-6">
              <button onClick={zoomOut} className="hover:text-gray-300">
                <FaSearchMinus />
              </button>

              <span>{Math.round(scale * 100)}%</span>

              <button onClick={zoomIn} className="hover:text-gray-300">
                <FaSearchPlus />
              </button>

              <div className="h-6 w-px bg-white/30"></div>

              <button onClick={fitToPage} className="hover:text-gray-300">
                Fit Page
              </button>

              <div className="h-6 w-px bg-white/30"></div>

              <span>
                Page {pageNumber} of {numPages || "?"}
              </span>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="hover:text-gray-300"
              >
                <FaSearch />
              </button>

              <button onClick={handleDownload} className="hover:text-gray-300">
                <FaDownload />
              </button>

              <button onClick={handlePrint} className="hover:text-gray-300">
                <FaPrint />
              </button>
            </div>
          </div>

          {/* SEARCH */}
          {showSearch && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="flex-1 px-4 py-2 rounded-lg text-black outline-none"
              />

              <button
                onClick={handleSearch}
                className="bg-white text-blue-900 px-4 py-2 rounded-lg"
              >
                Search
              </button>

              <button
                onClick={() => setShowSearch(false)}
                className="bg-white/20 px-4 py-2 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="h-[calc(100vh-10px)] flex">
        {/* SIDEBAR */}
        <div className="hidden md:flex w-40 bg-[#0f172a] border-r border-gray-700 flex-col">
          <div className="p-1 border-b border-gray-700">
            <h3 className="text-white text-center font-semibold">Pages</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-3 flex flex-col items-center">
            {!pdfError && (
              <Document file={publication.pdfUrl}>
                {numPages &&
                  Array.from(new Array(numPages), (el, index) => (
                    <div
                      key={`thumb_${index + 1}`}
                      ref={(el) => (thumbnailRefs.current[index] = el)}
                      onClick={() => {
                        setPageNumber(index + 1);

                        if (flipBookRef.current) {
                          flipBookRef.current.pageFlip().flip(index);
                        }
                      }}
                      className={`w-full max-w-[170px] cursor-pointer rounded-xl overflow-hidden border-2 transition ${
                        pageNumber === index + 1
                          ? "border-blue-500"
                          : "border-transparent hover:border-gray-500"
                      }`}
                    >
                      <Page
                        pageNumber={index + 1}
                        width={150}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />

                      <div className="bg-gray-900 text-white text-center py-2 text-sm">
                        Page {index + 1}
                      </div>
                    </div>
                  ))}
              </Document>
            )}
          </div>
        </div>

        {/* MAIN PDF */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#081225]">
          <div className="w-full flex justify-center items-start min-h-full  px-4">
            <Document
              file={publication.pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
            >
              {!pdfError && numPages && (
                <div
                  style={{
                    zoom: scale,
                  }}
                >
                  <HTMLFlipBook
                    ref={flipBookRef}
                    width={bookWidth}
                    height={bookHeight}
                    size="fixed"
                    minWidth={300}
                    maxWidth={650}
                    minHeight={400}
                    maxHeight={900}
                    drawShadow={true}
                    flippingTime={1000}
                    usePortrait={false}
                    startPage={0}
                    autoSize={false}
                    mobileScrollSupport={true}
                    maxShadowOpacity={0.6}
                    showCover={true}
                    className="shadow-2xl"
                    style={{
                      margin: "0 auto",
                    }}
                    onFlip={(e) => setPageNumber(e.data + 1)}
                  >
                    {Array.from(new Array(numPages), (el, index) => (
                      <div
                        key={`page_${index + 1}`}
                        className="bg-[#e5e5e5] flex items-center justify-center overflow-hidden"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Page
                          pageNumber={index + 1}
                          width={pdfWidth}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          loading={<div className="text-black">Loading...</div>}
                        />
                      </div>
                    ))}
                  </HTMLFlipBook>
                </div>
              )}
            </Document>

            {/* ERROR */}
            {pdfError && (
              <div className="flex items-center justify-center h-96 w-[700px] bg-gray-800 rounded-2xl">
                <div className="text-center text-white">
                  <div className="text-red-400 text-6xl mb-4">📄</div>

                  <p className="text-red-400 text-lg font-semibold">
                    Failed to load PDF
                  </p>

                  <button
                    onClick={handleDownload}
                    className="mt-4 bg-blue-900 px-4 py-2 rounded-lg"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-4 right-4 bg-black/70 text-white text-xs px-4 py-3 rounded-xl shadow-lg">
        🔒 DRM Protected
      </div>
    </div>
  );
};

export default ReaderPage;
