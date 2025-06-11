import Navbar from '@/components/Navbar';
import { StreamClientProvider } from '@/providers/StreamClientProvider';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';
import React, { ReactNode } from 'react';
import { Toaster } from 'sonner';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import '../globals.css';

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <StreamClientProvider>
          <Navbar />
          <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
            <div className="w-full">{children}</div>
          </section>
          <Toaster />
        </StreamClientProvider>
      </SignedIn>
    </main>
  );
};

export default RootLayout;