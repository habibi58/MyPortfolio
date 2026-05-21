// Portfolio Data - Projects

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    id: 'helpdesk-ticketing',
    title: 'IT Helpdesk Ticketing System',
    description: 'A comprehensive ticket management system for IT support teams',
    fullDescription:
      'A full-stack helpdesk ticketing system designed to manage IT support requests efficiently. Users can create tickets, track their status, and receive updates. Support staff can manage, prioritize, and resolve issues.',
    image: '/assets/projects/helpdesk.png',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
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
  {
    id: 'network-diagnostic-tool',
    title: 'Network Diagnostic Tool',
    description: 'Network monitoring and diagnostic utility for IT support',
    fullDescription:
      'A powerful network diagnostic tool that helps IT support teams quickly identify and resolve network issues. Features ping, traceroute, DNS lookup, and network speed testing.',
    image: '/assets/projects/network-tool.png',
    technologies: ['Python', 'PyQt5', 'Socket Programming', 'Threading'],
    liveLink: '#',
    githubLink: '#',
    featured: false,
  },
  {
    id: 'ticket-automation',
    title: 'Ticket Automation System',
    description: 'Automated ticket categorization and routing system',
    fullDescription:
      'An intelligent system that automatically categorizes and routes support tickets based on content analysis. Uses machine learning to improve categorization over time.',
    image: '/assets/projects/automation.png',
    technologies: ['Python', 'Machine Learning', 'NLP', 'FastAPI'],
    liveLink: '#',
    githubLink: '#',
    featured: false,
  },
];
