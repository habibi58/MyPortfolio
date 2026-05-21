// Contact Section Component
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, Clock, CheckCircle2, Handshake } from 'lucide-react';
import { portfolioOwner } from '../data';
import { SectionHeading } from './SectionHeading';
import { Card } from './Card';
import { Button } from './Button';
import { containerVariants, itemVariants } from '../animations/variants';
import toast from 'react-hot-toast';

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      toast.success('Message sent successfully! I will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setIsLoading(false);
    }, 1500);

    // In production, you would send this to a backend or use EmailJS
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: portfolioOwner.email,
      link: `mailto:${portfolioOwner.email}`,
      color: 'from-blue-400 to-blue-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: portfolioOwner.phone,
      link: `tel:${portfolioOwner.phone}`,
      color: 'from-blue-600 to-blue-700',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: portfolioOwner.location,
      link: '#',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20 dark:opacity-10" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/[0.03] blur-[120px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 dark:bg-blue-500/[0.03] blur-[100px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="GET IN TOUCH"
          title="Contact Me"
          description="Have a question or want to discuss an opportunity? Feel free to reach out!"
        />

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <a href={method.link} className="block group">
                  <Card hover glass className="text-center">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${method.color} mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-display font-bold text-slate-900 dark:text-white mb-2">
                      {method.label}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm break-all">
                      {method.value}
                    </p>
                  </Card>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Form & Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* Form */}
          <motion.div variants={itemVariants}>
            <Card glass className="relative overflow-hidden">
              {/* Top gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700" />

              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-8 pt-2">
                Send me a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600/40 transition-all duration-300 text-slate-900 dark:text-white placeholder:text-slate-400"
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600/40 transition-all duration-300 text-slate-900 dark:text-white placeholder:text-slate-400"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600/40 transition-all duration-300 resize-none text-slate-900 dark:text-white placeholder:text-slate-400"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full group"
                >
                  <Send size={18} />
                  Send Message
                  <ArrowRight size={16} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Info Boxes */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Card gradient className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700" />
              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-5 pt-2">
                Quick Response
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                I usually respond to messages within 24 hours. Whether you have a question about
                IT support, web development, or collaboration opportunities, I'd love to hear from
                you!
              </p>
              <div className="space-y-4">
                {[
                  { icon: Clock, text: 'Quick response time' },
                  { icon: CheckCircle2, text: 'Professional approach' },
                  { icon: Handshake, text: 'Ready for collaboration' },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex gap-3 items-center">
                    <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <Icon size={14} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card glass>
              <h4 className="font-display font-bold text-slate-900 dark:text-white mb-4">
                Business Hours
              </h4>
              <ul className="space-y-3">
                {[
                  { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM' },
                  { day: 'Saturday', time: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', time: 'Available for urgent matters' },
                ].map(({ day, time }, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-600 dark:text-slate-400">{day}</span>
                    <span className="text-slate-500 dark:text-slate-500">{time}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
