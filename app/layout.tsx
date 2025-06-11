import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StreamClientProvider } from "@/providers/StreamClientProvider";
import '@stream-io/video-react-sdk/dist/css/styles.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Next - Video",
  description: "Simple video calling app",
  icons: {
    icon: "/icons/logo.svg", // Assuming you have a logo here
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StreamClientProvider>
          {children}
        </StreamClientProvider>
      </body>
    </html>
  );
} 