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

  const handlePrint = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/print", {
      method: "POST",
      body: formData,
    });
  };
  return (
    <main>
      <div className="p-5">
        <h1 className="text-center text-6xl font-bold">Iot - Printer</h1>
    <h3>upload your files here</h3>
      </div>
      <div className="p-5 text-center">
        <input type="file" onChange={handleFile} />
        <p className="my-5">{file ? file.name : "No file selected"}</p>
        <button
          className="bg-orange-500 text-white px-3 py-1 rounded-md"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </main>
  );
}
