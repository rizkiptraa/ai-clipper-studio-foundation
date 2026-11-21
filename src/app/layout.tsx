import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Clipper Studio",
  description: "Turn long-form videos into short-form highlights with AI.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
