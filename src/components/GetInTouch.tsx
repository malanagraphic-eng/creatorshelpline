import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './UI/card';

const contactItems = [
  {
    icon: Mail,
    title: 'Email',
    content: 'info@creatorshelpline.com',
    href: 'mailto:info@creatorshelpline.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+92 329 2982262',
    href: 'tel:+923292982262',
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'Multan, Pakistan',
    href: 'https://maps.google.com/?q=Multan,Pakistan',
  },
];

export function GetInTouch() {
  return (
    <section id="contact" className="py-24 px-4 bg-neutral-50">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-neutral-600">
            Ready to bring your vision to life? Let&apos;s talk!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="block"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <CardHeader>
                    <motion.div
                      className="flex justify-center mb-4 text-[#f97316]"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                    >
                      <Icon size={40} />
                    </motion.div>
                    <CardTitle className="text-center text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-neutral-600 text-lg">{item.content}</p>
                  </CardContent>
                </Card>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
