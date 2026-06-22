'use client';

import { motion } from 'framer-motion';
import { Code, Cpu, Database, Globe, GitBranch, Terminal } from 'lucide-react';

const AboutApp = () => {
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-6"
      >
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_20px_rgba(0,255,136,0.5)]">
          <img src="/pic.jpeg" alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-primary">Aryan Kumar Sharma</h1>
          <p className="text-secondary">Software Developer • DSA Enthusiast • Tech Explorer</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass p-4 rounded-xl mb-6"
      >
        <h2 className="text-xl font-bold text-secondary mb-2">About</h2>
        <p className="text-gray-300 leading-relaxed">
          Developer focused on building scalable applications and solving complex problems. Strong foundation in Data Structures, Algorithms, software development, and emerging technologies. Always learning, building, and improving.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass p-4 rounded-xl mb-6"
      >
        <h2 className="text-xl font-bold text-primary mb-4">Tech Stack</h2>

        <div className="mb-4">
          <h3 className="text-sm font-bold text-accent mb-2">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {['C++', 'Java', 'Python', 'JavaScript'].map((lang, i) => (
              <span key={i} className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold text-accent mb-2">Frontend</h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS'].map((tech, i) => (
              <span key={i} className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-bold text-accent mb-2">Backend</h3>
          <div className="flex flex-wrap gap-2">
            {['Node.js', 'APIs', 'Databases'].map((tech, i) => (
              <span key={i} className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-accent mb-2">Tools</h3>
          <div className="flex flex-wrap gap-2">
            {['Git', 'GitHub', 'Linux', 'Docker', 'Jenkins'].map((tool, i) => (
              <span key={i} className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass p-4 rounded-xl"
      >
        <h2 className="text-xl font-bold text-accent mb-4">Interests</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Competitive Programming', icon: Code },
            { name: 'System Design', icon: Cpu },
            { name: 'AI/ML', icon: Database },
            { name: 'Open Source', icon: GitBranch },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#050505]/50">
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-300">{item.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutApp;
