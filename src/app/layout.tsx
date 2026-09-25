// importing metadata, inter, toaster, planprovider...
import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";   
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// defining fonts
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// metadata for the app
export const metadata: Metadata = {
    title: "FitLog - Workout Library",
    description: "Train with intent. Log every set.",
};

// RootLayout component
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
      <html lang="en">
        <body className={`${oswald.variable} ${inter.variable} font-inter bg-[#0a0a0a] text-white antialiased`}>
          <PlanProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <Toaster position="top-right" 
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid #2a2a2a",
              },
              success:{
                iconTheme: {primary: "#ccff00", secondary: "#0a0a0a"},
              },
            }} />
          </PlanProvider>
        </body>
      </html>
    );
}
  