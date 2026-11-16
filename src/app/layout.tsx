import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Veerabhadra Constructions — Building Your Vision With Excellence",
  description:
    "Veerabhadra Constructions builds residential, commercial, and infrastructure landmarks across Karimnagar with precision, fine materials, and lasting value. Construction excellence since 2011.",
  keywords: [
    "Veerabhadra Constructions",
    "construction company Karimnagar",
    "residential construction",
    "commercial construction",
    "renovation",
    "interior design",
    "project management",
    "construction consulting",
  ],
  authors: [{ name: "Veerabhadra Constructions" }],
  openGraph: {
    title: "Veerabhadra Constructions — Building Your Vision With Excellence",
    description:
      "Premium construction services in Karimnagar. Residential, commercial, renovation, interior design & project management.",
    siteName: "Veerabhadra Constructions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veerabhadra Constructions",
    description:
      "Premium construction services in Karimnagar. Building excellence since 2011.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
