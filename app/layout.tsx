import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Central | N° 1 Restaurant in the World | Lima, Peru",
  description:
    "An immersive scrollytelling journey through Central in Lima, Peru. Explore the ecosystems, altitudes, and culinary philosophy of Virgilio Martínez and Pía León.",
  keywords: [
    "Central Restaurant",
    "Virgilio Martínez",
    "Pía León",
    "Lima",
    "World's 50 Best",
    "Fine Dining",
    "Mater Iniciativa",
    "Peruvian Gastronomy",
  ],
  authors: [{ name: "Central Restaurante" }],
  openGraph: {
    title: "Central | N° 1 Restaurant in the World",
    description:
      "A cinematic scrollytelling expedition through Central, Lima — from entrance to kitchen to team meeting.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#121621",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#121621] text-white/90 antialiased selection:bg-[#508ef2]/30 selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
