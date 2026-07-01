import { motion } from 'framer-motion'
import { Briefcase, Home, Mail, Moon, Sun, Users, Wrench } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '../lib/utils'
import { Button } from './UI/button'

const navLinks = [
  { label: 'Home', href: '#home', icon: Home },
  { label: 'Projects', href: '#projects', icon: Briefcase },
  { label: 'Services', href: '#services', icon: Wrench },
  { label: 'Team', href: '#team', icon: Users },
  { label: 'Contact', href: '#contact', icon: Mail }
]

export function Navbar () {
  const { theme, setTheme } = useTheme()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight
      const progress = height > 0 ? (winScroll / height) * 100 : 0
      setScrollProgress(progress)
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id
            if (id) setActiveSection(`#${id}`)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    document.querySelectorAll('[id]').forEach(el => {
      if (navLinks.some(l => l.href === `#${el.id}`)) observer.observe(el)
    })

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Desktop top navbar ── */}
      <nav className='sticky top-0 left-0 right-0 z-50 hidden md:block bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800'>
        {/* Scroll progress bar */}
        <div
          className='absolute bottom-0 left-0 h-0.5 bg-[#f97316] transition-all duration-150'
          style={{ width: `${scrollProgress}%` }}
        />
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          {/* Logo - left */}
          <motion.a
            href='#home'
            onClick={e => scrollTo(e, '#home')}
            className='text-xl font-bold text-neutral-900 dark:text-white'
            whileHover={{ scale: 1.02 }}
          >
            CreatorsHelpline<span className='text-[#f97316]'>.</span>
          </motion.a>

          {/* Nav links - center */}
          <div className='absolute left-1/2 -translate-x-1/2 flex items-center gap-8'>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => scrollTo(e, link.href)}
                className={cn(
                  'relative text-sm font-medium text-neutral-600 hover:text-[#f97316] transition-colors pb-1',
                  activeSection === link.href && 'text-[#f97316]'
                )}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#f97316] rounded-full' />
                )}
              </a>
            ))}
          </div>

          {/* Theme toggle - right */}
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='text-neutral-600 dark:text-neutral-400 hover:text-[#f97316] relative'
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
          </Button>
        </div>
      </nav>

      {/* ── Mobile top bar (logo + theme toggle only) ── */}
      <nav className='sticky top-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800'>
        <div
          className='absolute bottom-0 left-0 h-0.5 bg-[#f97316] transition-all duration-150'
          style={{ width: `${scrollProgress}%` }}
        />
        <div className='container mx-auto px-4 h-14 flex items-center justify-between'>
          <motion.a
            href='#home'
            onClick={e => scrollTo(e, '#home')}
            className='text-lg font-bold text-neutral-900 dark:text-white'
            whileHover={{ scale: 1.02 }}
          >
            CreatorsHelpline<span className='text-[#f97316]'>.</span>
          </motion.a>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='text-neutral-600 dark:text-neutral-400'
            aria-label='Toggle theme'
          >
            {theme === 'dark' ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
          </Button>
        </div>
      </nav>

      {/* ── Mobile bottom navigation bar ── */}
      <div className='fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800'>
        <div className='flex items-center justify-around h-16 px-2 pb-[env(safe-area-inset-bottom)]'>
          {navLinks.map(link => {
            const Icon = link.icon
            const isActive = activeSection === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={e => scrollTo(e, link.href)}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[56px]',
                  isActive
                    ? 'text-[#f97316]'
                    : 'text-neutral-500 dark:text-neutral-400'
                )}
              >
                <Icon className={cn('h-5 w-5', isActive && 'stroke-[2.5]')} />
                <span className={cn('text-[10px] font-medium', isActive && 'font-semibold')}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId='mobile-nav-indicator'
                    className='absolute top-0 w-8 h-0.5 bg-[#f97316] rounded-full'
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>
      </div>
    </>
  )
}
