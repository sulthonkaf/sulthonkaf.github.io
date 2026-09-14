import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = "https://sulthonkaf.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sulthon KAF — Full-stack Engineer & Product Builder",
  description: "Portfolio of Sulthon Kaffaah Al Farizzi — a full-stack engineer and technical product builder shipping dependable web platforms, applied AI, and digital health systems.",
  authors: [{ name: "Sulthon Kaffaah Al Farizzi", url: siteUrl }],
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Sulthon KAF",
    title: "Sulthon KAF — Full-stack Engineer & Product Builder",
    description: "Engineering dependable digital products at the intersection of software, AI, and human needs.",
    images: [{ url: "https://avatars.githubusercontent.com/u/177893016?v=4&size=1200", width: 1200, height: 1200, alt: "Portrait of Sulthon Kaffaah Al Farizzi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sulthon KAF — Full-stack Engineer & Product Builder",
    description: "Selected work in full-stack platforms, applied AI, and digital health.",
    images: ["https://avatars.githubusercontent.com/u/177893016?v=4&size=1200"],
  },
  icons: { icon: "/assets/favicon.svg" },
};

export const viewport: Viewport = { themeColor: "#050509", colorScheme: "dark", width: "device-width", initialScale: 1 };

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sulthon Kaffaah Al Farizzi",
  alternateName: "Sulthon KAF",
  url: `${siteUrl}/`,
  image: "https://avatars.githubusercontent.com/u/177893016?v=4",
  jobTitle: "Full-stack Engineer and Technical Product Builder",
  homeLocation: { "@type": "Country", name: "Indonesia" },
  knowsAbout: ["Full-stack development", "Software architecture", "Artificial intelligence", "Technical product leadership", "Digital health"],
  sameAs: ["https://github.com/sulthonkaf", "https://www.linkedin.com/in/sulthonkaf"],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        {children}
      </body>
    </html>
  );
}
