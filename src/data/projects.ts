// Portfolio Data - Projects

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  features?: string[];
  image: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: 'fintra-personal-finance',
    title: 'Fintra Personal Finance Tracker',
    description: 'An offline-first personal finance and budgeting app',
    fullDescription:
      'A privacy-focused personal finance tracker that works offline and stores financial data locally on the device. It brings accounts, budgets, cash flow, and savings goals together in one app.',
    features: [
      'Track accounts, balances, and net worth',
      'Create budgets and monitor spending progress',
      'Review cash flow and transaction history',
      'Set savings goals and track progress',
      'Keep data local with backup and import tools',
    ],
    image: '/projectimages/fintra-promo.png',
    technologies: ['React', 'TypeScript', 'Dexie.js', 'IndexedDB', 'Recharts', 'Capacitor', 'PWA'],
    liveLink: 'https://getyourfintra.vercel.app/',
    githubLink: 'https://github.com/habibi58/AppBudget',
    featured: true,
  },
  {
    id: 'student-record-management',
    title: 'Student Record Management System',
    description: 'A web-based application for efficient student information management',
    fullDescription:
      'A comprehensive Student Record Management System designed to efficiently store, manage, and organize student information in a centralized platform.',
    features: [
      'Enrollment and registration tracking',
      'Grade/score management',
      'Import student data from Excel files',
      'Generate printable documents (prospectus, transcript of records, certificate)',
      'Data export for reports and documentation',
      'Dashboard with student statistics overview',
    ],
    image: '/projectimages/project1.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    liveLink: '#',
    githubLink: '#',
    featured: true,
  },
  {
    id: 'Farm Management System',
    title: 'Farm Management System',
    description: 'A system for managing farm operations and resources',
    fullDescription:
      'A comprehensive farm management system designed to streamline operations, track resources, and optimize productivity across various farming activities.',
    features: [
      'Age calculation and tracking for animals',
      'Egg collection and hatching management',
      'Financial dashboard with profit/loss overview',
      'Export data to CSV format (sales, expenses, eggs)',
      'Reports with summary statistics',
    ],
      image: '/projectimages/project2.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    liveLink: '#',
    githubLink: '#',
    featured: true,
  },
  {
    id: 'Diagnostic-Test-System',
    title: ' Student Diagnostic Test System',
    description: ' Student Diagnostic test System',
    fullDescription:
      'A full-featured diagnostic test management system built with PHP and MySQL. Supports multiple user roles (admin, teacher/proctor, student), exam creation and management, automated grading, result tracking, and comprehensive reporting tools with export capabilities.',
    features: [
      'User authentication and role-based access control (admin, teacher/proctor, student)',
      'Test taking functionality with timer and randomized question order',
      'Comprehensive result viewing and detailed analysis',
      'Export exam results to CSV and PDF formats',
      'Student result history and performance tracking',
    ],
    image: '/projectimages/project3.png',
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    liveLink: '#',
    githubLink: '#',
    featured: true,
  },
  {
    id: 'My Portfolio Website',
    title: 'My Portfolio Website',
    description: 'A responsive portfolio website to showcase projects and skills',
    fullDescription:
      'A modern, fully responsive portfolio website with smooth animations and a clean glassmorphism design, set on a starry background and optimized for both desktop and mobile devices.',
      features: [
      'Smooth animations and transitions',
      'Glassmorphism design aesthetic',
      'Contact form with validation',
      'Resend API integration for email delivery',
    ],
    image: '/projectimages/project4.png',
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS',],
    liveLink: '#',
    githubLink: '#',
    featured: false,
  },
    
];
