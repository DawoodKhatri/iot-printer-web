"use client";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState();

  const handleFile = async ({
    target: {
      files: [file],
    },
  }) => {
    setFile(file);
  };

  const handleClearFile = () => {
    setFile(null);
  };

  const handlePrint = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/print", {
      method: "POST",
      body: formData,
    });
  };
  return (
    <div className="mx-4 p-8 md:p-12 text-center flex flex-col items-center bg-black border border-opacity-10 bg-opacity-5 rounded-xl shadow-5xl backdrop-filter backdrop-blur-sm max-h-[calc(100vh-2rem)] overflow-hidden relative z-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gradient bg-clip-text text-transparent mb-8">
        <span className="text-white drop-shadow-xl">IOT - Printer</span>
      </h1>
      {!file ? (
        <>
          <h3 className="text-md md:text-xl text-white mb-6 drop-shadow-2xl">
            Upload your file here
          </h3>
          <div>
            <label htmlFor="file-upload" className="w-fit cursor-pointer">
              <input
                type="file"
                id="file-upload"
                accept=".pdf"
                onChange={handleFile}
                className="hidden"
              />
              <div className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
                Choose a File
              </div>
            </label>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-full flex flex-col sm:flex-row items-center p-4 rounded-lg border mb-6">
            <div className="mb-3 sm:mb-0 sm:mx-3 max-w-full text-md md:text-xl font-bold text-white truncate drop-shadow-2xl">
              {file.name}
            </div>

            <button
              className="bg-red-500 text-white rounded-lg inline-flex items-center justify-center px-3 py-1 sm:p-2 hover:bg-red-600"
              onClick={handleClearFile}
            >
              <svg
                className="w-2 h-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="text-sm ml-2 sm:hidden">Cancel</span>
            </button>
          </div>

          <button
            className={`${
              file ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-400"
            } text-white px-4 py-2 rounded-md transition duration-300`}
            onClick={handlePrint}
            disabled={!file}
          >
            Print
          </button>
        </>
      )}
    </div>
  );
}
