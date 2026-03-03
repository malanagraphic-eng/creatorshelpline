import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from './UI/card';

const FALLBACK_IMAGE = 'https://placehold.co/200x120?text=Review';

/** Get review paths - try src/assets first, then public */
const getReviewPaths = () => {
  try {
    const mods = import.meta.glob<{ default: string }>(
      '../assets/review/*.png',
      { eager: true, query: '?url', import: 'default' }
    );
    if (Object.keys(mods).length > 0) {
      return Object.entries(mods)
        .sort(([a], [b]) => {
          const nA = parseInt(a.match(/(\d+)\.png$/)?.[1] || '0');
          const nB = parseInt(b.match(/(\d+)\.png$/)?.[1] || '0');
          return nA - nB;
        })
        .map(([, m]) => (m as { default: string }).default);
    }
  } catch {}
  return Array.from({ length: 18 }, (_, i) => `/assets/review/${i + 1}.png`);
};

const reviewImagePaths = getReviewPaths().slice(0, 8);
const hasReviewImages = reviewImagePaths.length > 0;

export function Testimonials() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goNext = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % reviewImagePaths.length);
  }, []);

  const goPrev = useCallback(() => {
    setSlideIndex((prev) => (prev - 1 + reviewImagePaths.length) % reviewImagePaths.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [isPaused, goNext]);

  return (
    <section id="testimonials" className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Client <span className="text-[#f97316]">Testimonials</span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            What our clients say about us
          </p>
        </motion.div>

        {/* Card with review images carousel + testimonial text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Card
            className="border-0 shadow-xl overflow-hidden rounded-xl dark:bg-neutral-900 dark:border-neutral-800"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <CardContent className="p-0">
              {/* Review images carousel - shows in card, auto + buttons, pause on hover */}
              <div className="relative bg-neutral-50 dark:bg-neutral-800/50 py-6 px-4">
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={goPrev}
                    className="p-2 rounded-full bg-white dark:bg-neutral-800 shadow hover:bg-[#f97316] hover:text-white transition-colors"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <div className="flex gap-4 overflow-hidden justify-center items-center min-h-[280px] md:min-h-[320px]">
                    <AnimatePresence mode="wait">
                      {(hasReviewImages ? (
                      <motion.img
                        key={slideIndex}
                        src={reviewImagePaths[slideIndex % reviewImagePaths.length] ?? FALLBACK_IMAGE}
                        alt={`Review ${slideIndex + 1}`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="h-[260px] md:h-[300px] w-auto max-w-[480px] md:max-w-[560px] object-contain rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm"
                      />
                      ) : (
                      <div className="h-[260px] md:h-[300px] w-[400px] md:w-[480px] rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500">
                        Review
                      </div>
                      ))}
                    </AnimatePresence>
                  </div>
                  <button
                    onClick={goNext}
                    className="p-2 rounded-full bg-white dark:bg-neutral-800 shadow hover:bg-[#f97316] hover:text-white transition-colors"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
                <p className="text-center text-sm text-neutral-500 mt-2">
                  {hasReviewImages ? `${slideIndex + 1} / ${reviewImagePaths.length} • Hover to pause` : 'Add review images to public/assets/review/'}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
