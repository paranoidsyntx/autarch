import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Autarch — Descend the Dungeon",
  description:
    "Autarch is a Web3 pixel art dungeon crawler. Delve deeper, claim on-chain loot, and rule the depths.",
  openGraph: {
    title: "Autarch — Descend the Dungeon",
    description:
      "A Web3 pixel art dungeon crawler. Delve deeper, claim on-chain loot, and rule the depths.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0d0b09",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${vt323.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
