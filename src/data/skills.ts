// Portfolio Data - Skills

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number; // 0-100
  icon?: string;
}

export const skillsData: Skill[] = [
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    category: 'Skills',
    proficiency: 88,
  },
  {
    id: 'typing-speed',
    name: 'Typing Speed',
    category: 'Skills',
    proficiency: 50,
  },
  {
    id: 'communication',
    name: 'Communication',
    category: 'Skills',
    proficiency: 85,
  },
  {
    id: 'team-collaboration',
    name: 'Team Collaboration',
    category: 'Skills',
    proficiency: 90,
  },
];

export const skillCategories = [
  'Skills',
];
