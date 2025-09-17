import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Calendar, Mail, Video, FileText, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface CTAButtonsProps {
  businessId: string;
  businessName: string;
  phoneNumber?: string;
  email?: string;
  onAction?: (action: string) => void;
  variant?: 'default' | 'floating' | 'inline' | 'hero';
  showResponseTime?: boolean;
  responseTime?: string;
}

export const CTAButtons: React.FC<CTAButtonsProps> = ({
  businessId,
  businessName,
  phoneNumber,
  email,
  onAction,
  variant = 'default',
  showResponseTime = true,
  responseTime = 'within 15 min'
}) => {
  const [clickedButton, setClickedButton] = useState<string | null>(null);
  const [conversionTracked, setConversionTracked] = useState<Set<string>>(new Set());

  const trackConversion = (action: string) => {
    if (!conversionTracked.has(action)) {
      // Track conversion (integrate with analytics)
      console.log('Conversion tracked:', { businessId, action, timestamp: new Date() });
      setConversionTracked(new Set(conversionTracked).add(action));

      // Visual feedback
      setClickedButton(action);
      setTimeout(() => setClickedButton(null), 2000);
    }

    if (onAction) {
      onAction(action);
    }
  };

  const handleCall = () => {
    trackConversion('call');
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  const handleMessage = () => {
    trackConversion('message');
    // Open messaging interface
  };

  const handleSchedule = () => {
    trackConversion('schedule');
    // Open scheduling interface
  };

  const handleEmail = () => {
    trackConversion('email');
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleVideoCall = () => {
    trackConversion('video_call');
    // Open video call interface
  };

  const handleQuote = () => {
    trackConversion('get_quote');
    // Open quote form
  };

  const buttons = [
    {
      id: 'call',
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Now',
      color: 'bg-green-600 hover:bg-green-700',
      action: handleCall,
      primary: true,
      disabled: !phoneNumber
    },
    {
      id: 'message',
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'Message',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: handleMessage,
      primary: false
    },
    {
      id: 'schedule',
      icon: <Calendar className="w-5 h-5" />,
      label: 'Schedule',
      color: 'bg-purple-600 hover:bg-purple-700',
      action: handleSchedule,
      primary: false
    },
    {
      id: 'quote',
      icon: <FileText className="w-5 h-5" />,
      label: 'Get Quote',
      color: 'bg-orange-600 hover:bg-orange-700',
      action: handleQuote,
      primary: true
    }
  ];

  if (variant === 'floating') {
    return (
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-6 right-6 z-40 space-y-3"
      >
        {buttons.filter(btn => btn.primary).map((button, index) => (
          <motion.button
            key={button.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={button.action}
            disabled={button.disabled}
            className={`flex items-center gap-2 px-6 py-3 ${button.color} text-white rounded-full shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
          >
            <motion.div
              animate={clickedButton === button.id ? { rotate: 360 } : {}}
              transition={{ duration: 0.5 }}
            >
              {button.icon}
            </motion.div>
            <span>{button.label}</span>
          </motion.button>
        ))}
        {showResponseTime && (
          <div className="bg-white rounded-full shadow-md px-4 py-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Responds {responseTime}</span>
          </div>
        )}
      </motion.div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {buttons.map((button) => (
            <motion.button
              key={button.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={button.action}
              disabled={button.disabled}
              className={`flex items-center justify-center gap-2 px-6 py-4 ${
                button.primary ? button.color : 'bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700'
              } rounded-lg font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
                button.primary ? 'text-white' : ''
              }`}
            >
              <motion.div
                animate={clickedButton === button.id ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                {button.icon}
              </motion.div>
              <span>{button.label}</span>
            </motion.button>
          ))}
        </div>

        {showResponseTime && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-green-600 bg-green-50 rounded-lg px-4 py-3"
          >
            <Clock className="w-5 h-5" />
            <span className="font-medium">Usually responds {responseTime}</span>
          </motion.div>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap gap-2">
        {buttons.map((button) => (
          <motion.button
            key={button.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={button.action}
            disabled={button.disabled}
            className={`inline-flex items-center gap-2 px-4 py-2 ${
              button.primary
                ? `${button.color} text-white`
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            } rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all`}
          >
            <motion.div
              animate={clickedButton === button.id ? { rotate: 360 } : {}}
              transition={{ duration: 0.5 }}
              className="w-4 h-4"
            >
              {button.icon}
            </motion.div>
            <span>{button.label}</span>
          </motion.button>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Connect with {businessName}
      </h3>

      <div className="space-y-3">
        {buttons.map((button, index) => (
          <motion.button
            key={button.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={button.action}
            disabled={button.disabled}
            className={`w-full flex items-center justify-between px-4 py-3 ${
              button.primary
                ? `${button.color} text-white`
                : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
            } rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all group`}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={clickedButton === button.id ? { rotate: 360 } : {}}
                transition={{ duration: 0.5 }}
              >
                {button.icon}
              </motion.div>
              <span>{button.label}</span>
            </div>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </div>

      {showResponseTime && (
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Response time</span>
            </div>
            <span className="font-medium text-green-600">{responseTime}</span>
          </div>
        </div>
      )}

      {/* Success Feedback */}
      {clickedButton && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Action tracked! {businessName} will be notified.
        </motion.div>
      )}
    </div>
  );
};