'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-sdk';
import { v4 as uuidv4 } from 'uuid';
import Loader from '@/components/Loader';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

if (!apiKey) {
  throw new Error('Stream API key is missing. Please set NEXT_PUBLIC_STREAM_API_KEY in .env.local');
}

export const StreamClientProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem('userId', userId);
    }
    const user: User = { 
      id: userId, 
      name: `Guest-${userId.substring(0, 8)}`,
      image: `https://getstream.io/random_png/?id=${userId}&name=Guest`
    };
    setUser(user);
  }, []);

  useEffect(() => {
    if (!user) return;

    const createClient = async () => {
      try {
        const response = await fetch('/api/stream/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch stream token');
        }
        const { token } = await response.json();

        const client = new StreamVideoClient({
          apiKey,
          user,
          token,
        });
        setVideoClient(client);
      } catch (error) {
        console.error('Error setting up Stream client:', error);
      }
    };

    createClient();
  }, [user]);

  if (!videoClient || !user) {
    return <Loader />;
  }

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
}; 