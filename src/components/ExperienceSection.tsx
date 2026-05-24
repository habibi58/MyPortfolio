// Experience Section Component
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { experienceData } from '../data';
import { SectionHeading } from './SectionHeading';
import { Card } from './Card';
import { containerVariants, itemVariants } from '../animations/variants';

export const ExperienceSection = () => {
  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full bg-blue-400/[0.02] blur-[120px] -translate-x-1/2" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="CAREER PATH"
          title="Experience"
          description="My professional journey and roles in IT support"
        />

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full">
            <div className="w-full h-full bg-gradient-to-b from-blue-600 via-blue-500 to-blue-700 rounded-full opacity-30" />
          </div>

          {/* Experience Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-16"
          >
            {experienceData.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
              >
                {/* Content */}
                <div
                  className={`${index % 2 === 1 ? 'md:col-start-1' : 'md:col-start-2'
                    }`}
                >
                  <Card hover gradient>
                    {/* Top accent border */}
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-b-full" />

                    <div className="flex items-start gap-4 mb-5">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-600/20">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-xl font-bold text-white">
                          {exp.position}
                        </h3>
                        <p className="text-blue-400 font-semibold text-sm">
                          {exp.company}
                        </p>
                      </div>
                      {exp.isCurrentRole && (
                        <span className="px-3 py-1 text-xs font-bold bg-blue-900/30 text-blue-400 rounded-full border border-blue-800/40">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <Calendar size={14} className="text-slate-400" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <MapPin size={14} className="text-slate-400" />
                        {exp.location}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-5">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-300">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shrink-0" />
                          {desc}
                        </li>
                      ))}
                    </ul>

                    {exp.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="tag-pill"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex justify-center items-start pt-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 border-4 border-black relative z-10 shadow-lg shadow-blue-600/30" />
                    <motion.div
                      animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-700"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
