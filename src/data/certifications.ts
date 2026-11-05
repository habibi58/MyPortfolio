// Portfolio Data - Certifications

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
  image?: string;
}

export const certificationNotice = {
  message: 'Some certifications are not listed here. Additional credentials are available on Credly and LinkedIn.',
  links: [
    { label: 'Credly', url: 'https://www.credly.com/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
  ],
};

export const certificationsData: Certification[] = [
  {
    id: 'accenture-reinvention-with-agentic-ai',
    title: 'Reinvention with Agentic AI Learning Program',
    issuer: 'Accenture',
    date: 'August 28, 2026',
    credentialUrl: '/Certificatescredentials/accenture-reinvention-with-agentic-ai-certificate.png',
    description: 'Learning program powered in part by HAI.',
    image: '/Certificatescredentials/accenture-reinvention-with-agentic-ai-badge.png',
  },
  {
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
    image: '/Certificatescredentials/google-cloud-gemini-enterprise-badge.png',
  },
  {
    id: 'google-cloud-gemini-enterprise-deployment',
    title: 'Certified Partner Specialist: Gemini Enterprise Deployment',
    issuer: 'Google Cloud',
    date: 'September 26, 2026',
    description: 'Certified Partner Specialist credential for Gemini Enterprise deployment.',
    credentialUrl: '/Certificatescredentials/google-cloud-gemini-enterprise-deployment.pdf',
    image: '/Certificatescredentials/google-cloud-gemini-enterprise-badge.png',
  },
];
