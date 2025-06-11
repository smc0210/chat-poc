'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import React from 'react';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed z-50 flex w-full items-center justify-between border-b border-dark-2/20 bg-dark-1/40 px-6 py-4 backdrop-blur-lg lg:px-10">
      <div className="flex items-center gap-x-10">
        {navLinks.map((item: { route: string; label: string; icon: React.ComponentType<any> }) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          const Icon = item.icon;

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'flex items-center gap-4 rounded-lg p-3 text-white transition-colors hover:bg-white/10 max-lg:hidden',
                {
                  'bg-white/20': isActive,
                }
              )}
            >
              <Icon className={cn('h-6 w-6', { 'text-blue-300': isActive })} />
              <p className={cn("font-semibold", { "text-blue-300": isActive })}>
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-5">
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
};

export default Navbar; 