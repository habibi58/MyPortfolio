// About Section Component
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { stats } from '../data';
import { SectionHeading } from './SectionHeading';
import { Card } from './Card';
import { containerVariants, itemVariants } from '../animations/variants';
import Lanyard from './Lanyard';
import ScrollReveal from './ScrollReveal';

const AnimatedCounter = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const numMatch = value.match(/[\d.]+/);
  const suffixMatch = value.match(/[^\d.]+/);
  
  const numValue = numMatch ? parseFloat(numMatch[0]) : 0;
  const suffix = suffixMatch ? suffixMatch[0] : '';
  const isFloat = value.includes('.');

  const springValue = useSpring(0, {
    bounce: 0,
    duration: 2500,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(numValue);
    }
  }, [isInView, numValue, springValue]);

  const displayValue = useTransform(springValue, (current) => {
    return (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
  });

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};

export const AboutSection = () => {
  return (
    <section id="about" style={{ marginBottom: '200px' }} className="relative min-h-screen py-24 overflow-visible flex flex-col justify-center">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/[0.02] blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-400/[0.02] blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="ABOUT ME"
          title=""
        />

        {/* Explicit spacer below the heading */}
        <div style={{ height: '30px' }} aria-hidden="true" />

        {/* Two-column layout: Text left, Lanyard right */}
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 mb-0 items-center overflow-visible">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex flex-col gap-10">
              {[
                {
                  title: 'Passionate About Technology',
                  text: `Passionate about technology and problem-solving, with a strong interest in building modern digital solutions. I am continuously learning and improving my skills to create efficient, reliable, and impactful systems that support real-world needs.`,
                },
                {
                  title: 'My Interests & Expertise',
                  text: `I am interested in learning web development, cloud computing, and programming. I am passionate about building efficient solutions and continuously improving my knowledge of modern technologies.`,
                },
                {
                  title: 'Career Goals',
                  text: `I have a strong background in technology with growing skills in web development, cloud technologies, and programming. I am passionate about building efficient solutions, solving technical problems, and continuously improving my knowledge of modern systems and tools.`,
                },
              ].map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="group">
                  <h3 className="font-display text-xl font-bold mb-3 text-white flex items-center gap-3">
                    <span className="h-8 w-1 rounded-full bg-gradient-to-b from-blue-600 to-blue-700" />
                    {item.title}
                  </h3>
                  <ScrollReveal
                    baseOpacity={0.1}
                    enableBlur
                    baseRotation={3}
                    blurStrength={4}
                    containerClassName="!text-base !font-normal"
                    textClassName="text-sm text-slate-400 leading-relaxed pl-4">
                    {item.text}
                  </ScrollReveal>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Lanyard */}
         {/* Right: Lanyard */}
{/* Right: Lanyard */}
<motion.div
  className="relative w-full h-[500px] hidden lg:block -mt-24 overflow-visible"
  initial={{ opacity: 0, y: -300 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.5 }}
  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
>
  <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />
</motion.div>
        </div>

        {/* Forced spacer because tailwind JIT is lagging */}
        <div style={{ height: '56px' }} aria-hidden="true" />

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card glass className="text-center group">
                <h3 className="font-display text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter value={stat.value} />
                </h3>
                <p className="text-sm font-medium text-slate-400">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};