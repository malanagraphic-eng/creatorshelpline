import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './UI/card';

/** Professional SaaS/CRM/Dashboard UI images - Dribbble/Behance style with Unsplash fallbacks */
const works = [
  {
    title: 'SaaS Products',
    desc: 'Scalable software solutions with modern dashboards and analytics.',
    image:
      'https://cdn.dribbble.com/userupload/18350565/file/original-9e4dbb6e38b8ac5eac4089ecf1e2f1c5.png?resize=1200x900',
    fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
  },
  {
    title: 'CRM Systems',
    desc: 'Custom CRM platforms with pipeline views and data-driven insights.',
    image:
      'https://cdn.dribbble.com/userupload/18465113/file/original-7750bae92be504c7216cbae27afadf87.png?resize=1200x900',
    fallback: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200',
  },
  {
    title: 'Creator Portfolios',
    desc: 'Stunning portfolios that showcase your work and attract clients.',
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200',
    fallback: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200',
  },
  {
    title: 'PaaS Platforms',
    desc: 'Platform-as-a-service solutions that scale with your business.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
    fallback: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
  },
  {
    title: 'E-commerce Stores',
    desc: 'High-converting online stores with admin panels and analytics.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
    fallback: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
  },
  {
    title: 'Brand Identity Websites',
    desc: 'Websites that define your brand and drive conversions.',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
    fallback: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200',
  },
  {
    title: 'Dashboard UI/UX',
    desc: 'Intuitive dashboards for data-driven decisions and workflows.',
    image:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200',
    fallback: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200',
  },
  {
    title: 'Mobile App Landing Pages',
    desc: 'Landing pages that convert visitors into app downloads.',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200',
    fallback: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200',
  },
];

export function DevelopmentWorks() {
  return (
    <section id="development" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Our Development Works
          </h2>
          <p className="text-xl text-neutral-600">
            Pixel-perfect digital products that scale
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((work, i) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow rounded-xl group">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <DevelopmentImage
                    src={work.image}
                    fallback={work.fallback}
                    alt={work.title}
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-neutral-900/60 flex items-center justify-center rounded-t-xl"
                  >
                    <span className="text-white font-medium">View Project</span>
                  </motion.div>
                </div>
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">{work.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600">{work.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DevelopmentImage({
  src,
  fallback,
  alt,
}: {
  src: string;
  fallback: string;
  alt: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  );
}
