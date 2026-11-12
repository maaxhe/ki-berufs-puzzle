import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CoxilabLeiste from "@/components/CoxilabLeiste";
import ThemeRoot from "@/components/ThemeRoot";
import { SITE_URL } from "@/lib/site";

// Barlow (Text) und Barlow Condensed (nur h1/h2): selbst gehostet, keine Anfrage an Fremdserver.
const barlow = localFont({
  variable: "--font-barlow",
  display: "swap",
  src: [
    { path: "./fonts/barlow-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/barlow-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
});

const barlowCondensed = localFont({
  variable: "--font-barlow-condensed",
  display: "swap",
  src: [
    { path: "./fonts/barlow-condensed-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/barlow-condensed-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
});

// Hell/Dunkel vor dem ersten Zeichnen setzen (kein Aufblitzen). Standard: Hell.
// ?theme=light oder ?theme=dark wählt die Ansicht und merkt sie sich.
const THEME_SCRIPT = `(function(){var t="light";try{var q=new URLSearchParams(location.search).get("theme");if(q==="light"||q==="dark")localStorage.setItem("puz-theme",q);var g=localStorage.getItem("puz-theme");if(g==="light"||g==="dark")t=g;}catch(e){}document.documentElement.setAttribute("data-theme",t);})();`;

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
      data-theme="light"
      suppressHydrationWarning
      className={`${barlow.variable} ${barlowCondensed.variable} h-full`}
    >
      <head>
        <meta name="color-scheme" content="dark light" />
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full">
        <ThemeRoot>
          <div className="print:hidden">
            <CoxilabLeiste />
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
