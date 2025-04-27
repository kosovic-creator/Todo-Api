'use client';
import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { GlobalProvider } from "@/app/context/GlobalContext";
import { Toaster } from "@/components/ui/toaster";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
        <Nav />
          <div className="flex flex-col items-center mt-5">{children}</div>
          {/* <Toaster /> */}
        </GlobalProvider>
      </body>
    </html>
  );
}