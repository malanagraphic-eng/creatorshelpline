import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import { WhatsAppButton } from './WhatsAppButton'
import { Button } from './UI/button'

const FALLBACK_IMAGE = 'https://placehold.co/400x300?text=Project'

/** Review images - try src/assets first, fallback to public */
const getReviewPaths = () => {
  try {
    const mods = import.meta.glob<{ default: string }>(
      '../assets/review/*.png',
      { eager: true, query: '?url', import: 'default' }
    )
    if (Object.keys(mods).length > 0) {
      return Object.entries(mods)
        .sort(([a], [b]) => {
          const nA = parseInt(a.match(/(\d+)\.png$/)?.[1] || '0')
          const nB = parseInt(b.match(/(\d+)\.png$/)?.[1] || '0')
          return nA - nB
        })
        .map(([, m]) => (m as { default: string }).default)
    }
  } catch {}
  return Array.from({ length: 18 }, (_, i) => `/assets/review/${i + 1}.png`)
}

const reviewImagePaths = getReviewPaths()

const marqueeTransition = {
  x: { repeat: Infinity, duration: 35, ease: 'linear' as const }
}

export function Hero () {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ x: [0, -2400], transition: marqueeTransition })
  }, [controls])

  const handleMouseEnter = () => controls.stop()
  const handleMouseLeave = () =>
    controls.start({ x: [0, -2400], transition: marqueeTransition })

  return (
    <section
      id='home'
      className='relative min-h-[100%] flex flex-col justify-center px-4 pt-20'
    >
      <div
        className='absolute inset-0 -z-10 dark:hidden'
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.08), transparent), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(249, 115, 22, 0.05), transparent), linear-gradient(180deg, #fff 0%, #fafafa 100%)'
        }}
      />
      <div
        className='absolute inset-0 -z-10 hidden dark:block'
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(249, 115, 22, 0.12), transparent), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(249, 115, 22, 0.08), transparent), linear-gradient(180deg, #0a0a0a 0%, #171717 100%)'
        }}
      />

      {/* Main content - heading, subtitle, button - clearly visible */}
      <div className='container mx-auto my-20 text-center flex-1 flex flex-col justify-center pb-64'>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white mb-6'
        >
          Want to make <span className='text-[#f97316]'>personal brand?</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className='text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 mb-12'
        >
          Want to see how we do it?
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className='mt-4'
        >
          <Button
            size='lg'
            className='text-lg px-10 py-6 bg-[#f97316] hover:bg-[#ea580c]'
            asChild
          >
            <a href='#projects'>View Our Work</a>
          </Button>
        </motion.div>
      </div>

      {/* Review marquee - hero page footer, below button */}
      <div
        className='absolute bottom-0 left-0 right-0 pt-12 pb-8 overflow-hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className='flex gap-10'
          animate={controls}
          onHoverStart={handleMouseEnter}
          onHoverEnd={handleMouseLeave}
        >
          {[...reviewImagePaths, ...reviewImagePaths].map((src, idx) => (
            <ReviewImage
              key={idx}
              src={src}
              alt={`Review ${(idx % reviewImagePaths.length) + 1}`}
              fallback={FALLBACK_IMAGE}
            />
          ))}
        </motion.div>
      </div>

      <WhatsAppButton />
    </section>
  )
}

function ReviewImage ({
  src,
  alt,
  fallback
}: {
  src: string
  alt: string
  fallback: string
}) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <motion.img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      className='h-[140px] md:h-[160px] w-auto min-w-[180px] md:min-w-[220px] object-contain shrink-0 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm bg-white dark:bg-neutral-900'
      whileHover={{ scale: 1.03 }}
    />
  )
}
