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
    <main
      className="bg-cover bg-center bg-no-repeat relative h-screen flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://www.iotinsider.com/wp-content/uploads/2023/01/IoT-Juniper-Research-5G-IoT-expansion-main-pr-Jan-23.png')",
      }}
    >
      <div className="p-20 flex flex-col items-center bg-white border border-opacity-10 bg-opacity-5 rounded-lg shadow-5xl b  backdrop-filter backdrop-blur-lg overflow-hidden relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gradient bg-clip-text text-transparent mb-4">
          <span className="text-white">IOT - Printer</span>
        </h1>
        <h3 className="text-lg text-white mb-6">Upload your files here</h3>
        <div className="mb-4">
          <label htmlFor="file-upload" className="cursor-pointer">
            <input
              type="file"
              id="file-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleFile}
              className="hidden"
            />
            <div className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300">
              Choose a File
            </div>
          </label>
        </div>
        {file && (
          <>
            <div className="text-gray-700 mb-6">
              <span className="text-white font-bold mr-2">{file.name}</span>
              <button
                onClick={handleClearFile}
                className="bg-red-600 text-white p-2 rounded-md "
              >
                Clear
              </button>
            </div>
            <button
              className={`${
                file ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-400"
              } text-white px-4 py-2 rounded-md transition duration-300 cursor-pointer`}
              onClick={handlePrint}
              disabled={!file}
            >
              Print
            </button>
          </>
        )}
      </div>
      <style>
        {`
          main::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5); /* Adjust the alpha value to control opacity */
          }
        `}
      </style>
    </main>
  );
}
