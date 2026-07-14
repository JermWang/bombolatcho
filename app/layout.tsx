import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3000";
  const protocol =
    requestHeaders.get("x-forwarded-proto")?.split(",")[0] ??
    (host.includes("localhost") ? "http" : "https");
  const siteUrl = new URL(protocol + "://" + host);
  const socialImage = new URL("/og.png", siteUrl).toString();

  return {
    metadataBase: siteUrl,
    title: "Bombo Latcho — The Sightings Are Real",
    description:
      "Open the files. Follow the sightings. Bombo Latcho is coming to Pump.fun on Solana.",
    icons: {
      icon: "/content/SPRITE%20SHEET%20ANGLES/sprite%20angles/0.png",
    },
    openGraph: {
      title: "Bombo Latcho — You've Seen Him",
      description: "The sightings are real. Open case file 06-19.",
      url: siteUrl,
      siteName: "Bombo Latcho",
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1734,
          height: 909,
          alt: "Bombo Latcho restricted evidence file",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Bombo Latcho — You've Seen Him",
      description: "The sightings are real. Open case file 06-19.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
