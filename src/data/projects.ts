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
    id: 'student-record-management',
    title: 'Student Record Management System',
    description: 'A web-based application for efficient student information management',
    fullDescription:
      'A comprehensive Student Record Management System designed to efficiently store, manage, and organize student information in a centralized platform.',
    features: [
      'Student profile management (add, edit, delete student records)',
      'Enrollment and registration tracking',
      'Attendance monitoring',
      'Grade/score management',
      'Search and filter student records',
      'Import student data from Excel files',
      'Export records to PDF format',
      'Generate printable documents (prospectus, transcript of records, certificate)',
      'Data export for reports and documentation',
      'Dashboard with student statistics overview',
      'Secure database storage for student information',
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
      'Livestock profile management (add, edit, delete animal records)',
      'Animal tracking with tag numbers, species, breed, and gender',
      'Livestock status monitoring (active, sold, deceased, transferred)',
      'Age calculation and tracking for animals',
      'Egg collection and hatching management',
      'Expense tracking with categories (feed, veterinary, equipment, etc.)',
      'Income and sales recording',
      'Financial dashboard with profit/loss overview',
      'Analytics with financial and production charts',
      'Monthly income vs expenses visualization',
      'Expense breakdown by category',
      'Export data to CSV format (sales, expenses, eggs)',
      'Reports with summary statistics',
      'User authentication and login system',
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
      'Student registration with real-time validation and duplicate checking',
      'Exam/test management (create, edit, delete, archive tests)',
      'Question and option management for multiple choice questions',
      'Test taking functionality with timer and randomized question order',
      'User management (add, edit, delete students, teachers, and admins)',
      'Result tracking with pass/fail status based on passing percentage',
      'Comprehensive result viewing and detailed analysis',
      'Export exam results to CSV and PDF formats',
      'School year management and assignment',
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
      'in progess',
    image: '/assets/projects/shop.png',
    technologies: ['React.js', 'TypeScript', 'Tailwind CSS',],
    liveLink: '#',
    githubLink: '#',
    featured: false,
  },
    
];
