'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import Loader from '@/components/Loader';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

if (!apiKey) {
  throw new Error('Stream API key is missing. Please set NEXT_PUBLIC_STREAM_API_KEY in .env.local');
}

export const StreamClientProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const createClient = async () => {
      try {
        const response = await fetch('/api/stream/token'); // No body needed now
        if (!response.ok) {
          throw new Error('Failed to fetch stream token');
        }
        const { token } = await response.json();

        const client = new StreamVideoClient({
          apiKey,
          user: {
            id: user.id,
            name: user.username || user.id,
            image: user.imageUrl,
          },
          token,
        });
        setVideoClient(client);
      } catch (error) {
        console.error('Error setting up Stream client:', error);
      }
    };

    createClient();
  }, [user, isLoaded]);

  if (!isLoaded) {
    return <Loader />;
  }
  
  // If not logged in, children will be rendered inside a page that redirects to sign-in.
  // So we don't need to show a special message here.
  // We only render the StreamVideo when the client is ready.
  if (!videoClient) {
    return <>{children}</>; 
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}; 