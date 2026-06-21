import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AryanOS v3.0 - Portfolio",
  description: "Personal portfolio operating system by Aryan Kumar Sharma",
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
