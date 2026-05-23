// Social Media Icon Buttons Component
// Circular icons with brand-colored hover animations for hero section
import './SocialIcons.css';
import { motion } from 'framer-motion';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { portfolioOwner } from '../data';

interface SocialLink {
  label: string;
  url: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  brandColor: string;
  glowColor: string;
}

const socialLinks: SocialLink[] = [
  {
    label: 'Facebook',
    url: portfolioOwner.social.facebook,
    Icon: FaFacebookF,
    brandColor: '#1877F2',
    glowColor: 'rgba(24, 119, 242, 0.45)',
  },
  {
    label: 'Instagram',
    url: portfolioOwner.social.instagram ?? 'https://instagram.com',
    Icon: FaInstagram,
    brandColor: '#E4405F',
    glowColor: 'rgba(228, 64, 95, 0.45)',
  },
  {
    label: 'Twitter',
    url: portfolioOwner.social.twitter,
    Icon: FaXTwitter,
    brandColor: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.35)',
  },
  {
    label: 'LinkedIn',
    url: portfolioOwner.social.linkedin,
    Icon: FaLinkedinIn,
    brandColor: '#0A66C2',
    glowColor: 'rgba(10, 102, 194, 0.45)',
  },
  {
    label: 'YouTube',
    url: portfolioOwner.social.youtube ?? 'https://youtube.com',
    Icon: FaYoutube,
    brandColor: '#FF0000',
    glowColor: 'rgba(255, 0, 0, 0.40)',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.7, rotate: -8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      stiffness: 100,
      damping: 20,
      duration: 0.8,
    },
  },
};

export const SocialIcons = () => {
  return (
    <motion.div
      className="social-icons-row"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {socialLinks.map(({ label, url, Icon, brandColor, glowColor }) => (
        <motion.a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="social-icon-btn"
          variants={itemVariants}
          whileHover={{
            scale: 1.18,
            y: -6,
            transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
          }}
          whileTap={{ scale: 0.95 }}
          style={
            {
              '--brand-color': brandColor,
              '--glow-color': glowColor,
            } as React.CSSProperties
          }
        >
          <span className="social-icon-bg" />
          <Icon size={20} className="social-icon-svg" />
        </motion.a>
      ))}
    </motion.div>
  );
};
