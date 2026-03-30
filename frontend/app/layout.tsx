import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "People",
  description: "Add and list people",
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
