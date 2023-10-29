"use client";
import { useState } from "react";

const AdminPage = () => {
  const [configType, setConfigType] = useState("aws-credentials");
  const tabActive = "";
  const tabInActive = "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    let fields = Object.fromEntries(new FormData(e.target).entries());
    fields["type"] = configType;

    let response = await fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(fields),
    });
    response = await response.json();

    if (response.success) {
      e.target.reset();
    } else {
      alert(response.message);
    }
  };
  return (
    <>
      <div className="mx-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 py-6 px-10 flex flex-col items-center bg-black border border-opacity-10 bg-opacity-5 rounded-xl shadow-5xl b  backdrop-filter backdrop-blur-sm max-h-[calc(100vh-2rem)] overflow-y-auto relative z-10">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-xl mb-6">
          SERVER CONFIG
        </h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex gap-8 mb-4">
            <button
              className={`text-white font-medium rounded-lg p-2 flex-1
               ${
                 configType === "aws-credentials"
                   ? "bg-orange-500 hover:bg-orange-600 border-none"
                   : "hover:bg-black hover:bg-opacity-20 border"
               } 
              transition-all duration-300`}
              onClick={() => setConfigType("aws-credentials")}
              type="button"
            >
              AWS Credentials
            </button>
            <button
              className={`text-white font-medium rounded-lg p-2 flex-1
               ${
                 configType === "aws-iot"
                   ? "bg-orange-500 hover:bg-orange-600 border-none"
                   : "hover:bg-black hover:bg-opacity-20 border"
               } 
              transition-all duration-300`}
              onClick={() => setConfigType("aws-iot")}
              type="button"
            >
              AWS IoT
            </button>
          </div>
          {configType === "aws-credentials" ? (
            <>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-white">
                  Access Key Id
                </label>
                <input
                  type="text"
                  name="accessKeyId"
                  className="bg-transparent border outline-none text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Enter Access Key Id"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-white">
                  Secret Access Key
                </label>
                <input
                  type="text"
                  name="secretAccessKey"
                  className="bg-transparent border outline-none text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Enter Secret Access Key"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-white">
                  Session Token
                </label>
                <input
                  type="text"
                  name="sessionToken"
                  className="bg-transparent border outline-none text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Enter Session Token"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-white">
                  Private Key
                </label>
                <textarea
                  rows={1}
                  name="privateKey"
                  className="bg-transparent border outline-none text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Enter Private Key"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-white">
                  Ca Cert
                </label>
                <textarea
                  rows={1}
                  name="caCert"
                  className="bg-transparent border outline-none text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Enter Ca Cert"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-white">
                  Client Cert
                </label>
                <textarea
                  rows={1}
                  name="clientCert"
                  className="bg-transparent border outline-none text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Enter Client Cert"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block mb-2 text-sm font-medium text-white">
                  Host
                </label>
                <input
                  type="text"
                  name="host"
                  className="bg-transparent border outline-none text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
                  placeholder="Enter Host"
                  required
                />
              </div>
            </>
          )}

          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium text-white">
              Admin password
            </label>
            <input
              type="password"
              name="password"
              className="bg-transparent border outline-none text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5"
              placeholder="Enter Password"
              required
            />
          </div>
          <button className="mt-4 w-full font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg h-10 transition-all duration-300">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminPage;
