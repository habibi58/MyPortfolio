// Projects Section Component
import { motion } from 'framer-motion';
import { ExternalLink, Code2, ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data';
import { SectionHeading } from './SectionHeading';
import { Card } from './Card';
import { Button } from './Button';
import { containerVariants, itemVariants } from '../animations/variants';

export const ProjectsSection = () => {
  const featuredProjects = projectsData.filter((p) => p.featured);
  const otherProjects = projectsData.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-gradient-2" />
      <div className="absolute inset-0 dot-pattern opacity-20 dark:opacity-10" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="PORTFOLIO"
          title="Featured Projects"
          description="Showcase of my best work in IT support systems and web development"
        />

        {/* Featured Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          {featuredProjects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} featured />
            </motion.div>
          ))}
        </motion.div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-10"
            >
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                Other Projects
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent" />
            </motion.div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

// Project Card Component
interface ProjectCardProps {
  project: typeof projectsData[0];
  featured?: boolean;
}

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  return (
    <Card hover={!featured} glass className={featured ? 'h-full' : ''}>
      {/* Project Image Area */}
      <div className="group/img relative w-full h-48 rounded-xl mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-2 drop-shadow-lg">📦</div>
            <p className="text-white/90 font-semibold text-sm font-display">{project.title}</p>
          </div>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white border border-white/20"
            >
              <ExternalLink size={18} />
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white border border-white/20"
            >
              <Code2 size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 group">
        {project.title}
        <ArrowUpRight size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-blue-600 transition-colors" />
      </h3>

      <p className="text-slate-500 dark:text-slate-400 mb-5 leading-relaxed text-sm">
        {featured ? project.fullDescription : project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="tag-pill"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="px-3 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">
            +{project.technologies.length - 4} more
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {project.liveLink && (
          <Button
            variant="primary"
            size={featured ? 'md' : 'sm'}
            className="flex-1"
            onClick={() => window.open(project.liveLink, '_blank')}
          >
            <ExternalLink size={16} />
            Live Demo
          </Button>
        )}
        {project.githubLink && (
          <Button
            variant="outline"
            size={featured ? 'md' : 'sm'}
            className="flex-1"
            onClick={() => window.open(project.githubLink, '_blank')}
          >
            <Code2 size={16} />
            GitHub
          </Button>
        )}
      </div>
    </Card>
  );
};
