"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { PostLoginDataContextProvider } from "@/context/postLoginDataContext";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <UserProvider>
      <PostLoginDataContextProvider >
        <html lang="en">
          <body className={inter.className}>
            {children}
          </body>
        </html>
      </PostLoginDataContextProvider>
    </UserProvider>
  );
}
