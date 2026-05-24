// Skills Section Component
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData, skillCategories } from '../data';
import { SectionHeading } from './SectionHeading';
import { Card } from './Card';
import { containerVariants, itemVariants } from '../animations/variants';
import ScrollVelocity from './ScrollVelocity';
import {
  Wrench,
  Download,
  Network,
  Headphones,
} from 'lucide-react';
import { ClaudeCode, Antigravity, Cursor, Windsurf, Microsoft  } from '@lobehub/icons';

export const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(skillCategories[0]);

  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => skill.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="skills" style={{ marginBottom: '200px' }} className="relative py-32 my-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-pattern opacity-10" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/[0.02] blur-[120px] -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-blue-400/[0.02] blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title=""
          subtitle="MY SKILLS"
          description="Technical and professional skills developed through experience and continuous learning"
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {skillCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white shadow-lg shadow-blue-600/25 -translate-y-0.5'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:-translate-y-0.5'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                variants={itemVariants}
              >
                <SkillCard skill={skill} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All Skills Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl font-bold text-white">
              Technical Stack Overview
            </h3>
          </div>

          <div className="w-[100vw] relative left-[50%] -translate-x-[50%] overflow-hidden py-10">
            <ScrollVelocity
              texts={[
                <span className="flex items-center gap-12 px-6 py-4" key="row1">
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <Wrench className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Technical Support</span>
                  </span>
                  
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <Download className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Software Installation</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <Network className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Networking Basics</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg" alt="Windows" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Windows OS</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                     <Microsoft.Color size={40} />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Microsoft Office</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <Headphones className="w-8 h-8 text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Customer Service</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <ClaudeCode.Color size={40} />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Claude Code</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <Cursor.Avatar size={56} />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Cursor AI</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <Windsurf.Avatar size={56} />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Windsurf</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <Antigravity.Color size={40} />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Antigravity</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt="VS Code" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">VS Code</span>
                  </span>
                </span>,
                <span className="flex items-center gap-12 px-6 py-4" key="row2">
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" alt="HTML5" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">HTML</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" alt="CSS3" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">CSS</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">JavaScript</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="React" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">React.js</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg" alt="Vite" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Vite</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" alt="PHP" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">PHP</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" alt="MySQL" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">MySQL</span>
                  </span>

                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" alt="C#" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">C#</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualbasic/visualbasic-original.svg" alt="VB.NET" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">VB.NET</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind CSS" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">Tailwind CSS</span>
                  </span>
                  <span className="flex flex-col items-center justify-center gap-3 w-32">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800/80 shadow-lg flex items-center justify-center border border-slate-700/50 backdrop-blur-sm">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TypeScript" className="w-10 h-10" />
                    </div>
                    <span className="text-sm font-bold text-slate-300 text-center whitespace-normal leading-tight">TypeScript</span>
                  </span>
                </span>
              ]}
              velocity={110}
              className="custom-scroll-text font-display flex items-center"
              numCopies={6}
              damping={75}
              stiffness={600}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Skill Card Component with Progress Bar
interface SkillCardProps {
  skill: typeof skillsData[0];
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
  return (
    <Card hover glass className="text-center">
      <div className="flex flex-col items-center mb-5">
        <h4 className="font-display text-lg font-bold text-white mb-2">{skill.name}</h4>
        <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          {skill.proficiency}%
        </span>
      </div>

      <div className="w-full bg-slate-700/60 rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.5,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
          className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer bg-[length:200%_100%]" />
        </motion.div>
      </div>

      <p className="text-xs font-medium text-slate-500 mt-4 uppercase tracking-wider text-center">{skill.category}</p>
    </Card>
  );
};
