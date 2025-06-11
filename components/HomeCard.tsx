import { cn } from '@/lib/utils';
import React from 'react';

interface HomeCardProps {
  className?: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  handleClick?: () => void;
}

const HomeCard = ({ className, icon: Icon, title, description, handleClick }: HomeCardProps) => {
  return (
    <div
      className={cn(
        'group flex min-h-[260px] w-full cursor-pointer flex-col justify-between rounded-[14px] p-6 backdrop-blur-lg transition-all',
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center size-12 rounded-[10px] border border-white/20 bg-white/10">
        <Icon className="h-6 w-6" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard; 