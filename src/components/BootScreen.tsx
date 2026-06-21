'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';

const BootScreen = () => {
  const setBootSequenceComplete = useOSStore(state => state.setBootSequenceComplete);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const bootSteps = [
    'Initializing AryanOS...',
    'Loading Kernel...',
    'Loading Portfolio Modules...',
    'Connecting GitHub...',
    'Connecting LeetCode...',
    'Loading Projects...',
    'Launching Desktop Environment...'
  ];

  useEffect(() => {
    let index = 0;
    const logInterval = setInterval(() => {
      if (index < bootSteps.length) {
        setLogs(prev => [...prev, bootSteps[index]]);
        setProgress(((index + 1) / bootSteps.length) * 100);
        index++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => setBootSequenceComplete(true), 1000);
      }
    }, 500);
    return () => clearInterval(logInterval);
  }, [setBootSequenceComplete]);

  return (
    <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50 p-4 overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to bottom, transparent 50%, #000 50%)',
          backgroundSize: '100% 4px',
        }}
      />
      
      {/* Glow behind title */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, #00ff88 0%, transparent 70%)'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="mb-12 relative"
      >
        <div className="flex items-center gap-4 md:gap-8">
          <motion.div
            className="text-5xl md:text-8xl font-black text-primary tracking-widest"
            animate={{
              textShadow: [
                '0 0 5px #00ff88, 0 0 10px #00ff88, 0 0 15px #00ff88',
                '0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88',
                '0 0 5px #00ff88, 0 0 10px #00ff88, 0 0 15px #00ff88'
              ]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ARYAN
          </motion.div>
          <motion.div
            className="text-5xl md:text-8xl font-black text-secondary tracking-widest"
            animate={{
              textShadow: [
                '0 0 5px #00c8ff, 0 0 10px #00c8ff, 0 0 15px #00c8ff',
                '0 0 10px #00c8ff, 0 0 20px #00c8ff, 0 0 30px #00c8ff',
                '0 0 5px #00c8ff, 0 0 10px #00c8ff, 0 0 15px #00c8ff'
              ]
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
          >
            OS
          </motion.div>
        </div>
        
        {/* Glitch lines */}
        <motion.div
          className="absolute -top-2 left-0 w-full h-1 bg-primary opacity-50"
          animate={{
            y: [0, 20, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-2 left-0 w-full h-1 bg-secondary opacity-50"
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-2xl mb-10">
        <div className="flex justify-between mb-2 text-xs md:text-sm font-mono text-gray-400">
          <span>SYSTEM BOOT</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-4 bg-gray-900 rounded-full overflow-hidden border border-primary/30">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Logs */}
      <div className="w-full max-w-2xl text-left">
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="text-primary text-sm md:text-lg font-mono mb-2 flex items-center gap-2"
          >
            <span className="text-secondary">[{String(i).padStart(2, '0')}]</span>
            <span className="text-accent">&gt;</span>
            <span>{log}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BootScreen;
