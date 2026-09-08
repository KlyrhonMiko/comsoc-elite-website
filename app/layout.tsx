import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/custom-cursor";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGroteskDisplay = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const spaceGroteskHeading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "College of Computer Studies — Computer Society",
  description:
    "We craft elegant digital experiences with precision and artistry. The College of Computer Studies Computer Society specializes in premium web solutions.",
  keywords: ["design studio", "web design", "premium", "digital experiences"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGroteskDisplay.variable} ${spaceGroteskHeading.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
// trigger rebuild
