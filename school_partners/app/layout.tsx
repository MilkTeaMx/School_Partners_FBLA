import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modals/Modals";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Partners",
  description: "School Partners",
};

const font = Nunito({
  subsets:['latin']
})

//Children is page.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModal />
        <LoginModal />
        <Navbar />
        {children}
        </body>
    </html>
  );
}
  