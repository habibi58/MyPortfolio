// Portfolio Data - Skills

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 0-100
  icon?: string;
}

export const skillsData: Skill[] = [
  // Technical Support
  {
    id: 'tech-support',
    name: 'Technical Support',
    category: 'IT Support',
    proficiency: 90,
  },
  {
    id: 'hardware-troubleshoot',
    name: 'Hardware Troubleshooting',
    category: 'IT Support',
    proficiency: 85,
  },
  {
    id: 'software-install',
    name: 'Software Installation',
    category: 'IT Support',
    proficiency: 88,
  },
  {
    id: 'networking-basics',
    name: 'Networking Basics',
    category: 'IT Support',
    proficiency: 75,
  },
  {
    id: 'windows-os',
    name: 'Windows OS',
    category: 'Operating Systems',
    proficiency: 92,
  },
  {
    id: 'microsoft-office',
    name: 'Microsoft Office',
    category: 'Office Suite',
    proficiency: 90,
  },

  // Web Development
  {
    id: 'html',
    name: 'HTML',
    category: 'Web Development',
    proficiency: 90,
  },
  {
    id: 'css',
    name: 'CSS',
    category: 'Web Development',
    proficiency: 88,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Web Development',
    proficiency: 85,
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'Web Development',
    proficiency: 82,
  },

  // Other Skills
  {
    id: 'database',
    name: 'Basic Database Knowledge',
    category: 'Database',
    proficiency: 70,
  },
  {
    id: 'customer-service',
    name: 'Customer Service',
    category: 'Soft Skills',
    proficiency: 92,
  },
];

export const skillCategories = [
  'IT Support',
  'Operating Systems',
  'Office Suite',
  'Web Development',
  'Database',
  'Soft Skills',
];
