// Portfolio Data - Experience

export interface Experience {
  id: string;
  position: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  technologies?: string[];
  isCurrentRole?: boolean;
}

export const experienceData: Experience[] = [
  {
    id: 'desktop-support-intern',
    position: 'Desktop Support Intern',
    company: 'TTTEC',
    duration: 'November 2025 - March 2026',
    location: 'Cainta, Rizal, Philippines',
    isCurrentRole: false,
    description: [
      'Assisted end-users with technical issues and IT support requests',
      'Installed, configured, and maintained software applications',
      'Troubleshot hardware and software problems efficiently',
      'Maintained computer systems and peripherals in working condition',
      'Documented and tracked support tickets using helpdesk system',
      'Provided first-level technical support to 50+ users',
    ],
    technologies: ['Windows OS', 'Microsoft Office', 'Ticketing System', 'IGEL OS'],
  },
  {
    id: 'self-study',
    position: 'IT Graduate & Self-Learner',
    company: 'Personal Development',
    duration: 'January 2024 - Present',
    location: 'Rizal, Philippines',
    isCurrentRole: true,
    description: [
      'Currently pursuing further knowledge in IT Support and Technical Support',
      'Developing web development skills through practical projects',
      'Learning modern technologies and best practices',
      'Building portfolio projects for career advancement',
      'Preparing for IT Support professional certifications',
    ],
    technologies: ['React.js', 'Web Development', 'JavaScript', 'Networking Fundamentals'],
  },
];

export const timeline = [
  {
    year: '2023',
    title: 'Desktop Support Internship',
    description: 'Started IT career as Desktop Support Intern',
  },
  {
    year: '2023',
    title: 'IT Graduate',
    description: 'Completed IT graduation program',
  },
  {
    year: '2024',
    title: 'Web Development Journey',
    description: 'Started learning web development and building projects',
  },
  {
    year: '2024-2025',
    title: 'Career Growth',
    description: 'Expanding skills and preparing for IT Support specialist role',
  },
];
