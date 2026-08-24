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
  ScrollFloat,
} from '../components';

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative overflow-hidden space-y-32">

      {/* Hero Section */}
      <HeroSection />

      <section className="min-h-screen flex items-center justify-center">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=60%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.10}
        >
          Get to Know Me
        </ScrollFloat>
      </section>

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