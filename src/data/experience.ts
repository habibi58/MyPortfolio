export const experienceData = [
  {
    id:            1,
    position:      'IT Desk Support Intern',
    company:       'TTEC',
    duration:      'November 2025 – March 2026',
    location:      'Cainta, Rizal, Philippines',
    isCurrentRole: true,
    description: [
      'Provided Tier 1–2 technical support to 200+ end users across hardware and software.',
      'Reduced average ticket resolution time by 40% through knowledge base improvements.',
      'Configured and maintained Windows Active Directory, DNS, and DHCP services.',
    ],
    technologies: ['Windows OS', 'IGEL OS', '', 'Azure AD', 'PowerShell'],

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

  // ── second experience (add more the same way) ──
  {
    id:            2,
    position:      'Technical Support Engineer',
    company:       'Second Company',
    duration:      'Mar 2022 – Dec 2023',
    location:      'Quezon City, Philippines',
    isCurrentRole: false,
    description: [
      'Managed 500+ monthly support tickets with 60% resolved within SLA targets.',
      'Deployed and maintained VPN, firewall configs, and endpoint security tools.',
      'Trained 15 junior technicians reducing escalations by 35%.',
    ],
    technologies: ['Cisco', 'VPN', 'Jira', 'Windows 11', 'Linux'],
    stats: [
      { count: 500, label: 'Tickets Resolved' },
      { count: 60,  label: '% SLA Met'        },
      { count: 35,  label: '% Less Escalation'},
    ],
    bars: [
      { label: 'Network Troubleshooting', value: 88 },
      { label: 'System Administration',   value: 82 },
    ],
    gallery: [
      { img: null, emoji: '🔧', title: 'Network Config',  desc: 'Cisco switch and VLAN config for the company LAN upgrade.' },
      { img: '/certificates/itil.jpg', emoji: '📋', title: 'ITIL Foundation', desc: 'ITIL v4 certification in IT service management.' },
      { img: null, emoji: '🏅', title: 'Top Performer',   desc: 'Awarded Top Performer Q4 2023 for highest CSAT score.' },
    ],
  },
];