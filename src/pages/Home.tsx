// Home Page
import { useEffect } from 'react';
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  CertificationsSection,
  EducationSection,
  ContactSection,
} from '../components';

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative w-full min-w-0 overflow-hidden space-y-32">

      {/* Hero Section */}
      <HeroSection />

      <AboutSection />
      <div className="h-34" />
      <SkillsSection />
      <div className="h-60" />
      <ExperienceSection />
      <div className="h-34" />
      <ProjectsSection />
      <div className="h-34" />
      <CertificationsSection />
      <div className="h-34" />
      <EducationSection />
      <div className="h-34" />
      <ContactSection />
      <div className="h-32" />

    </main>
  );
};