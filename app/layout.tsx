import type { Metadata } from "next";
import { Gabarito, Onest } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeRoot from "@/components/ThemeRoot";
import { SITE_URL } from "@/lib/site";

// Gabarito: geometrisch-freundliche Display-Schrift für Überschriften.
const gabarito = Gabarito({
  variable: "--font-gabarito",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Onest: offene, gut lesbare Grotesk für Fließtext und UI (auch für jüngere Leser:innen).
const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KI-Berufs-Puzzle",
  description:
    "Sortier die Aufgaben eines Berufs selbst: Was kann KI heute übernehmen, was bleibt beim Menschen? Ein Werkzeug für Berufsorientierungs-Workshops.",
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "KI-Berufs-Puzzle",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="de"
      className={`${gabarito.variable} ${onest.variable} h-full`}
    >
      <body className="min-h-full">
        <ThemeRoot>
          <div className="print:hidden">
            <Header />
          </div>
          <main className="flex-1">{children}</main>
          <div className="print:hidden">
            <Footer />
          </div>
        </ThemeRoot>
      </body>
    </html>
  );
}
