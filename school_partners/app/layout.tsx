import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import { Toaster } from "react-hot-toast";
import ClientOnly from "./components/ClientOnly";
import getCurrentUser from "./actions/getCurrentUser";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "School Partners",
  description: "School Partners",
};

const font = Nunito({
  subsets:['latin']
})

//Children is page.tsx
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Toaster />
          <RegisterModal />
          <LoginModal />
          <Navbar currentUser = {currentUser} />
        </ClientOnly>
        {children}
        </body>
    </html>
  );
}
  