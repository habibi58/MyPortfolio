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
    technologies: ['Windows OS', 'Microsoft Office 365','IGEL OS', 'Ticketing Systems', 'Hardware & Software Troubleshooting' ],

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
        title: 'Desktop Support Dashboard',
        desc:  'Asknow ticketing system used for managing and tracking support requests, ensuring efficient issue resolution and customer satisfaction.',
      },
      {
        img:   '/Certificates/certficicatettec.png', // ← drop file in /public/certificates/
        emoji: '📜',
        title: 'Certficate of Completion',
        desc:  'Successfully completed 500 hours of training and hands-on experience, demonstrating dedication, professionalism, and continuous skill development.',
      },
      {
        img:   '/ttecgallery/tttecgal1.jpg',
        emoji: '🖼️',
        title: 'Workspace Setup',
        desc:  'The physical desktop support environment.',
        imgs:  [
          '/ttecgallery/tttecgal1.jpg',
          '/ttecgallery/tttecgal2.jpg',
          '/ttecgallery/tttecgal3.jpg',
          '/ttecgallery/tttecgal4.jpg',
          '/ttecgallery/tttecgal5.jpg',
          '/ttecgallery/tttecgal6.jpg',
          '/ttecgallery/tttecgal7.jpg',
          '/ttecgallery/tttecgal8.jpg',
          '/ttecgallery/tttecgal9.jpg',
          '/ttecgallery/tttecgal10.jpg',
          '/ttecgallery/tttecgal11.jpg',
          '/ttecgallery/tttecgal12.jpg',
          '/ttecgallery/tttecgal13.jpg',
        ],
      },
    ],
  },

];