import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StartupForge — Startup Team Builder Platform",
  description:
    "Connect startup founders with talented collaborators. Find co-founders, developers, designers, and marketers for your startup.",
  keywords: "startup, team builder, co-founder, collaborator, jobs, opportunities",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <Providers>
          <AuthProvider>
            <Navbar />
            <main className="main-content flex-1">{children}</main>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
