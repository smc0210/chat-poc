'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const HomePage = () => {
  const router = useRouter();
  const [meetingId, setMeetingId] = useState('');

  const createAndJoinMeeting = () => {
    const newMeetingId = uuidv4();
    router.push(`/meeting/${newMeetingId}`);
  };
  
  const joinMeeting = () => {
    if (meetingId) {
      router.push(`/meeting/${meetingId}`);
    } else {
      alert('Please enter a meeting ID.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-dark-2">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Video Chat App</h1>
        <p className="text-lg text-gray-400">
          Start an instant meeting or join an existing one.
        </p>

        <button
          onClick={createAndJoinMeeting}
          className="bg-blue-1 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors"
        >
          Start New Meeting
        </button>

        <div className="flex w-full max-w-sm items-center space-x-2 mt-8">
          <input
            type="text"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            placeholder="Enter Meeting ID"
            className="flex-grow bg-dark-1 border border-gray-600 text-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-1"
          />
          <button
            onClick={joinMeeting}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-md transition-colors disabled:opacity-50"
            disabled={!meetingId.trim()}
          >
            Join
          </button>
        </div>
      </div>
    </main>
  );
};

export default HomePage; 