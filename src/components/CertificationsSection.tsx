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
    <section id="certifications" className="relative py-24">
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
          style={{ padding: '4px' }}
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
      /* Glow on hover — no float */
      whileHover={{
        boxShadow: '0 0 0 1.5px rgba(91,141,238,0.7), 0 0 24px rgba(91,141,238,0.18)',
      }}
      style={{
        borderRadius: '16px',
        height: '100%',
        willChange: 'box-shadow',
      }}
    >
      {/* Plain div strips any hover CSS from Card without fighting it */}
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent}`} />

        {/* ── All content with consistent inner spacing ── */}
        <div style={{ padding: '18px 18px 18px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* ── Certificate Image ── */}
          {cert.image ? (
            <motion.div
              className="relative w-full rounded-xl overflow-hidden"
              style={{ height: '280px' }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {cert.image.endsWith('.pdf') ? (
                <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
                  <object
                    data={cert.image}
                    type="application/pdf"
                    style={{ 
                      border: 'none',
                      width: '100%',
                      height: '120%',
                      marginTop: '-40px'
                    }}
                  >
                    <p>Unable to display PDF</p>
                  </object>
                </div>
              ) : (
                <img
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  className="w-full h-full object-cover"
                />
              )}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.45) 100%)',
                }}
              />
            </motion.div>
          ) : (
            <div
              className="relative w-full rounded-xl overflow-hidden flex items-center justify-center"
              style={{
                height: '160px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex flex-col items-center gap-2 opacity-30">
                <Award size={32} className="text-blue-400" />
                <span className="text-xs text-slate-500 font-mono tracking-widest uppercase">
                  Certificate
                </span>
              </div>
            </div>
          )}

          {/* ── Header ── */}
          <div className="flex items-start gap-4">
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

          {/* ── Description ── */}
          {cert.description && (
            <p className="text-sm text-slate-400 leading-relaxed">
              {cert.description}
            </p>
          )}

          {/* ── Date ── */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Calendar size={14} />
            {cert.date}
          </div>

          {/* ── Credential ID ── */}
          {cert.credentialId && (
            <p className="text-xs text-slate-600 font-mono">
              ID: {cert.credentialId}
            </p>
          )}

          {/* ── Action Button ── */}
          {cert.image && (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => window.open(cert.image, '_blank')}
            >
              <ExternalLink size={14} />
              View Credential
            </Button>
          )}

        </div>
      </div>
    </motion.div>
  );
};
