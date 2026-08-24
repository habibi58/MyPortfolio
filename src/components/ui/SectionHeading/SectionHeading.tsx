// Section Heading Component
import { motion } from 'framer-motion';
import { fadeInDown } from '../../../animations/variants';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionHeading = ({
  title,
  subtitle,
  description,
  align = 'center',
}: SectionHeadingProps) => {
  return (
    <motion.div
      variants={fadeInDown}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`mb-16 ${align === 'center' ? 'text-center flex flex-col items-center' : 'text-left'}`}
    >
      {subtitle && (
        <div className={`flex items-center gap-4 mb-4 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
          <span className="h-1 w-12 md:w-16 rounded-full bg-slate-600" />
          <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-[0.2em] text-slate-400">
            {subtitle}
          </p>
          <span className="h-1 w-12 md:w-16 rounded-full bg-slate-600" />
        </div>
      )}
      {title && (
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight">
          {title}
        </h2>
      )}
      {description && (
        <p className={`text-lg text-slate-400 max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto text-center' : 'mx-0'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};
