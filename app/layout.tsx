import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thebeatlist.com"),
  title: {
    default: "The Beat List | Where Producers Get Heard",
    template: "%s | The Beat List",
  },
  description:
    "Enter the Nashville Beat Battle, explore Nashville Music Boost's grant-supported work, and discover producers and original music.",
  openGraph: {
    title: "The Beat List | Where Producers Get Heard.",
    description:
      "Beat licensing, producer discovery, Nashville Beat Battle, and Nashville Music Boost.",
    type: "website",
    locale: "en_US",
    siteName: "The Beat List",
  },
  twitter: {
    card: "summary",
    title: "The Beat List | Where Producers Get Heard",
    description: "Make the beat. Build the record. Move the culture.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f6f4ee",
};

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
