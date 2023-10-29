import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "IoT-Printer",
  description: "Prints from anywhere",
};

export default function RootLayout({ children }) {
  const bgImages = [
    "https://www.iotinsider.com/wp-content/uploads/2023/01/IoT-Juniper-Research-5G-IoT-expansion-main-pr-Jan-23.png",
    "https://www.kmccontrols.com/wp-content/uploads/2023/03/Unlocking-the-Future-of-Smart-Buildings-with-IoT-and-Automation-Blog-Image-scaled.jpeg",
  ];

  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          className="bg-cover bg-center bg-no-repeat relative h-screen flex justify-center items-center"
          style={{
            backgroundImage: `url('${bgImages[1]}')`,
          }}
        >
          {children}
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            className:
              "!text-white !bg-black !border !bg-opacity-5 !rounded-xl !shadow-5xl !backdrop-filter !backdrop-blur-sm",
          }}
        />
      </body>
    </html>
  );
}
