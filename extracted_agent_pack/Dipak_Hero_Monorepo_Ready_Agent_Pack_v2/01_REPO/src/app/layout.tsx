import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Dipak Vishwakarma — Sales Is The Transfer Of Certainty",
  description:
    "Thoughts on sales, communication, trust, and personal branding for people building meaningful authority.",
  openGraph: {
    title: "Dipak Vishwakarma — Sales Is The Transfer Of Certainty",
    description:
      "Thoughts on sales, communication, trust, and personal branding for people building meaningful authority.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f3efe6",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
