import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Name App",
  description: "Created by Julio Moraes",
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
