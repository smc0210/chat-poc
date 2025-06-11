'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText
}: MeetingModalProps) => {
  const router = useRouter();
  const [meetingLink, setMeetingLink] = useState('');

  const handleJoinMeeting = () => {
    const meetingId = meetingLink.split('/').pop();
    if(meetingId) {
        router.push(`/meeting/${meetingId}`);
    } else {
        alert("Invalid meeting link or ID");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children || (
          <>
            <label htmlFor="link" className="text-sm leading-tight text-sky-200">
              Enter meeting link or ID
            </label>
            <input
              id="link"
              onChange={(e) => setMeetingLink(e.target.value)}
              className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0 p-2 rounded-md"
            />
          </>
        )}
        <Button
          className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
          onClick={handleClick ? handleClick : handleJoinMeeting}
        >
          {buttonText || 'Join Meeting'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal; 