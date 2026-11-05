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
<<<<<<< Updated upstream
    id: 'Google-IT-Support',
    title: 'Google-IT-Support',
    issuer: 'Coursera',
    date: '2026',
    description: 'In progress',
    credentialUrl: '#',
    image: '/Certificatescredentials/Cert_demo.pdf',
=======
    id: 'openai-partner-network-cyber-solutions-practitioner',
    title: 'Cyber Solutions Practitioner',
    issuer: 'OpenAI Partner Network',
    credentialUrl: 'https://oaipartnernetwork.credential.net/663addec-1c96-4d44-94f4-77040a6c337f#acc.E9LX6zso',
    description: 'OpenAI Partner Network badge for Cyber Solutions Practitioner.',
    image: '/Certificatescredentials/openai-partner-network-cyber-solutions-practitioner.png',
  },
  {
    id: 'google-cloud-gemini-enterprise-agent-development',
    title: 'Certified Partner Specialist: Gemini Enterprise Agent Development',
    issuer: 'Google Cloud',
    description: 'Certified Partner Specialist credential for Gemini Enterprise agent development.',
    credentialUrl: '/Certificatescredentials/google-cloud-gemini-enterprise-agent-development.pdf',
    image: '/Certificatescredentials/google-cloud-gemini-enterprise-badge-transparent.png',
  },
  {
    id: 'google-cloud-gemini-enterprise-deployment',
    title: 'Certified Partner Specialist: Gemini Enterprise Deployment',
    issuer: 'Google Cloud',
    date: 'September 26, 2026',
    description: 'Certified Partner Specialist credential for Gemini Enterprise deployment.',
    credentialUrl: '/Certificatescredentials/google-cloud-gemini-enterprise-deployment.pdf',
    image: '/Certificatescredentials/google-cloud-gemini-enterprise-badge-transparent.png',
>>>>>>> Stashed changes
  },
  
];
