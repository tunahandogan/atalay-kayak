import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Onest } from "next/font/google";
import { business, site } from "@/content/business";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppBar } from "@/components/WhatsAppBar";
import { DemoBadge } from "@/components/DemoBadge";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-display",
});

const sans = Onest({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: { default: site.title, template: `%s · ${business.displayName}` },
  description: site.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: business.displayName,
    title: site.title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#0b1b33" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-sm focus:bg-flag focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          İçeriğe geç
        </a>
        <Header />
        {children}
        <Footer />
        <WhatsAppBar />
        <DemoBadge />
        <JsonLd />
      </body>
    </html>
  );
}
