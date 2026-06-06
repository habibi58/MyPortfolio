// Contact Section Component
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2, Handshake } from 'lucide-react';
import { portfolioOwner } from '../data';
import toast from 'react-hot-toast';

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      toast.success('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsLoading(false);
    }, 1500);
  };

  const contactMethods = [
    { icon: Mail,   label: 'Email',    value: portfolioOwner.email    },
    { icon: Phone,  label: 'Phone',    value: portfolioOwner.phone    },
    { icon: MapPin, label: 'Location', value: portfolioOwner.location },
  ];

  const sectionVariants = {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.05 },
    },
  };

  const leftColVariants = {
    hidden:  { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const rightColVariants = {
    hidden:  { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const colChildrenVariants = {
    hidden:  { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.25 },
    },
  };

  const fadeUpVariants = {
    hidden:  { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardSurface: React.CSSProperties = {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.14)',
    padding: '8px',
  };

  const inputSurface: React.CSSProperties = {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.14)',
  };

  return (
    <section id="contact" className="relative py-24 mt-16 mb-16 overflow-hidden bg-black">
      {/* ↓ gradient orbs removed ↓ */}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4"
        >
          {/* ── LEFT column ── */}
          <motion.div variants={leftColVariants} className="flex flex-col gap-10 p-16">
            <motion.div variants={colChildrenVariants} className="flex flex-col gap-10">

              {/* Available for work badge */}
             <motion.div variants={fadeUpVariants}>
            <div
              className="inline-flex items-center gap-4 px-8 py-3.5 rounded-full w-fit"
              style={{
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.3)',
                minWidth: '150px',
                minHeight: '30px',
                paddingLeft: '10px',
                paddingRight: '10px',
              }}
              >
            <span className="relative flex h-3.5 w-3.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: '#22c55e' }}
              />
              <span
                className="relative inline-flex rounded-full h-3.5 w-3.5"
                style={{ background: '#22c55e' }}
              />
            </span>
              <span className="text-xs font-semibold" style={{ color: '#4ade80' }}>
            Available for work
          </span>
          </div>
        </motion.div>

              {/* Headline */}
              <motion.div variants={fadeUpVariants}>
                <h2 className="text-4xl font-bold text-white leading-tight mb-4">
                  Let's work<br />together.
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Have a project in mind, a role to fill, or just want to say hello?
                  My inbox is always open — I'll get back to you within 24 hours.
                </p>
              </motion.div>

              {/* Contact rows */}
              <motion.div variants={fadeUpVariants} className="flex flex-col gap-3">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                      style={cardSurface}
                    >
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0"
                        style={{
                          background: 'rgba(91,141,238,0.15)',
                          border: '1px solid rgba(91,141,238,0.3)',
                        }}
                      >
                        <Icon size={17} style={{ color: '#5b8dee' }} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span
                          className="text-xs font-medium"
                          style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}
                        >
                          {method.label.toUpperCase()}
                        </span>
                        <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.75)' }}>
                          {method.value}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Quick facts */}
              <motion.div variants={fadeUpVariants} className="grid grid-cols-3 gap-3">
                {[
                  { icon: Clock,        text: '24h response'  },
                  { icon: CheckCircle2, text: 'Professional'  },
                  { icon: Handshake,    text: 'Open to collab' },
                ].map(({ icon: Icon, text }, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2.5 py-5 px-3 rounded-xl text-center"
                    style={cardSurface}
                  >
                    <Icon size={16} style={{ color: '#5b8dee' }} />
                    <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {text}
                    </span>
                  </div>
                ))}
              </motion.div>

            </motion.div>
          </motion.div>

          {/* ── RIGHT column ── */}
          <motion.div variants={rightColVariants} className="flex flex-col gap-8">
            <motion.div variants={colChildrenVariants} className="flex flex-col gap-8">

              {/* Form card */}
              <motion.div
                variants={fadeUpVariants}
                className="rounded-lg flex flex-col"
                style={{ ...cardSurface, padding: '20px' }}
              >
                <h3 className="text-3xl font-bold text-white mb-7">Send a message</h3>

                <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { label: 'YOUR NAME',     name: 'name',  type: 'text',  placeholder: 'John Doe'         },
                      { label: 'EMAIL ADDRESS', name: 'email', type: 'email', placeholder: 'john@example.com' },
                    ].map((field) => (
                      <div key={field.name}>
                        <label
                          className="block text-xs font-medium mb-2"
                          style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required
                          className="w-full rounded-md text-sm outline-none text-white placeholder:text-slate-500 transition-all duration-200"
                          style={{ ...inputSurface, paddingLeft: '8px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px' }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(91,141,238,0.6)'; }}
                          onBlur={(e)  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      className="block text-xs font-medium mb-2"
                      style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}
                    >
                      MESSAGE
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project or opportunity..."
                      required
                      rows={5}
                      className="w-full rounded-md text-sm outline-none resize-none text-white placeholder:text-slate-500 transition-all duration-200"
                      style={{ ...inputSurface, paddingLeft: '8px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px' }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(91,141,238,0.6)'; }}
                      onBlur={(e)  => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; }}
                    />
                  </div>

                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Mon–Fri 9am–6pm · Sat 10am–4pm · Sun urgent only
                  </p>
                </form>
              </motion.div>

              {/* Submit button */}
              <motion.button
               className="w-full rounded-md text-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50"
                style={{
                  background: 'rgba(91,141,238,0.18)',
                  border: '1px solid rgba(91,141,238,0.45)',
                  color: '#7aabff',
                  height: '50px',
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.background = 'rgba(91,141,238,0.3)';
                    e.currentTarget.style.boxShadow = '0 0 28px rgba(91,141,238,0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(91,141,238,0.18)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Send size={24} />
                {isLoading ? 'Sending...' : 'Send Message'}
              </motion.button>

            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};