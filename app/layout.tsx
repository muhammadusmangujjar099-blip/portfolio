import type { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Background } from "@/components/background";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { site } from "@/lib/site";
import "./globals.css";

const display = Chakra_Petch({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const body = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: site.title,
  description: site.description,
  icons: { icon: "/favicon.svg" },
  openGraph: { title: site.title, description: site.description, type: "website" },
};

export const viewport: Viewport = { themeColor: "#0B0F17" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-cyber focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Background />
        <Providers>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
