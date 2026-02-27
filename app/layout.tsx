import type { Metadata } from "next";
import { Beth_Ellen, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const bethEllen = Beth_Ellen({
  variable: "--font-beth-ellen",
  subsets: ["latin"],
  weight: ["400"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Someone Grew This For You",
  description: "someone sent you something that grows 🌱",
  openGraph: {
    title: "Someone Grew This For You",
    description: "someone sent you something that grows 🌱",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Someone Grew This For You",
    description: "someone sent you something that grows 🌱",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bethEllen.variable} ${cormorant.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
