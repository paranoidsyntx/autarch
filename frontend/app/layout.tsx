import type { Metadata } from "next";
import { IBM_Plex_Mono, Jacquard_24, Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-pixel",
  weight: ["400", "500"],
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
      className={`${ibmPlexMono.variable} ${jacquard.variable} ${geist.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
