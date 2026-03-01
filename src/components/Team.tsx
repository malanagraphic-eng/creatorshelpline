import { motion } from 'framer-motion'
import { ExternalLink, User } from 'lucide-react'

const team = [
  {
    name: 'Hassan',
    role: 'Creative Director',
    desc: '10+ years in brand strategy and creative direction.',
    image: '/hassan.png',
    url: 'https://www.behance.net/gallery/243873885/Video-Editor'
  },
  {
    name: 'M Ubaid Javaid',
    role: 'MERN-Stack & Next.js Developer',
    desc: 'Full-Stack Engineer with 6+ years building secure, scalable applications.',
    image: '/mubaidjavaid.png',
    url: 'https://mubaidjavaid.vercel.app/'
  },
  {
    name: 'Saifullah Malik',
    role: 'Co-Founder',
    desc: 'Key leader driving creative vision and business growth.',
    image: '/saifullahmalik.png',
    url: '#'
  }
]

export function Team () {
  return (
    <section id='team' className='relative py-24 px-4 overflow-hidden'>
      {/* Subtle gradient bg */}
      <div className='absolute inset-0 bg-gradient-to-b from-neutral-50/80 to-white dark:from-neutral-900/50 dark:to-neutral-950 pointer-events-none' />
      <div className='container mx-auto relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16 max-w-2xl mx-auto'
        >
          <p className='text-[#f97316] font-semibold text-sm uppercase tracking-wider mb-3'>
            Our Team
          </p>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4'>
            Meet the <span className='text-[#f97316]'>Creators</span>
          </h2>
          <p className='text-lg text-neutral-600 dark:text-neutral-400'>
            The creative minds behind your success
          </p>
        </motion.div>

        <div className='grid md:grid-cols-3 gap-10 lg:gap-12 max-w-5xl mx-auto place-items-center'>
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className='group'
            >
              <div
                className='relative flex flex-col items-center justify-center text-center p-6 rounded-2xl w-full max-w-sm
                  bg-white/80 dark:bg-neutral-800/50 backdrop-blur-sm
                  border border-neutral-200/60 dark:border-neutral-700/60
                  shadow-lg hover:shadow-2xl hover:shadow-orange-500/5
                  transition-all duration-300 hover:-translate-y-1'
              >
                {/* Image wrapper - drop shadow, no bg */}
                <div className='relative mb-6 w-36 h-36 md:w-40 md:h-40 flex-shrink-0'>
                  {member.image ? (
                    <div
                      className='w-full h-full rounded-full overflow-hidden
                        [filter:drop-shadow(0_15px_35px_rgba(0,0,0,0.15))_drop-shadow(0_5px_15px_rgba(249,115,22,0.2))]
                        group-hover:[filter:drop-shadow(0_20px_40px_rgba(0,0,0,0.2))_drop-shadow(0_8px_25px_rgba(249,115,22,0.25))]'
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className='w-full h-full object-cover object-top bg-transparent'
                      />
                    </div>
                  ) : (
                    <div
                      className='w-full h-full rounded-full flex items-center justify-center
                        bg-neutral-200 dark:bg-neutral-700
                        [box-shadow:0_15px_35px_rgba(0,0,0,0.1)]'
                    >
                      <User className='w-16 h-16 text-neutral-400 dark:text-neutral-500' />
                    </div>
                  )}
                </div>

                <h3 className='text-xl font-bold text-neutral-900 dark:text-white mb-1'>
                  {member.name}
                </h3>
                <p className='text-[#f97316] text-sm font-semibold mb-3'>
                  {member.role}
                </p>
                <p className='text-sm text-neutral-600 dark:text-neutral-400 mb-4 min-h-[2.5rem]'>
                  {member.desc}
                </p>

                {member.url && member.url !== '#' && (
                  <a
                    href={member.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 px-4 py-2 rounded-lg
                      text-[#f97316] font-medium text-sm
                      hover:bg-orange-500/10 transition-colors'
                  >
                    View Portfolio
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
