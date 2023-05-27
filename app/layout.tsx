"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { MyDataContext, MyGlobalDataType } from "../context/context";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [myData, setMyData] = useState<MyGlobalDataType>();

  return (
    <MyDataContext.Provider value={{ myData, setMyData }}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </MyDataContext.Provider>
  );
}
