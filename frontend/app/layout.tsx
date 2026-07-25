import type { Metadata } from "next";
import { Press_Start_2P, Jacquard_24, Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

const jacquard = Jacquard_24({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Autarch",
  description: "Autarch — a pixel art Web3 dungeon crawler.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${jacquard.variable} ${geist.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
