// Portfolio Data - Education

export interface EducationItem {
  id: number;
  school: string;
  level: string;
  levelKey: 'c' | 's' | 'j' | 'e';
  course: string;
  location: string;
  years: string;
  icon: string;
  yearCount: number;
}

export const educationData: EducationItem[] = [
  {
    id: 1,
    school: 'Binangonan Cathoclic College',
    level: 'College',
    levelKey: 'c',
    course: 'Bachelor of Science in Information Technology',
    location: 'Binangonan, Rizal',
    years: '2022 – 2026',
    icon: '🎓',
    yearCount: 4,
  },
  {
    id: 2,
    school: 'Binangonan Cathoclic College',
    level: 'Senior High',
    levelKey: 's',
    course: 'STEM – Science, Technology, Engineering, and Mathematics',
    location: 'Binangonan, Rizal',
    years: '2019 – 2021',
    icon: '🏫',
    yearCount: 2,
  },
  {
    id: 3,
    school: 'Margarito A. Duavit National High School',
    level: 'Junior High',
    levelKey: 'j',
    course: '',
    location: 'Binangonan, Rizal',
    years: '2019 – 2020',
    icon: '📚',
    yearCount: 1,
  },
  {
    id: 4,
    school: 'New Era University',
    level: 'Junior High',
    levelKey: 'e',
    course: '',
    location: 'Quezon, City',
    years: '2018 – 2019',
    icon: '✏️',
    yearCount: 1,
  },
  {
    id: 5,
    school: 'Rubu’s Al Hekma Global School',
    level: 'Junior High',
    levelKey: 'e',
    course: '',
    location: 'Hail, Kingdom of Saudi Arabia',
    years: '2015 – 2018',
    icon: '✏️',
    yearCount: 3,
  },
  {
    id: 6,
    school: 'Llama International School',
    level: 'Junior High',
    levelKey: 'e',
    course: '',
    location: 'Hail, Kingdom of Saudi Arabia',
    years: '2009 – 2015',
    icon: '✏️',
    yearCount: 6,
  },
];