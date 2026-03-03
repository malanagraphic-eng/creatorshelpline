import { motion } from 'framer-motion'
import { Menu, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './UI/sheet'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' }
]

export function Navbar () {
  const [open, setOpen] = useState(false)
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
    setOpen(false)
  }

  return (
    <nav className='sticky top-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800'>
      {/* Scroll progress bar - grows with scroll */}
      <div
        className='absolute bottom-0 left-0 h-0.5 bg-[#f97316] transition-all duration-150'
        style={{ width: `${scrollProgress}%` }}
      />
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <motion.a
          href='#home'
          onClick={e => scrollTo(e, '#home')}
          className='text-xl font-bold text-neutral-900 dark:text-white'
          whileHover={{ scale: 1.02 }}
        >
          CreatorsHelpline<span className='text-[#f97316]'>.</span>
        </motion.a>

        <div className='hidden md:flex items-center gap-8'>
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

        <div className='flex md:hidden items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='text-neutral-600 dark:text-neutral-400'
          >
            {theme === 'dark' ? (
              <Sun className='h-5 w-5' />
            ) : (
              <Moon className='h-5 w-5' />
            )}
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' aria-label='Open menu'>
                <Menu className='h-6 w-6' />
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-[280px] sm:w-[320px] bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800'
            >
              <SheetHeader>
                <SheetTitle className='text-neutral-900 dark:text-white'>
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className='flex flex-col gap-6 mt-8'>
                {navLinks.map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={e => scrollTo(e, link.href)}
                    className={cn(
                      'text-lg font-medium py-2 border-b border-neutral-200 dark:border-neutral-700 transition-colors hover:text-[#f97316]',
                      'text-neutral-900 dark:text-neutral-100',
                      activeSection === link.href && 'text-[#f97316] font-semibold'
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
