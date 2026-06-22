'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Code2, Mail, Phone } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/Exwhyzed-del', color: 'hover:border-gray-400' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/aryan-kumar-sharma-791a31397/', color: 'hover:border-blue-400' },
  { name: 'LeetCode', icon: Code2, url: 'https://leetcode.com/u/XxDTkpGrnk/', color: 'hover:border-yellow-400' },
];

const SocialHubApp = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Social Hub</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {socialLinks.map((link, i) => (
          <motion.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`glass p-6 rounded-xl text-center cursor-pointer transition-all border border-transparent ${link.color}`}
          >
            <link.icon className="w-12 h-12 mx-auto mb-3 text-primary" />
            <div className="font-bold text-lg">{link.name}</div>
          </motion.a>
        ))}
      </div>

      <h2 className="text-xl font-bold text-secondary mb-4">Contact Me</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 rounded-xl flex items-start gap-4"
        >
          <div className="bg-primary/20 p-3 rounded-lg">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-primary mb-1">Email</h3>
            <div className="text-gray-300 text-sm space-y-1">
              <a href="mailto:exwhyzed596@gmail.com" className="block hover:text-secondary transition-all">
                exwhyzed596@gmail.com
              </a>
              <a href="mailto:sharmaaryankumar7@gmail.com" className="block hover:text-secondary transition-all">
                sharmaaryankumar7@gmail.com
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass p-6 rounded-xl flex items-start gap-4"
        >
          <div className="bg-primary/20 p-3 rounded-lg">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-primary mb-1">Phone</h3>
            <a href="tel:+917903721185" className="text-gray-300 text-sm hover:text-secondary transition-all">
              +91 79037 21185
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SocialHubApp;