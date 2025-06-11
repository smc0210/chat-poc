import { Home, Calendar, Users, Video } from 'lucide-react';

export const navLinks = [
  {
    label: 'Home',
    route: '/',
    icon: Home,
  },
  {
    label: 'Upcoming',
    route: '/upcoming',
    icon: Calendar,
  },
  {
    label: 'Previous',
    route: '/previous',
    icon: Users,
  },
  {
    label: 'Recordings',
    route: '/recordings',
    icon: Video,
  },
  {
    label: 'Personal Room',
    route: '/personal-room',
    icon: Users,
  },
]; 