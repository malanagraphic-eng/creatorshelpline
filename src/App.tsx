import { ReactLenis } from 'lenis/react'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { MouseFollower } from './components/MouseFollower'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Services } from './components/Services'
import { Team } from './components/Team'
import { Testimonials } from './components/Testimonials'

/**
 * CreatorsHelpline Portfolio
 * - Lenis for smooth scroll
 * - Light theme (next-themes)
 * - shadcn/ui components
 * - Framer Motion / GSAP animations
 */
function App () {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1
      }}
    >
      <div className='min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100'>
        <Navbar />
        <MouseFollower />
        <main>
          <Hero />
          <Services />
          <Projects />
          <Team />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default App
