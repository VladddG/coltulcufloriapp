import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Geist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair", // Această variabilă este citită de Tailwind
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Colțul cu Flori - Eleganță și Emoție",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={cn("antialiased", playfair.variable, greatVibes.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-brand-black text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}