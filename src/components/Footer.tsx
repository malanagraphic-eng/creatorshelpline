import { motion } from 'framer-motion'
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

const socialLinks = [
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/107885461/',
    label: 'LinkedIn'
  },
  {
    icon: Youtube,
    href: 'https://www.youtube.com/@Creators_helpline',
    label: 'YouTube'
  },
  { icon: Twitter, href: 'https://x.com/Creatorhelpline', label: 'X' },
  {
    icon: Instagram,
    href: 'https://www.instagram.com/creatorshelpline/',
    label: 'Instagram'
  }
]

export function Footer () {
  return (
    <footer className='py-16 px-4 bg-gray-100 dark:bg-neutral-900 text-white'>
      <div className='container mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
          <div>
            <h3 className='text-2xl text-gray-900 dark:text-white font-bold'>
              CreatorsHelpline<span className='text-[#f97316]'>.</span>
            </h3>
            <p className='mt-2 text-neutral-400'>
              Creating brands that matter since 2026
            </p>
          </div>
          <div className='flex gap-6'>
            {socialLinks.map(item => {
              const Icon = item.icon
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={item.label}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className='group w-12 h-12 rounded-full bg-gray-200 dark:bg-neutral-800 hover:bg-[#f97316]  dark:hover:bg-[#f97316] flex items-center justify-center text-white transition-colors'
                >
                  <Icon
                    size={20}
                    className='text-gray-900 group-hover:text-white dark:text-white dark:group-hover:text-gray-300'
                  />
                </motion.a>
              )
            })}
          </div>
        </div>
        <div className='mt-12 pt-8 border-t border-gray-200 dark:border-neutral-800 text-center text-neutral-500'>
          <p>© 2026 CreatorsHelpline. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
