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
  const socialImage = new URL("/content/bombo%20latcho.png", siteUrl).toString();

  return {
    metadataBase: siteUrl,
    title: "Bombo Latcho Field Research Organization",
    description:
      "Public encounter archive, field reports, evidence standards, and research notes concerning Bombo Latcho.",
    icons: {
      icon: "/content/SPRITE%20SHEET%20ANGLES/sprite%20angles/0.png",
    },
    openGraph: {
      title: "BLFRO — Public Encounter Archive",
      description:
        "Document · Verify · Preserve. Review public Bombo Latcho field reports and evidence standards.",
      url: siteUrl,
      siteName: "Bombo Latcho Field Research Organization",
      type: "website",
      images: [
        {
          url: socialImage,
          width: 1024,
          height: 1536,
          alt: "Bombo Latcho Field Research Organization public encounter archive",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "BLFRO — Public Encounter Archive",
      description:
        "Document · Verify · Preserve. Review public Bombo Latcho field reports and evidence standards.",
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



