export const experienceData = [
  {
    id:            1,
    position:      'Deskop Support Technician - Intern',
    company:       'TTEC',
    duration:      'November 2025 – March 2026',
    location:      'Cainta, Rizal, Philippines',
    isCurrentRole: false,
    description: [
      'Assembled and disassembled desktop computers for maintenance, upgrades, and troubleshooting.',
      'Diagnosed and resolved basic IT problems (Windows OS, applications, connectivity)',
      'Provided basic troubleshooting support, including adjusting monitor settings and resolving minor hardware or display issues.',
      'Maintained accurate records of hardware assets, system units, monitors, and peripherals.',
      'Escalated complex issues to higher-level support teams.',
      'Maintained high customer satisfaction through clear communication and timely resolution',
    ],
    technologies: ['Windows OS', 'IGEL OS', 'Microsoft Office 365', 'Azure AD', 'PowerShell'],

    /* ── new fields ── */
    stats: [
      { count: 100, label: 'Users Supported'  },
      { count: 40,  label: '% Faster Resolve' },
      { count: 98,  label: 'Satisfaction %'   },
    ],
    bars: [
      { label: 'Technical Support', value: 92 },
      { label: 'Basic Network System', value: 78 },
    ],
    gallery: [
      {
        /* swap emoji for img once you have the file */
        img:   null,
        emoji: '🖥️',
        title: 'Helpdesk Dashboard',
        desc:  'ServiceNow ticketing dashboard showing queue metrics and resolution trends.',
      },
      {
        img:   '/public/Certificates/certficicatettec.png', // ← drop file in /public/certificates/
        emoji: '📜',
        title: 'Certficate of Completion',
        desc:  'Successfully completed 500 hours of training and hands-on experience, demonstrating dedication, professionalism, and continuous skill development.',
      },
      {
        img:   null,
        emoji: '🏆',
        title: 'Employee of the Month',
        desc:  'Awarded Q2 2024 for resolving a critical network outage within 30 minutes.',
      },
    ],
  },

];