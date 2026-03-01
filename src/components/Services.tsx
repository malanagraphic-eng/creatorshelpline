import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Video, Globe, Megaphone, Image, Code2 } from 'lucide-react';

/** Services - Website Development (not Brand Development) */
const services = [
  { icon: Globe, title: 'Website Development', desc: 'Modern, responsive websites with exceptional UX and performance.' },
  { icon: Megaphone, title: 'Social Media Marketing', desc: 'Data-driven campaigns that build communities and drive engagement.' },
  { icon: Image, title: 'Graphic Designing', desc: 'Creative visual solutions across all mediums.' },
  { icon: Video, title: 'Video Editing', desc: 'Professional video content that engages your audience.' },
  { icon: Code2, title: 'UI/UX Design', desc: 'User-centered design for intuitive digital experiences.' },
];

export function Services() {
  return (
    <section id="services" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Our <span className="text-[#f97316]">Services</span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Comprehensive creative solutions designed to elevate your brand
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow dark:bg-neutral-900 dark:border-neutral-800">
                  <CardHeader>
                    <div className="mb-4 text-[#f97316]">
                      <Icon size={40} />
                    </div>
                    <CardTitle className="dark:text-white">{s.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-600 dark:text-neutral-400">{s.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
