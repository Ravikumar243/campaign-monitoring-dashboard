import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard",
  description: "Next.js Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex">

      <Sidebar/>
      
        <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
          <nav className="w-full bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Hello, Ravi</span>
              <img
                src="https://i.pravatar.cc/40"
                alt="user"
                className="w-10 h-10 rounded-full"
              />
            </div>
          </nav>

          <main className="p-8">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}


