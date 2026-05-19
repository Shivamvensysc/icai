import React, { useState, useEffect, useRef } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaSearchPlus,
  FaSearchMinus,
  FaSearch,
  FaDownload,
  FaPrint,
  FaTimes,
} from "react-icons/fa";

import { Document, Page, pdfjs } from "react-pdf";

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
  const { id } = useParams();
  const navigate = useNavigate();
  const publication = publications.find((p) => p.id === parseInt(id));
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // PDF SUCCESS
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPdfError(false);
    setLoading(false);
  };

  // PDF ERROR
  const onDocumentLoadError = (error) => {
    console.error("PDF Load Error:", error);
    setPdfError(true);
    setLoading(false);
  };

  // NEXT PAGE
  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // PREV PAGE
  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  // ZOOM IN
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  // ZOOM OUT
  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  // FIT WIDTH
  const fitToWidth = () => {
    setScale(1.2);
  };

  // FIT PAGE
  const fitToPage = () => {
    setScale(0.8);
  };

  // SEARCH
  const handleSearch = () => {
    if (searchTerm.trim()) {
      setSearchResults([
        {
          page: 1,
          text: `Found "${searchTerm}" in document`,
        },
      ]);
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

  return (
    <div className="min-h-screen bg-[#0b1120] overflow-hidden select-none">
      {/* HEADER */}
      <div className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="px-4 py-3">
          {/* TOP BAR */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <Link
              to="/"
              className="hover:opacity-80 transition flex items-center gap-2"
            >
              <FaArrowLeft />
              Back to Portal
            </Link>

            <h2 className="font-semibold text-lg truncate flex-1 text-center">
              {publication.title}
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="hover:bg-white/20 px-3 py-2 rounded-lg transition"
              >
                <FaSearch />
              </button>

              <button
                onClick={handleDownload}
                className="hover:bg-white/20 px-3 py-2 rounded-lg transition"
              >
                <FaDownload />
              </button>

              <button
                onClick={handlePrint}
                className="hover:bg-white/20 px-3 py-2 rounded-lg transition"
              >
                <FaPrint />
              </button>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex flex-wrap justify-center items-center gap-3 mt-3 pt-3 border-t border-white/20">
            <button
              onClick={prevPage}
              disabled={pageNumber <= 1}
              className="hover:bg-white/20 disabled:opacity-50 px-4 py-2 rounded-lg transition"
            >
              <FaChevronLeft className="inline" />
              Prev
            </button>

            <span className="text-sm">
              Page {pageNumber} of {numPages || "?"}
            </span>

            <button
              onClick={nextPage}
              disabled={pageNumber >= numPages}
              className="hover:bg-white/20 disabled:opacity-50 px-4 py-2 rounded-lg transition"
            >
              Next <FaChevronRight className="inline" />
            </button>

            <div className="w-px h-6 bg-white/30 mx-2"></div>

            <button
              onClick={zoomOut}
              className="hover:bg-white/20 px-3 py-2 rounded-lg transition"
            >
              <FaSearchMinus />
            </button>

            <span className="text-sm min-w-[60px] text-center">
              {Math.round(scale * 100)}%
            </span>

            <button
              onClick={zoomIn}
              className="hover:bg-white/20 px-3 py-2 rounded-lg transition"
            >
              <FaSearchPlus />
            </button>

            <div className="w-px h-6 bg-white/30 mx-2"></div>

            <button
              onClick={fitToWidth}
              className="hover:bg-white/20 px-3 py-2 rounded-lg text-sm transition"
            >
              Fit Width
            </button>

            <button
              onClick={fitToPage}
              className="hover:bg-white/20 px-3 py-2 rounded-lg text-sm transition"
            >
              Fit Page
            </button>
          </div>

          {/* SEARCH */}
          {showSearch && (
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search within document..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900 outline-none"
                />

                <button
                  onClick={handleSearch}
                  className="bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold"
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
            </div>
          )}
        </div>
      </div>

      {/* PDF LAYOUT */}
      <div className="h-[calc(100vh-145px)] flex">
        {/* SIDEBAR */}
        <div className="hidden md:flex w-48 bg-[#111827] border-r border-gray-700 flex-col">
          <div className="p-3 border-b border-gray-700">
            <h3 className="text-white text-sm font-semibold text-center">
              Pages
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {!pdfError && (
              <Document
                file={publication.pdfUrl}
                loading={<p className="text-white text-center">Loading...</p>}
              >
                {numPages &&
                  Array.from(new Array(numPages), (el, index) => (
                    <div
                      key={`thumb_${index + 1}`}
                      ref={(el) => (thumbnailRefs.current[index] = el)}
                      onClick={() => setPageNumber(index + 1)}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition ${
                        pageNumber === index + 1
                          ? "border-blue-500"
                          : "border-transparent hover:border-gray-500"
                      }`}
                    >
                      <Page
                        pageNumber={index + 1}
                        width={140}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />

                      <div className="bg-gray-900 text-white text-xs text-center py-1">
                        Page {index + 1}
                      </div>
                    </div>
                  ))}
              </Document>
            )}
          </div>
        </div>

        {/* MAIN PDF */}
        <div className="flex-1 overflow-auto bg-[#0f172a] p-6">
          <div className="flex justify-center">
            <div className="bg-gray-800 p-4 rounded-2xl shadow-2xl">
              <Document
                file={publication.pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
              >
                {!pdfError && (
                  <div
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    <Page
                      pageNumber={pageNumber}
                      scale={scale}
                      className="shadow-2xl"
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                )}
              </Document>

              {/* ERROR */}
              {pdfError && (
                <div className="flex items-center justify-center h-96 w-[600px]">
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
      </div>

      {/* FOOTER */}
      <div className="fixed bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        🔒 DRM Protected
      </div>
    </div>
  );
};

export default ReaderPage;
