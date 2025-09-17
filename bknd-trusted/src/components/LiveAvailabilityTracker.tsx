import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Availability, TimeSlot } from '../types';

interface LiveAvailabilityTrackerProps {
  availability: Availability;
  businessName: string;
  onSlotSelect?: (date: Date, slot: TimeSlot) => void;
  showLiveIndicator?: boolean;
}

export const LiveAvailabilityTracker: React.FC<LiveAvailabilityTrackerProps> = ({
  availability,
  businessName,
  onSlotSelect,
  showLiveIndicator = true
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [liveUpdateTime, setLiveUpdateTime] = useState(new Date());

  useEffect(() => {
    if (showLiveIndicator) {
      const interval = setInterval(() => {
        setLiveUpdateTime(new Date());
      }, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [showLiveIndicator]);

  const getDayName = (date: Date): keyof Availability => {
    const days: (keyof Availability)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  };

  const getWeekDates = (weekOffset: number = 0) => {
    const dates: Date[] = [];
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + (weekOffset * 7));

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date, slot?: TimeSlot) => {
    const now = new Date();
    if (date < now && !isToday(date)) return true;

    if (slot && isToday(date)) {
      const [hours, minutes] = slot.start.split(':');
      const slotTime = new Date();
      slotTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      return slotTime < now;
    }

    return false;
  };

  const getSlotStatus = (slot: TimeSlot, date: Date) => {
    if (isPast(date, slot)) return 'past';
    if (slot.booked) return 'booked';
    return 'available';
  };

  const getAvailabilityPercentage = (daySlots: TimeSlot[]) => {
    if (!daySlots || daySlots.length === 0) return 0;
    const availableSlots = daySlots.filter(slot => !slot.booked).length;
    return Math.round((availableSlots / daySlots.length) * 100);
  };

  const handleSlotClick = (date: Date, slot: TimeSlot) => {
    const status = getSlotStatus(slot, date);
    if (status === 'available') {
      setSelectedSlot(slot);
      if (onSlotSelect) {
        onSlotSelect(date, slot);
      }
    }
  };

  const weekDates = getWeekDates(currentWeek);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            <h3 className="text-xl font-semibold">Live Availability</h3>
          </div>
          {showLiveIndicator && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-2 text-green-100"
            >
              <div className="w-2 h-2 bg-green-300 rounded-full" />
              <span className="text-sm">Live</span>
            </motion.div>
          )}
        </div>
        <p className="text-green-100 text-sm">
          Book instantly with {businessName}
        </p>
        {availability.nextAvailable && (
          <div className="mt-3 flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Next available: {availability.nextAvailable}</span>
          </div>
        )}
      </div>

      {/* Week Navigation */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentWeek(currentWeek - 1)}
            disabled={currentWeek <= 0}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-medium text-gray-900">
            {currentWeek === 0 ? 'This Week' : `Week of ${weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
          </span>
          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            disabled={currentWeek >= 4}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDates.map((date) => {
            const dayName = getDayName(date);
            const daySlots = availability[dayName] || [];
            const availabilityPercent = getAvailabilityPercentage(daySlots);
            const isSelected = selectedDate?.toDateString() === date.toDateString();

            return (
              <button
                key={date.toISOString()}
                onClick={() => setSelectedDate(date)}
                disabled={isPast(date)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  isPast(date) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <div className="text-xs text-gray-600 mb-1">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="font-semibold text-lg mb-2">
                  {date.getDate()}
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${availabilityPercent}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full ${
                      availabilityPercent > 70 ? 'bg-green-500' :
                      availabilityPercent > 30 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {availabilityPercent}% free
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Date Slots */}
        {selectedDate && (
          <motion.div
            key={selectedDate.toISOString()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-gray-200 pt-4"
          >
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Available times for {formatDate(selectedDate)}
            </h4>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {availability[getDayName(selectedDate)]?.map((slot, index) => {
                const status = getSlotStatus(slot, selectedDate);
                const isSelectedSlot = selectedSlot?.start === slot.start && selectedSlot?.end === slot.end;

                return (
                  <motion.button
                    key={index}
                    whileHover={status === 'available' ? { scale: 1.05 } : {}}
                    whileTap={status === 'available' ? { scale: 0.95 } : {}}
                    onClick={() => handleSlotClick(selectedDate, slot)}
                    disabled={status !== 'available'}
                    className={`p-2 rounded-lg text-sm font-medium transition-all ${
                      isSelectedSlot
                        ? 'bg-green-600 text-white ring-2 ring-green-600 ring-offset-2'
                        : status === 'available'
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : status === 'booked'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <div>{formatTime(slot.start)}</div>
                    <div className="text-xs opacity-75">
                      to {formatTime(slot.end)}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {availability[getDayName(selectedDate)]?.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>No availability for this date</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Footer */}
      {selectedSlot && selectedDate && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-gray-600">Selected time:</p>
              <p className="font-semibold text-gray-900">
                {formatDate(selectedDate)} at {formatTime(selectedSlot.start)} - {formatTime(selectedSlot.end)}
              </p>
            </div>
            <button
              className="btn-primary"
              onClick={() => onSlotSelect && onSlotSelect(selectedDate, selectedSlot)}
            >
              Book Now
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Last updated: {liveUpdateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      )}
    </div>
  );
};