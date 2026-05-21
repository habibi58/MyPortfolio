// Footer Component
import { motion } from 'framer-motion';
import { ChevronUp, Code2, Globe, Mail, Share2, Heart } from 'lucide-react';
import { portfolioOwner } from '../data';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { Icon: Code2, url: portfolioOwner.social.github, label: 'GitHub' },
    { Icon: Globe, url: portfolioOwner.social.linkedin, label: 'LinkedIn' },
    { Icon: Share2, url: portfolioOwner.social.facebook, label: 'Facebook' },
    { Icon: Mail, url: `mailto:${portfolioOwner.social.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-slate-800/50 bg-slate-950 py-16 text-white overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-bold mb-3">
              <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                Jason
              </span>
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              IT Support Professional & Web Developer. Passionate about technology and solving challenges.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display font-bold mb-5 text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {['About', 'Projects', 'Contact', 'Resume'].map((link) => (
                <li key={link}>
                  <a
                    href={link === 'Resume' ? '#' : `#${link.toLowerCase()}`}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-blue-400 transition-all duration-300 group-hover:w-4" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display font-bold mb-5 text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${portfolioOwner.email}`}
                  className="text-slate-400 hover:text-blue-400 transition-colors"
                >
                  {portfolioOwner.email}
                </a>
              </li>
              <li>
                <a href={`tel:${portfolioOwner.phone}`} className="text-slate-400 hover:text-blue-400 transition-colors">
                  {portfolioOwner.phone}
                </a>
              </li>
              <li className="text-slate-400">{portfolioOwner.location}</li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/60 py-8">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center gap-3 mb-8"
          >
            {socialLinks.map(({ Icon, url, label }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl bg-slate-800/80 p-3 text-slate-400 transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 hover:text-white hover:shadow-lg hover:shadow-blue-600/20 hover:-translate-y-1"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>

          {/* Copyright */}
          <div className="text-center text-slate-500 text-sm space-y-2">
            <p className="flex items-center justify-center gap-1.5">
              &copy; {new Date().getFullYear()} Jason. Built with
              <Heart size={14} className="text-blue-500 fill-blue-500" />
              using React & Tailwind
            </p>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          whileHover={{ y: -5 }}
          className="fixed bottom-8 right-8 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 shadow-lg z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp size={22} />
        </motion.button>
      </div>
    </footer>
  );
};
