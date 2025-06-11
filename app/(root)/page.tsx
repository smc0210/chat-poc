'use client';

import { useState, useEffect } from 'react';
import HomeCard from '@/components/HomeCard';
import MeetingModal from '@/components/MeetingModal';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { Plus, Users, Calendar, Video } from 'lucide-react';
import { toast } from 'sonner';

const HomePage = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const [callDetail, setCallDetail] = useState<any>();
  const [meetingState, setMeetingState] = useState<'isJoiningMeeting' | 'isSchedulingMeeting' | 'isInstantMeeting' | undefined>();
  
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        // toast({ title: 'Please select a date and time' });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      // toast({
      //   title: 'Meeting Created',
      // });
    } catch (error) {
      console.error(error);
      // toast({ title: 'Failed to create Meeting' });
    }
  };

  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <HomeCard
          icon={Plus}
          title="New Meeting"
          description="Start an instant meeting"
          className="bg-orange-1/20 hover:bg-orange-1/30"
          handleClick={createMeeting}
        />
        <HomeCard
          icon={Users}
          title="Join Meeting"
          description="via invitation link"
          className="bg-blue-1/20 hover:bg-blue-1/30"
          handleClick={() => setMeetingState('isJoiningMeeting')}
        />
        <HomeCard
          icon={Calendar}
          title="Schedule Meeting"
          description="Plan your meeting"
          className="bg-purple-1/20 hover:bg-purple-1/30"
          handleClick={() =>
            toast.info('This feature is not yet supported.')
          }
        />
        <HomeCard
          icon={Video}
          title="View Recordings"
          description="Meeting Recordings"
          className="bg-yellow-1/20 hover:bg-yellow-1/30"
          handleClick={() =>
            toast.info('This feature is not yet supported.')
          }
        />
      </div>

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
      />
    </section>
  );
};

export default HomePage; 