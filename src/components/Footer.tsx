// Footer Component
import { motion } from 'framer-motion';
import { ChevronUp, Mail, Heart, MapPin, Phone, ExternalLink } from 'lucide-react';
import { portfolioOwner } from '../data';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { Icon: Mail, url: portfolioOwner.social.github, label: 'GitHub' },
    { Icon: ExternalLink, url: portfolioOwner.social.linkedin, label: 'LinkedIn' },
    { Icon: Mail, url: `mailto:${portfolioOwner.social.email}`, label: 'Email' },
  ];

  const quickLinks = ['About', 'Projects', 'Skills', 'Contact'];
  const resources = ['Resume', 'Blog', 'Documentation', 'Terms'];

  const GLOW_COLORS = ['#3b82f6', '#8b5cf6', '#14b8a6'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden py-24">
      {/* Subtle floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 1.5 + 0.5}px`,
              height: `${Math.random() * 1.5 + 0.5}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-4px',
              opacity: Math.random() * 0.1 + 0.02,
              animation: `float-up ${Math.random() * 20 + 15}s ${Math.random() * 10}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full bg-blue-400/[0.02] blur-[120px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.02] blur-[100px] pointer-events-none" />

      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />

      <div className="relative">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div>
                <h3 className="text-3xl font-bold mb-2 text-blue-400">
                  Jason
                </h3>
                <p className="text-sm text-slate-400 font-semibold">IT Professional & Developer</p>
              </div>
              <p className="text-slate-400 text-base leading-relaxed">
                Building innovative solutions through technology. Passionate about IT support and web development.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-bold text-white font-display text-base">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-base"
                      style={{
                        color: '#94a3b8',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = GLOW_COLORS[idx % GLOW_COLORS.length])}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-bold text-white font-display text-base">Resources</h4>
              <ul className="space-y-2">
                {resources.map((link, idx) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-slate-400 text-base"
                      style={{
                        color: '#94a3b8',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = GLOW_COLORS[idx % GLOW_COLORS.length])}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="font-bold text-white font-display text-base">Get In Touch</h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${portfolioOwner.email}`}
                  className="flex items-start gap-3 text-base text-slate-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{portfolioOwner.email}</span>
                </a>
                <a
                  href={`tel:${portfolioOwner.phone}`}
                  className="flex items-start gap-3 text-base text-slate-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{portfolioOwner.phone}</span>
                </a>
                <div className="flex items-start gap-3 text-sm text-slate-400">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{portfolioOwner.location}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div
            className="border-t py-8"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center gap-4 mb-8"
            >
              {socialLinks.map(({ Icon, url, label }, idx) => {
                const color = GLOW_COLORS[idx % GLOW_COLORS.length];
                return (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '0.5px solid rgba(255,255,255,0.1)',
                      color: '#94a3b8',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${color}15`;
                      e.currentTarget.style.borderColor = `${color}40`;
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.boxShadow = `0 0 20px ${color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Copyright & Footer Info */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-slate-400 text-sm">
                <Heart size={12} className="text-blue-500 fill-blue-500" />
                <span>
                  &copy; {new Date().getFullYear()} Jason. Crafted with passion using React & Tailwind CSS
                </span>
              </div>
              <p className="text-slate-600 text-sm">
                Designed & Built by Jason • All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -6, scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-3 rounded-full transition-all duration-300 z-50 flex items-center justify-center"
        style={{
          background: 'rgba(59, 130, 246, 0.15)',
          border: '0.5px solid rgba(255,255,255,0.15)',
          color: '#3b82f6',
          boxShadow: '0 0 20px rgba(59,130,246,0.2)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 40px rgba(59,130,246,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 0 20px rgba(59,130,246,0.2)';
        }}
        aria-label="Scroll to top"
      >
        <ChevronUp size={20} />
      </motion.button>

      {/* float-up keyframe */}
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
      `}</style>
    </footer>
  );
};
