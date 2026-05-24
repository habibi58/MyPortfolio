// Certifications Section Component
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, BadgeCheck } from 'lucide-react';
import { certificationsData } from '../data';
import { SectionHeading } from './SectionHeading';
import { Card } from './Card';
import { Button } from './Button';
import { containerVariants, itemVariants } from '../animations/variants';

const cardAccents = [
  'from-blue-600 to-blue-500',
  'from-blue-500 to-blue-600',
  'from-blue-400 to-blue-500',
  'from-blue-700 to-blue-600',
  'from-blue-600 to-blue-700',
  'from-blue-500 to-blue-700',
];

export const CertificationsSection = () => {
  return (
    <section id="certifications" className="relative py-24 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-400/[0.02] blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/[0.02] blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="CREDENTIALS"
          title="Certifications & Achievements"
          description="Professional certifications demonstrating expertise and commitment to learning"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificationsData.map((cert, index) => (
            <motion.div key={cert.id} variants={itemVariants}>
              <CertificationCard cert={cert} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Certification Card Component
interface CertificationCardProps {
  cert: typeof certificationsData[0];
  index: number;
}

const CertificationCard = ({ cert, index }: CertificationCardProps) => {
  const accent = cardAccents[index % cardAccents.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card hover glass className="h-full relative overflow-hidden">
        {/* Top accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent}`} />

        {/* Header */}
        <div className="flex items-start gap-4 mb-5 pt-2">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${accent} shadow-lg flex-shrink-0`}>
            <Award className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-bold text-white leading-tight mb-1">
              {cert.title}
            </h3>
            <div className="flex items-center gap-1.5">
              <BadgeCheck size={14} className="text-blue-600 flex-shrink-0" />
              <p className="text-blue-400 font-semibold text-sm truncate">
                {cert.issuer}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        {cert.description && (
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            {cert.description}
          </p>
        )}

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
          <Calendar size={14} />
          {cert.date}
        </div>

        {/* Credential ID */}
        {cert.credentialId && (
          <p className="text-xs text-slate-600 mb-5 font-mono">
            ID: {cert.credentialId}
          </p>
        )}

        {/* Action Button */}
        {cert.credentialUrl && (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => window.open(cert.credentialUrl, '_blank')}
          >
            <ExternalLink size={14} />
            View Credential
          </Button>
        )}
      </Card>
    </motion.div>
  );
};
