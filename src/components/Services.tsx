import { motion } from 'framer-motion';
import { Video, Globe, Megaphone, Image, Code2, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    desc: 'Modern, responsive websites with exceptional UX and performance.',
    features: ['Custom Web Apps', 'E-commerce', 'Landing Pages'],
    color: 'from-blue-500/20 to-cyan-500/20',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    icon: Megaphone,
    title: 'Social Media Marketing',
    desc: 'Data-driven campaigns that build communities and drive engagement.',
    features: ['Content Strategy', 'Ad Campaigns', 'Analytics'],
    color: 'from-pink-500/20 to-rose-500/20',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-500',
  },
  {
    icon: Image,
    title: 'Graphic Designing',
    desc: 'Creative visual solutions across all mediums.',
    features: ['Brand Identity', 'Print Design', 'Packaging'],
    color: 'from-purple-500/20 to-violet-500/20',
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
  },
  {
    icon: Video,
    title: 'Video Editing',
    desc: 'Professional video content that engages your audience.',
    features: ['YouTube Content', 'Reels & Shorts', 'Motion Graphics'],
    color: 'from-red-500/20 to-orange-500/20',
    iconBg: 'bg-red-500/10',
    iconColor: 'text-red-500',
  },
  {
    icon: Code2,
    title: 'UI/UX Design',
    desc: 'User-centered design for intuitive digital experiences.',
    features: ['Wireframing', 'Prototyping', 'User Research'],
    color: 'from-emerald-500/20 to-teal-500/20',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
];

export function Services() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#f97316]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#f97316]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#f97316]/10 text-[#f97316] text-sm font-semibold uppercase tracking-wider mb-4"
          >
            What We Do
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-5">
            Our <span className="text-[#f97316]">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Comprehensive creative solutions designed to elevate your brand and drive real results
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {services.map((s, i) => {
            const Icon = s.icon;
            const isHovered = hovered === i;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  'group relative rounded-2xl p-[1px] transition-all duration-300',
                  isHovered ? 'scale-[1.02]' : ''
                )}
              >
                {/* Gradient border on hover */}
                <div
                  className={cn(
                    'absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300',
                    s.color,
                    isHovered && 'opacity-100'
                  )}
                />

                <div className="relative h-full rounded-2xl bg-white dark:bg-neutral-900 p-7 flex flex-col border border-neutral-200/60 dark:border-neutral-800 group-hover:border-transparent transition-colors">
                  {/* Icon */}
                  <div
                    className={cn(
                      'w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300',
                      s.iconBg,
                      isHovered && 'scale-110'
                    )}
                  >
                    <Icon className={cn('h-7 w-7', s.iconColor)} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">
                    {s.title}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 dark:text-neutral-400 text-[15px] leading-relaxed mb-5">
                    {s.desc}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mt-auto mb-5">
                    {s.features.map(f => (
                      <span
                        key={f}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 text-sm font-medium text-[#f97316] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#f97316] text-white font-semibold hover:bg-[#ea6c08] transition-colors shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
          >
            Start Your Project
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
