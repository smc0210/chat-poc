'use client';

import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useStreamCall = (id: string) => {
  const [call, setCall] = useState<Call | null>(null);
  const [isCallLoading, setIsCallLoading] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || !id) return;

    const loadCall = async () => {
      setIsCallLoading(true);
      try {
        // Attempt to get the call
        const call = client.call('default', id);
        await call.get(); // get() creates the call on the server if it doesn't exist
        setCall(call);
      } catch (error) {
        console.error('Failed to load or create call', error);
        // If getting fails, it might be because we don't have permissions to create.
        // For a simple app, we assume get() is sufficient.
        // In a real-world app, you might want to query first.
      } finally {
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
}; 