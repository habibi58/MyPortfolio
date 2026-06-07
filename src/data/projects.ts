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
    id: 'inventory-management',
    title: 'Inventory Management System',
    description: 'Track IT hardware and software inventory across organization',
    fullDescription:
      'A comprehensive inventory management system for tracking IT assets, hardware, and software licenses. Features real-time tracking, alerts for low stock, and detailed reporting capabilities.',
    image: '/assets/projects/inventory.png',
    technologies: ['React.js', 'Firebase', 'Tailwind CSS', 'Chart.js'],
    liveLink: '#',
    githubLink: '#',
    featured: true,
  },
  {
    id: 'portfolio-website',
    title: 'Professional Portfolio Website',
    description: 'Responsive portfolio showcasing IT skills and projects',
    fullDescription:
      'A modern, responsive portfolio website built with React.js, Tailwind CSS, and Framer Motion. Features smooth animations, dark mode support, and is fully optimized for all devices.',
    image: '/assets/projects/portfolio.png',
    technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'React Router'],
    liveLink: '#',
    githubLink: '#',
    featured: true,
  },
  {
    id: 'computer-shop-system',
    title: 'Computer Shop Management System',
    description: 'Complete POS and inventory system for computer retail shop',
    fullDescription:
      'A complete Point of Sale (POS) and inventory management system for computer shops. Features include sales tracking, inventory management, customer management, and detailed analytics.',
    image: '/assets/projects/shop.png',
    technologies: ['React.js', 'Python', 'SQLite', 'Electron', 'Redux'],
    liveLink: '#',
    githubLink: '#',
    featured: false,
  },
    
];
