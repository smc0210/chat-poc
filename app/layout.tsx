import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { StreamClientProvider } from "@/providers/StreamClientProvider";
import '@stream-io/video-react-sdk/dist/css/styles.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flohub - Video",
  description: "Video calling app with Clerk authentication",
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
    <ClerkProvider
      appearance={{
        variables: {
          colorText: '#fff',
          colorPrimary: '#0E78F9',
          colorBackground: '#1c1f2e',
          colorInputBackground: '#252a41',
          colorInputText: '#fff',
        },
        layout: {
          logoImageUrl: '', // No logo
          socialButtonsVariant: 'iconButton',
        }
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-dark-2`}>
          <StreamClientProvider>
            {children}
          </StreamClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
} 