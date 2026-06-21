'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Code2, Mail, Phone } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/Exwhyzed-del', color: 'hover:border-gray-400' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/aryan-kumar-sharma-791a31397/', color: 'hover:border-blue-400' },
  { name: 'LeetCode', icon: Code2, url: 'https://leetcode.com/u/XxDTkpGrnk/', color: 'hover:border-yellow-400' },
  { name: 'Email', icon: Mail, url: 'mailto:sharmaaryankumar7@gmail.com', color: 'hover:border-primary' },
  { name: 'Phone', icon: Phone, url: 'tel:+917903721185', color: 'hover:border-green-400' }
];

const SocialHubApp = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Social Hub</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
    </div>
  );
};

export default SocialHubApp;
