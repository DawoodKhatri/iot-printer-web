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
    <div className="p-16 flex flex-col items-center bg-black border border-opacity-10 bg-opacity-5 rounded-xl shadow-5xl b  backdrop-filter backdrop-blur-sm overflow-hidden relative z-10">
      <h1 className="text-5xl md:text-7xl font-extrabold text-gradient bg-clip-text text-transparent mb-8">
        <span className="text-white drop-shadow-xl">IOT - Printer</span>
      </h1>
      {!file ? (
        <>
          <h3 className="text-xl text-white mb-6 drop-shadow-2xl">
            Upload your files here
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
          <div className="flex items-center p-4 rounded-lg border mb-6">
            <div className="mx-3 text-xl font-bold text-white drop-shadow-2xl">
              {file.name}
            </div>

            <button
              className="bg-red-500 text-white rounded-lg inline-flex items-center justify-center h-6 w-6 hover:bg-red-600"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
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
