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
    id: 'Civil-Service-Exam',
    title: 'Civil-Service-Exam',
    issuer: 'School',
    date: '2026',
    description: 'In Releasing',
    credentialUrl: '#',
    image: '/Certificatescredentials/Cert_demo.pdf',
  },
  {
    id: 'Google-IT-Support',
    title: 'Google-IT-Support',
    issuer: 'Coursera',
    date: '2026',
    description: 'In progress',
    credentialUrl: '#',
    image: '/Certificatescredentials/Cert_demo.pdf',
  },
  
];
