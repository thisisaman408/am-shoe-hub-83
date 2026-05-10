import type { Metadata } from "next";
import { Archivo_Black, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const archivo = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shoe Hub 83 — Authentic sneakers · Daily drops · Worldwide shipping",
  description:
    "Himanshu's Shoe Hub 83 — authentic Jordans, Nikes, Adidas and more, hand-picked daily, video-call confirmed, shipped worldwide. 38K+ sneakerheads on Instagram.",
  authors: [{ name: "Shoe Hub 83" }],
  keywords: [
    "Shoe Hub 83",
    "shoe_hub83",
    "Himanshu sneakers",
    "Jordans India",
    "authentic sneakers Delhi",
    "sneakers cash on delivery India",
    "worldwide sneaker shipping",
    "Sagar Pur shoes",
  ],
  openGraph: {
    title: "Shoe Hub 83 — Authentic sneakers, daily drops",
    description: "Authentic Jordans, Nikes, Adidas. Video-call confirmed. Worldwide shipping.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <div className="grid-noise" aria-hidden="true" />
      </body>
    </html>
  );
}
