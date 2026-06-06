// Portfolio Data - Certifications

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  image?: string;
}

export const certificationsData: Certification[] = [
  {
    id: 'google-it-support',
    title: 'Google IT Support Professional',
    issuer: 'Google',
    date: '2024',
    description: 'Professional certification in IT support fundamentals and practices',
    credentialUrl: '#',
    image: '/Certificatescredentials/Cert_demo.pdf',
  },
  {
    id: 'networking-fundamentals',
    title: 'Networking Fundamentals',
    issuer: 'CompTIA/Coursera',
    date: '2024',
    description: 'Foundation certification for networking concepts and protocols',
    credentialUrl: '#',
    image: '/Certificatescredentials/Cert_demo.pdf',
  },
  {
    id: 'web-development',
    title: 'Web Development Basics',
    issuer: 'Udemy',
    date: '2024',
    description: 'Comprehensive course in HTML, CSS, and JavaScript fundamentals',
    credentialUrl: '#',
    image: '/Certificatescredentials/Cert_demo.pdf',
  },
  {
    id: 'technical-support',
    title: 'Technical Support Training',
    issuer: 'Professional Institute',
    date: '2023',
    description: 'Advanced training in technical support best practices',
    credentialUrl: '#',
    image: '/Certificatescredentials/Cert_demo.pdf',
  },
  {
    id: 'microsoft-office',
    title: 'Microsoft Office Specialist',
    issuer: 'Microsoft',
    date: '2024',
    description: 'Expert-level certification in Microsoft Office Suite',
    credentialUrl: '#',
    image: '/Certificatescredentials/Cert_demo.pdf',
  },
];
