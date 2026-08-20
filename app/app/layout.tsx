import type { Metadata } from "next";
import { Poppins, Lora, Oswald } from "next/font/google";
import "./globals.css";

// Brand-stand-ins: MAËLYS uses self-hosted Larken (serif display), Poppins
// (body/UI) and Morganite (stat numbers). Poppins is exact; Lora ≈ Larken,
// Oswald ≈ Morganite.
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
const lora = Lora({
  weight: ["500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-lora",
});
const oswald = Oswald({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Creative Loop — MAËLYS AI Acquisition Engine",
  description:
    "Prototype: video ad in → analyzed creative DNA → generated hook-matched landing page → performance learnings → next AI-generated creative.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${lora.variable} ${oswald.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
