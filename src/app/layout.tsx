import type { Metadata } from "next";
import { Inter, Antonio } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MouseFollower } from "@/components/MouseFollower";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { ChatWidget } from "@/components/ChatWidget";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Portavia",
  description:
    "Portavia is a clean portfolio template for showcasing creative work. Perfect for designers and creatives.",
  icons: {
    icon: "/seo/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${antonio.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#1a1a1b] text-white">
        <NoiseOverlay />
        <MouseFollower />
        <SmoothScroll>{children}</SmoothScroll>
        <ChatWidget />
      </body>
    </html>
  );
}
