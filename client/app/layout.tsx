import type { Metadata } from "next";
import ToastProvider from "@/components/providers/ToastProvider";
import { ModalProvider } from "@/context/ModalContext/ModalContext";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Reuseable/Footer";
import { AuthProvider } from "@/context/AuthContext/AuthContext";
import { CartProvider } from "@/context/CartContext/CartContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cloud Kithen Home Page",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.className} ${inter.variable}   ${inter.className}`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ModalProvider>
            <CartProvider>
              <main>{children}</main>
            </CartProvider>

            <footer>
              {" "}
              <Footer />
            </footer>
          </ModalProvider>
        </AuthProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
