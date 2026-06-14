# Jason's Professional Portfolio

A modern, responsive, and fully animated portfolio website built with React.js, Tailwind CSS, and Framer Motion. This portfolio showcases IT support experience, technical skills, projects, and certifications.

---

## ⚠️ IMPORTANT NOTICE

**Copyright © 2026 Mohamad Jason Celoza. All Rights Reserved.**

This portfolio website and its entire content, including but not limited to:
- Source code
- Design elements
- Images and graphics
- Text content
- Animations and effects
- Configuration files

are the exclusive property of Mohamad Jason Celoza and are protected by copyright laws.

**Unauthorized use, reproduction, modification, distribution, or display of any part of this portfolio is strictly prohibited without express written permission from the copyright owner.**

### Ownership Statement
This repository and its contents are owned and maintained by Mohamad Jason Celoza. Any use of this code, design, or content for commercial purposes, portfolio templates, or redistribution requires explicit permission from the owner.

### Contact for Permissions
For inquiries regarding permissions, licensing, or any questions about this portfolio, please contact the owner through the contact form on the website or via email.

---

## 🚀 Features

### ✨ Design & UX
- **Modern Glassmorphism Design**: Beautiful glass-effect cards and components
- **Smooth Animations**: Powered by Framer Motion for engaging interactions
- **Dark Mode Support**: Toggle between light and dark themes
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Premium Gradients**: Eye-catching gradient effects throughout
- **Sticky Navigation**: Smart navbar that hides on scroll down
- **Scroll-to-top Button**: Easy navigation for longer pages

### 📱 Sections
1. **Hero Section**: Eye-catching landing with typing effect and CTA buttons
2. **About Me**: Personal introduction and key highlights
3. **Skills**: Categorized skills with animated progress bars
4. **Experience**: Timeline view of professional experience
5. **Projects**: Beautiful project cards with featured and regular projects
6. **Certifications**: Certification cards with credential links
7. **Contact**: Contact form and business information

### 🛠️ Technical Features
- Built with **React.js** + **Vite** for lightning-fast development
- **TypeScript** for type-safe code
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Router** for seamless navigation
- **Lucide React** for beautiful icons
- **React Hot Toast** for notifications
- Custom hooks for reusable logic
- Fully componentized architecture
- SEO-friendly structure
- Production-ready code

## 📋 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
- **Language**: TypeScript
- **Email**: EmailJS (ready to integrate)

## 🎨 Color Scheme

- **Primary**: Cyan (#0ea5e9) to Blue (#0369a1) gradient
- **Dark Mode**: Slate grays with cyan accents
- **Light Mode**: White backgrounds with blue accents

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn

### Steps

1. **Clone or navigate to the project directory**
   ```bash
   cd "my portfolio pro"
   ```

2. **Install dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The portfolio will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ExperienceSection.tsx
│   ├── ProjectsSection.tsx
│   ├── CertificationsSection.tsx
│   └── ContactSection.tsx
├── pages/              # Page components
│   └── Home.tsx
├── data/               # Portfolio content
│   ├── portfolio.ts
│   ├── skills.ts
│   ├── experience.ts
│   ├── projects.ts
│   └── certifications.ts
├── hooks/              # Custom React hooks
│   ├── useDarkMode.ts
│   ├── useScroll.ts
│   ├── useInView.ts
│   └── useWindowSize.ts
├── animations/         # Animation variants
│   └── variants.ts
├── utils/              # Utility functions
│   ├── cn.ts
│   └── helpers.ts
├── styles/             # Global styles
│   └── globals.css
├── index.css           # Tailwind directives
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🎯 How to Customize

### Update Portfolio Information
Edit `src/data/portfolio.ts` to update:
- Name and title
- Email and phone
- Social media links
- Bio and introduction

### Add/Edit Skills
Edit `src/data/skills.ts`:
- Add new skills with proficiency levels
- Create new categories

### Modify Experience
Edit `src/data/experience.ts`:
- Update job titles, companies, dates
- Add descriptions and technologies used

### Showcase Projects
Edit `src/data/projects.ts`:
- Add project images and descriptions
- Update GitHub and live demo links
- Set featured projects

### Add Certifications
Edit `src/data/certifications.ts`:
- Add new certifications
- Include credential links

### Change Colors
Edit `tailwind.config.js` to modify:
- Primary colors
- Gradient combinations
- Custom animations

## 🔧 Configuration Files

- **tailwind.config.js**: Tailwind CSS configuration with custom colors and animations
- **postcss.config.js**: PostCSS configuration for Tailwind
- **vite.config.ts**: Vite build configuration
- **tsconfig.json**: TypeScript configuration

## 📝 Features Included

### Animations
- ✅ Fade in/out transitions
- ✅ Slide animations
- ✅ Scale and bounce effects
- ✅ Stagger animations for lists
- ✅ Parallax-like effects
- ✅ Hover animations
- ✅ Typing effect in hero
- ✅ Floating animations

### Interactions
- ✅ Smooth scroll navigation
- ✅ Active section highlighting in navbar
- ✅ Mobile hamburger menu
- ✅ Dark/Light mode toggle
- ✅ Contact form with validation
- ✅ Skill category filtering
- ✅ Project filtering (featured/all)
- ✅ Intersection observer for scroll animations

### Performance
- ✅ Optimized bundle size with Vite
- ✅ Lazy loading animations
- ✅ Efficient re-renders with React
- ✅ CSS-in-JS optimizations
- ✅ Image optimization ready

## 📧 Email Integration (Optional)

To integrate email sending:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get your service ID, template ID, and public key
3. Update the contact form in `src/components/ContactSection.tsx`

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### GitHub Pages
1. Update vite.config.ts with your repository name
2. Run `npm run build`
3. Push the dist folder to gh-pages branch

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ⚡ Performance Tips

1. Optimize project images (use WebP format)
2. Compress all images under 100KB
3. Use CDN for deployment
4. Enable gzip compression on server
5. Monitor Core Web Vitals

## 👨‍💻 About Jason

**Jason** - IT Graduate & Technical Support Specialist
- Location: Rizal, Philippines
- Experience: Desktop Support Intern, 1.5+ years IT experience
- Passion: Technology, IT support, troubleshooting, and web development
- Goals: Become an expert IT Support Professional

## 📄 License

**Copyright © 2026 Mohamad Jason Celoza. All Rights Reserved.**

This portfolio is proprietary software and is protected by copyright laws. See the [LICENSE](LICENSE) file for the full copyright notice and terms of use.

**Unauthorized use, reproduction, modification, distribution, or display of this portfolio is strictly prohibited without express written permission from the copyright owner.**

---

**Version**: 1.0.0 | Built with ❤️ using React, Tailwind CSS, and Framer Motion
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
