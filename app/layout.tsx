import type { Metadata } from "next";
import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Comfortaa for headers
const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MinuteMade",
  description: "Making users minutes, one at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} antialiased`}
      >
        <div className="max-w-7xl mx-auto bg-white border border-gray-200 shadow-sm min-h-screen">
          <Navbar />
          {children}
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
