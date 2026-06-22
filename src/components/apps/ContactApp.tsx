'use client';

import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';

const ContactApp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! (EmailJS integration coming soon)');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-6">Contact Me</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-xl space-y-6">
          <h2 className="text-xl font-bold text-secondary mb-4">Get In Touch</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary">Email</h3>
                <div className="text-gray-300 text-sm space-y-1 mt-1">
                  <a href="mailto:exwhyzed596@gmail.com" className="hover:text-secondary transition-all">
                    exwhyzed596@gmail.com
                  </a>
                  <br />
                  <a href="mailto:sharmaaryankumar7@gmail.com" className="hover:text-secondary transition-all">
                    sharmaaryankumar7@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-primary">Phone</h3>
                <a href="tel:+917903721185" className="text-gray-300 text-sm hover:text-secondary transition-all">
                  +91 79037 21185
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-bold text-secondary mb-4">Send A Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                required
                className="w-full bg-[#111] border border-primary/30 rounded px-4 py-2 text-primary outline-none focus:border-primary"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full bg-[#111] border border-primary/30 rounded px-4 py-2 text-primary outline-none focus:border-primary"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Subject</label>
              <input
                type="text"
                required
                className="w-full bg-[#111] border border-primary/30 rounded px-4 py-2 text-primary outline-none focus:border-primary"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                required
                rows={4}
                className="w-full bg-[#111] border border-primary/30 rounded px-4 py-2 text-primary outline-none focus:border-primary"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/80 text-[#050505] font-bold py-3 rounded-lg transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactApp;