import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const videos = [
  { id: 'sKSosCzBP14', title: 'Creative Video Showcase' },
  { id: 'CK1_fVz0wOE', title: 'Brand Story Video' },
  { id: '_PBkwXe05OY', title: 'Product Demo' },
  { id: 'jBHpf8EYw1M', title: 'Marketing Campaign' },
  { id: '937A_Ig93Ss', title: 'Social Media Content' },
  { id: 'egv1T3Hf7P4', title: 'Event Coverage' },
  { id: 'ZgxEeDiwocU', title: 'Client Testimonial Video' },
];

export function VideoWorks() {
  return (
    <section id="video" className="py-24 px-4 bg-neutral-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Our Video Creations
          </h2>
          <p className="text-xl text-neutral-600">
            High-quality video content that engages and converts
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-600">YouTube embed</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
