import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Play } from 'lucide-react';

const FALLBACK_IMAGE = 'https://placehold.co/600x400?text=Project';

/** Thumbnails from public/assets/thumbmails/ - 1.png to 11.png */
const getThumbPaths = () => {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') || '';
  return Array.from({ length: 11 }, (_, i) => `${base}/assets/thumbmails/${i + 1}.png`);
};

const thumbnailPaths = getThumbPaths();
const thumbnailTitles = [
  'YouTube Thumbnail Pack 1', 'Creative Thumbnail Design', 'Viral-Style Thumbnail',
  'Branded Thumbnail Set', 'Engagement-Focused Design', 'Professional Thumbnail',
  'Eye-Catching Thumbnail', 'Trending Style Thumbnail', 'Custom Thumbnail Series',
  'High CTR Thumbnail', 'Premium Thumbnail Design',
];

type ProjectMedia = 'image' | 'youtube';
interface Project {
  title: string;
  desc: string;
  image: string;
  tags: string[];
  client?: string;
  year?: string;
  mediaType?: ProjectMedia;
  videoId?: string;
}

/** Graphics - relevant images for each project */
const graphicsProjects: Project[] = [
  {
    title: 'Brand Identity Design',
    desc: 'Complete brand transformation with modern visual identity and strategic positioning for a tech startup.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
    tags: ['Branding', 'Logo', 'Identity'],
    client: 'TechStart Inc.',
    year: '2025',
  },
  {
    title: 'Marketing Graphics Suite',
    desc: 'Comprehensive graphic design system for startup branding, including social assets and print materials.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    tags: ['Graphics', 'Marketing', 'Print'],
    client: 'GrowthCo',
    year: '2025',
  },
  {
    title: 'Social Media Assets',
    desc: 'Engaging visuals and templates that drive audience engagement across Instagram, Facebook, and LinkedIn.',
    image: 'https://images.unsplash.com/photo-1611262588024-d4a415ebbda3?w=800',
    tags: ['Social', 'Templates', 'Design'],
    client: 'Creator Brand',
    year: '2024',
  },
  {
    title: 'Logo & Packaging Design',
    desc: 'Memorable logos and packaging that convert shelf browsers into loyal customers.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    tags: ['Logo', 'Packaging', 'Product'],
    client: 'ProductCo',
    year: '2024',
  },
  {
    title: 'Print Design',
    desc: 'High-quality print materials including brochures, flyers, and business cards.',
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800',
    tags: ['Print', 'Brochure', 'Design'],
    client: 'PrintCo',
    year: '2024',
  },
];

/** Video projects - show YouTube iframe directly, no images */
const videoProjects: Project[] = [
  {
    title: 'Creative Video Showcase',
    desc: 'High-quality video content that engages and converts.',
    image: '',
    tags: ['Video', 'YouTube', 'Content'],
    mediaType: 'youtube',
    videoId: 'sKSosCzBP14',
  },
  {
    title: 'Brand Story Video',
    desc: 'Compelling brand storytelling through video.',
    image: '',
    tags: ['Brand', 'Story', 'Video'],
    mediaType: 'youtube',
    videoId: 'CK1_fVz0wOE',
  },
  {
    title: 'Product Demo',
    desc: 'Dynamic product demos that drive conversions.',
    image: '',
    tags: ['Product', 'Demo', 'Commercial'],
    mediaType: 'youtube',
    videoId: '_PBkwXe05OY',
  },
  {
    title: 'Marketing Campaign',
    desc: 'Viral video content delivering 2M+ views across platforms.',
    image: '',
    tags: ['Marketing', 'Campaign', 'Social'],
    mediaType: 'youtube',
    videoId: 'jBHpf8EYw1M',
  },
  {
    title: 'Social Media Content',
    desc: 'Engaging YouTube content that drives subscribers.',
    image: '',
    tags: ['YouTube', 'Social', 'Content'],
    mediaType: 'youtube',
    videoId: '937A_Ig93Ss',
  },
  {
    title: 'Event Coverage',
    desc: 'Professional event coverage and highlights.',
    image: '',
    tags: ['Event', 'Coverage', 'Video'],
    mediaType: 'youtube',
    videoId: 'egv1T3Hf7P4',
  },
  {
    title: 'Client Testimonial Video',
    desc: 'Authentic client testimonials that build trust.',
    image: '',
    tags: ['Testimonial', 'Client', 'Video'],
    mediaType: 'youtube',
    videoId: 'ZgxEeDiwocU',
  },
];

/** Website & Development - each project has unique, meaningful image (no repeats) */
const webDevProjects: Project[] = [
  {
    title: 'E-commerce Platform',
    desc: 'Modern responsive e-commerce platform with 150% conversion boost and seamless checkout.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    tags: ['E-commerce', 'React', 'UX'],
    client: 'Shopify Partner',
    year: '2025',
  },
  {
    title: 'Corporate Website',
    desc: 'Professional corporate website redesign with improved UX and conversion rates.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    tags: ['Corporate', 'Web', 'Redesign'],
    client: 'Enterprise Corp',
    year: '2024',
  },
  {
    title: 'SaaS Dashboard',
    desc: 'Intuitive SaaS dashboard with real-time analytics and data visualization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    tags: ['SaaS', 'Dashboard', 'Analytics'],
    client: 'DataFlow',
    year: '2025',
  },
  {
    title: 'Portfolio Website',
    desc: 'Stunning portfolio website showcasing creative work and client testimonials.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    tags: ['Portfolio', 'Creative', 'Design'],
    client: 'Studio X',
    year: '2024',
  },
  {
    title: 'CRM Systems',
    desc: 'Custom CRM platforms with pipeline views and data-driven insights.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800',
    tags: ['CRM', 'Pipeline', 'Data'],
    client: 'DataFlow',
    year: '2025',
  },
  {
    title: 'Creator Portfolios',
    desc: 'Stunning portfolios that showcase work and attract clients.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    tags: ['Portfolio', 'Creative', 'Design'],
  },
  {
    title: 'PaaS Platforms',
    desc: 'Platform-as-a-service solutions that scale with your business.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    tags: ['PaaS', 'Platform', 'Scale'],
  },
  {
    title: 'E-commerce Stores',
    desc: 'High-converting online stores with admin panels and analytics.',
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800',
    tags: ['E-commerce', 'Store', 'Admin'],
  },
  {
    title: 'Brand Identity Websites',
    desc: 'Websites that define your brand and drive conversions.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    tags: ['Brand', 'Identity', 'Web'],
  },
  {
    title: 'Dashboard UI/UX',
    desc: 'Intuitive dashboards for data-driven decisions and workflows.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
    tags: ['Dashboard', 'UI/UX', 'Data'],
  },
  {
    title: 'Mobile App Landing Pages',
    desc: 'Landing pages that convert visitors into app downloads.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800',
    tags: ['Mobile', 'Landing', 'App'],
  },
];

export function Projects() {
  const [preview, setPreview] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 px-4 md:mx-6 lg:mx-8 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Our Projects
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Discover the creative solutions that drive results
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex flex-wrap justify-center gap-2 mb-12 bg-white dark:bg-neutral-800 p-1">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="video">Video Editing</TabsTrigger>
            <TabsTrigger value="thumbnails">Thumbnails</TabsTrigger>
            <TabsTrigger value="graphics">Graphics Design</TabsTrigger>
            <TabsTrigger value="webdev">Website & Development</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <ProjectGrid
              items={[...graphicsProjects, ...videoProjects, ...webDevProjects]}
              onPreview={setPreview}
            />
          </TabsContent>
          <TabsContent value="video">
            <VideoGrid items={videoProjects} onPreview={setPreview} />
          </TabsContent>
          <TabsContent value="thumbnails">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {thumbnailPaths.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow rounded-xl cursor-pointer"
                    onClick={() =>
                      setPreview({
                        title: thumbnailTitles[i] ?? `Thumbnail ${i + 1}`,
                        desc: 'Professional thumbnail design for YouTube and social media.',
                        image: src,
                        tags: ['Thumbnail', 'YouTube', 'Design'],
                      })
                    }
                  >
                    <div className="aspect-video overflow-hidden">
                      <ThumbnailImage src={src} alt={thumbnailTitles[i] ?? ''} fallback={FALLBACK_IMAGE} />
                    </div>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base dark:text-white">
                        {thumbnailTitles[i] ?? `Thumbnail ${i + 1}`}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="graphics">
            <ProjectGrid items={graphicsProjects} onPreview={setPreview} />
          </TabsContent>
          <TabsContent value="webdev">
            <ProjectGrid items={webDevProjects} onPreview={setPreview} />
          </TabsContent>
        </Tabs>
      </div>

      <ProjectPreviewModal project={preview} onClose={() => setPreview(null)} />
    </section>
  );
}

function ThumbnailImage({ src, alt, fallback }: { src: string; alt: string; fallback: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      className="w-full h-full object-cover rounded-t-xl"
    />
  );
}

/** Video grid - YouTube iframe directly in card, no images */
function VideoGrid({
  items,
  onPreview,
}: {
  items: Project[];
  onPreview: (p: Project) => void;
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items
        .filter((item) => item.videoId)
        .map((item, i) => (
          <motion.div
            key={item.title + i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -8 }}
          >
            <Card
              className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow rounded-xl cursor-pointer dark:bg-neutral-900 dark:border-neutral-800"
              onClick={() => onPreview(item)}
            >
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${item.videoId}`}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl dark:text-white">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#f97316]/15 text-[#f97316] text-xs font-medium rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
    </div>
  );
}

function ProjectGrid({
  items,
  onPreview,
}: {
  items: Project[];
  onPreview: (p: Project) => void;
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, i) => {
        const isVideo = item.mediaType === 'youtube' && item.videoId;
        return (
          <motion.div
            key={item.title + i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -8 }}
          >
            <Card
              className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow rounded-xl cursor-pointer group dark:bg-neutral-900 dark:border-neutral-800"
              onClick={() => onPreview(item)}
            >
              <div className="relative aspect-video overflow-hidden">
                {isVideo ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${item.videoId}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <>
                    <img
                      src={item.image || FALLBACK_IMAGE}
                      alt={item.title}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <span className="text-white font-medium flex items-center gap-2">
                        <Play className="h-5 w-5 fill-white" /> View Preview
                      </span>
                    </div>
                  </>
                )}
              </div>
            <CardHeader>
              <CardTitle className="text-xl dark:text-white">{item.title}</CardTitle>
              {(item.client || item.year) && (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {[item.client, item.year].filter(Boolean).join(' • ')}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">{item.desc}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#f97316]/15 text-[#f97316] text-xs font-medium rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        );
      })}
    </div>
  );
}

function ProjectPreviewModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  if (!project) return null;
  return (
    <Dialog open={!!project} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto dark:bg-neutral-900 dark:border-neutral-800">
        <>
          <DialogTitle className="text-xl font-bold dark:text-white">{project.title}</DialogTitle>
            {project.mediaType === 'youtube' && project.videoId ? (
              <div className="aspect-video w-full rounded-xl overflow-hidden mt-4">
                <iframe
                  src={`https://www.youtube.com/embed/${project.videoId}?autoplay=0`}
                  title={project.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="rounded-xl overflow-hidden mt-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-auto object-contain max-h-[60vh]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                />
              </div>
            )}
            <p className="text-neutral-600 dark:text-neutral-400 mt-4">{project.desc}</p>
            {(project.client || project.year) && (
              <p className="text-sm text-neutral-500 mt-2">
                {[project.client, project.year].filter(Boolean).join(' • ')}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#f97316]/20 text-[#f97316] text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
        </>
      </DialogContent>
    </Dialog>
  );
}
