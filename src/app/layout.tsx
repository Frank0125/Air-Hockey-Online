import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

import Loading from "./loading";

export const metadata: Metadata = {
  title: "Air Hockey Online",
  description: "Air Hockey with your friends or strangers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback = { <Loading /> }>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
