'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '@/store/useOSStore';

const BootScreen = () => {
  const setBootSequenceComplete = useOSStore(state => state.setBootSequenceComplete);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff88';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const animationId = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#050505] z-50 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-12"
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
        </motion.div>

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
    </div>
  );
};

export default BootScreen;