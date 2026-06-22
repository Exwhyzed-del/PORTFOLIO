'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Widgets = () => {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString());
      setDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40 flex flex-col gap-3 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-4 rounded-xl pointer-events-auto"
      >
        <div className="text-primary text-2xl font-bold">{time}</div>
        <div className="text-secondary text-sm">{date}</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass p-4 rounded-xl pointer-events-auto"
      >
        <div className="text-xs text-gray-400 mb-2">SYSTEM</div>
        <div className="flex justify-between mb-1">
          <span className="text-sm">CPU</span>
          <span className="text-sm text-primary">45%</span>
        </div>
        <div className="flex justify-between mb-1">
          <span className="text-sm">MEMORY</span>
          <span className="text-sm text-secondary">6.2 GB</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">NETWORK</span>
          <span className="text-sm text-accent">Connected</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Widgets;
