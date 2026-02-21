import type { Metadata } from "next";
import { Rubik, Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { Toaster } from "react-hot-toast";
import SmoothScroll from "./components/SmoothScroll";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "KICKS - Premium Sneakers Store",
  description:
    "Shop the latest sneaker drops and exclusive collections. Find Nike, Adidas, and more premium brands.",
  keywords: [
    "sneakers",
    "shoes",
    "nike",
    "adidas",
    "kicks",
    "footwear",
    "streetwear",
  ],
  authors: [{ name: "KICKS" }],
  openGraph: {
    title: "KICKS - Premium Sneakers Store",
    description: "Shop the latest sneaker drops and exclusive collections",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://api.escuelajs.co" />
        <link rel="dns-prefetch" href="https://i.imgur.com" />
      </head>
      <body
        className={`${rubik.variable} ${openSans.variable} font-sans antialiased bg-[#e7e7e3]`}
      >
        <SmoothScroll>
          <CartProvider>
            <WishlistProvider>
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },
                  success: {
                    duration: 2500,
                    iconTheme: {
                      primary: "#4ade80",
                      secondary: "#fff",
                    },
                  },
                }}
              />
              <Navbar />
              {children}
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
