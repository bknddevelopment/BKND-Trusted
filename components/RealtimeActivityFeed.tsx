'use client';

import { useState, useEffect } from 'react';
import { CheckBadgeIcon, ClockIcon } from '@heroicons/react/24/solid';

interface Activity {
  id: number;
  name: string;
  service: string;
  location: string;
  timeAgo: string;
  action: string;
}

const activities: Activity[] = [
  { id: 1, name: 'John D.', service: 'Plumbing', location: 'Houston', timeAgo: '2 minutes ago', action: 'hired a plumber' },
  { id: 2, name: 'Sarah M.', service: 'HVAC', location: 'Dallas', timeAgo: '5 minutes ago', action: 'requested quotes for' },
  { id: 3, name: 'Mike R.', service: 'Electrical', location: 'Austin', timeAgo: '8 minutes ago', action: 'hired an electrician' },
  { id: 4, name: 'Emily C.', service: 'House Cleaning', location: 'San Antonio', timeAgo: '12 minutes ago', action: 'booked' },
  { id: 5, name: 'David L.', service: 'Landscaping', location: 'Fort Worth', timeAgo: '15 minutes ago', action: 'hired for' },
  { id: 6, name: 'Jessica P.', service: 'Painting', location: 'El Paso', timeAgo: '18 minutes ago', action: 'requested quotes for' },
  { id: 7, name: 'Robert K.', service: 'Roofing', location: 'Arlington', timeAgo: '22 minutes ago', action: 'hired for' },
  { id: 8, name: 'Maria G.', service: 'General Contracting', location: 'Plano', timeAgo: '25 minutes ago', action: 'requested quotes for' },
];

export default function RealtimeActivityFeed() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentActivity((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const activity = activities[currentActivity];

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-lg p-4 flex items-center gap-3 max-w-md mx-auto hover:shadow-xl transition-shadow">
      {/* Live Indicator */}
      <div className="flex-shrink-0">
        <div className="relative">
          <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse-slow" />
          <div className="absolute inset-0 w-3 h-3 bg-success-500 rounded-full animate-ping" />
        </div>
      </div>

      {/* Activity Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <CheckBadgeIcon className="w-4 h-4 text-success-500 flex-shrink-0" />
          <p className="text-sm font-semibold text-neutral-900">
            <span className="text-brand-600">{activity.name}</span> {activity.action}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <span className="font-medium">{activity.service}</span>
          <span>•</span>
          <span>{activity.location}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            <span>{activity.timeAgo}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
