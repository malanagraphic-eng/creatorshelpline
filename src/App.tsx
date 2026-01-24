// import React, { Suspense, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material';
// import { motion, AnimatePresence } from 'framer-motion';

// // Components
// import { Navigation } from './components/UI/Navigation';
// import { LoadingScreen } from './components/UI/LoadingScreen';

// import { Transition } from "framer-motion";
// // Pages
// import { Home } from './pages/Home';
// import { Projects } from './pages/Projects';
// import { Services } from './pages/Services';
// import { Contact } from './pages/Contact';

// // Store
// import { useStore } from './store/useStore';

// // Create Material-UI theme
// const createAppTheme = (isDarkMode: boolean) => createTheme({
//   palette: {
//     mode: isDarkMode ? 'dark' : 'light',
//     primary: {
//       main: '#F78305',
//     },
//     secondary: {
//       main: isDarkMode ? '#FFFFFF' : '#000000',
//     },
//     background: {
//       default: isDarkMode ? '#000000' : '#FFFFFF',
//       paper: isDarkMode ? '#1a1a1a' : '#FFFFFF',
//     },
//     text: {
//       primary: isDarkMode ? '#FFFFFF' : '#000000',
//       secondary: isDarkMode ? '#CCCCCC' : '#666666',
//     },
//   },
//   typography: {
//     fontFamily: 'Coolvetica, Arial, sans-serif',
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: `
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: 'Coolvetica', 'Inter', Arial, sans-serif;
//           line-height: 1.6;
//           color: ${isDarkMode ? '#FFFFFF' : '#333333'};
//           background-color: ${isDarkMode ? '#000000' : '#FFFFFF'};
//           overflow-x: hidden;
//           transition: background-color 0.3s ease, color 0.3s ease;
//         }

//         html {
//           scroll-behavior: smooth;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//       `,
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF',
//           transition: 'background-color 0.3s ease',
//         },
//       },
//     },
//   },
// });

// // Page transition variants
// const pageVariants = {
//   initial: {
//     opacity: 0,
//     x: -20,
//   },
//   in: {
//     opacity: 1,
//     x: 0,
//   },
//   out: {
//     opacity: 0,
//     x: 20,
//   },
// };

// const pageTransition: Transition = {
//   type: "tween",
//   ease: "anticipate",
//   duration: 0.4,
// };

// const App: React.FC = () => {
//   const { isLoading, setLoading, initializeData, setReducedMotion, isDarkMode, setDarkMode } = useStore();

//   useEffect(() => {
//     // Initialize app data
//     initializeData();

//     // Check for saved theme preference
//     const savedTheme = localStorage.getItem('darkMode');
//     if (savedTheme !== null) {
//       setDarkMode(JSON.parse(savedTheme));
//     }

//     // Check for reduced motion preference
//     const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
//     setReducedMotion(mediaQuery.matches);

//     // Add event listener for changes
//     const handleChange = (e: MediaQueryListEvent) => {
//       setReducedMotion(e.matches);
//     };
//     mediaQuery.addEventListener('change', handleChange);

//     // Simulate loading time
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);

//     return () => {
//       clearTimeout(timer);
//       mediaQuery.removeEventListener('change', handleChange);
//     };
//   }, [initializeData, setLoading, setReducedMotion, setDarkMode]);

//   // Save theme preference to localStorage
//   useEffect(() => {
//     localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
//   }, [isDarkMode]);

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   const theme = createAppTheme(isDarkMode);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <div className="App">
//           <Navigation />

//           <AnimatePresence mode="wait">
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <motion.div
//                     key="home"
//                     initial="initial"
//                     animate="in"
//                     exit="out"
//                     variants={pageVariants}
//                     transition={pageTransition}
//                   >
//                     <Suspense fallback={<LoadingScreen />}>
//                       <Home />
//                     </Suspense>
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/projects"
//                 element={
//                   <motion.div
//                     key="projects"
//                     initial="initial"
//                     animate="in"
//                     exit="out"
//                     variants={pageVariants}
//                     transition={pageTransition}
//                   >
//                     <Suspense fallback={<LoadingScreen />}>
//                       <Projects />
//                     </Suspense>
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/services"
//                 element={
//                   <motion.div
//                     key="services"
//                     initial="initial"
//                     animate="in"
//                     exit="out"
//                     variants={pageVariants}
//                     transition={pageTransition}
//                   >
//                     <Suspense fallback={<LoadingScreen />}>
//                       <Services />
//                     </Suspense>
//                   </motion.div>
//                 }
//               />
//               <Route
//                 path="/contact"
//                 element={
//                   <motion.div
//                     key="contact"
//                     initial="initial"
//                     animate="in"
//                     exit="out"
//                     variants={pageVariants}
//                     transition={pageTransition}
//                   >
//                     <Suspense fallback={<LoadingScreen />}>
//                       <Contact />
//                     </Suspense>
//                   </motion.div>
//                 }
//               />
//             </Routes>
//              {/* <Route
//                 path="/homeOne"
//                 element={
//                   <motion.div
//                     key="contact"
//                     initial="initial"
//                     animate="in"
//                     exit="out"
//                     variants={pageVariants}
//                     transition={pageTransition}
//                   >
//                     <Suspense fallback={<LoadingScreen />}>
//                           <HomePageOne />
//                     </Suspense>
//                   </motion.div>
//                 }
//               /> */}
//           </AnimatePresence>
//         </div>
//       </Router>
//     </ThemeProvider>
//   );
// };

// export default App;

import { AnimatePresence, motion } from 'framer-motion'
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,Sun, Moon,
  Star,
  Twitter
} from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Scene3D } from './components/3D/Scene3D'
import { ProjectCard } from './components/ProjectCard'
import { ProjectModal } from './components/ProjectModal'
import { ServicesList } from './components/ServiceCard'
import './index.css'
import { useStore } from './store/useStore'
import ProjectImage4 from './assets/images/4_.png'




interface Project {
  id: string
  title: string
  description: string
  category: 'graphics' | 'video' | 'web'
  thumbnail: string
  mediaType: 'image' | 'video'
  mediaUrl: string
  tags: string[]
}

interface TeamMember {
  id: string
  name: string
  role: string
  description: string
  image: string
  portfolioUrl: string
}

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
}

// Sample Projects Data - Images and Videos
const projects: Project[] = [
  {
    id: '1',
    title: 'Brand Identity Design',
    description:
      'Complete brand transformation with modern visual identity and strategic positioning.',
    category: 'graphics',
    thumbnail:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Branding', 'Design', 'Strategy']
  },
  {
    id: '2',
    title: 'Social Media Campaign',
    description:
      'Viral video content strategy delivering 2M+ views and massive engagement.',
    category: 'video',
    thumbnail:
      'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
    mediaType: 'video',
    mediaUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    tags: ['Video', 'Marketing', 'Social']
  },
  {
    id: '3',
    title: 'E-commerce Platform',
    description:
      'Modern responsive web platform with 150% conversion boost and premium UX.',
    category: 'web',
    thumbnail:
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Web Design', 'Development', 'UX/UI']
  },

  {
    id: '4',
    title: 'Marketing Graphics Suite',
    description:
      'Comprehensive graphic design system for startup branding and marketing.',
    category: 'graphics',
    thumbnail:
      'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800',
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Graphics', 'Marketing', 'Print']
  },
  {
    id: '5',
    title: 'Product Launch Video',
    description:
      'High-impact cinematic product video that went viral across platforms.',
    category: 'video',
    thumbnail:
      'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=800',
    mediaType: 'video',
    mediaUrl: 'https://www.w3schools.com/html/movie.mp4',
    tags: ['Video', 'Product', 'Commercial']
  },
  {
    id: '6',
    title: 'Corporate Website Redesign',
    description:
      'Modern responsive website with enhanced UX and improved conversion rates.',
    category: 'web',
    thumbnail:
      'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800',
    mediaType: 'image',
    mediaUrl:
      'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1200',
    tags: ['Web', 'Redesign', 'Corporate']
  },  {
    id: '6',
    title:
      'Customized Inventory Management Solution with Support and Installation Tickets Management System',
    description:
      'Customized Inventory Management for the client. He needed a system to manage his inventory along with support and installation tickets management. The system includes role based access control, items and category management, tracking items, ticket creation and management, and transaction features',
    category: 'web',
    thumbnail: ProjectImage4,
    mediaType: 'image',
    mediaUrl: ProjectImage4,
    tags: ['React', 'Material-UI', 'Node.js', "Express.js", "MongoDB", "JWT", "REST API", "tailwindcss", 'UX/UI']
  },
]

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Creative Director',
    description:
      '10+ years of experience in brand strategy and creative direction',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    portfolioUrl: '#'
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'Lead Developer',
    description: 'Full-stack developer specializing in modern web technologies',
    image:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    portfolioUrl: '#'
  },
  {
    id: '3',
    name: 'M Ubaid Javaid',
    role: 'MERN-STACK Developer',
    description:
      'Full-Stack Software Engineer with over 4+ years of professional experience architecting secure, high-performance MERN and Next.js  applications, specializing in modular administrative dashboards and robust RBAC authentication systems',
    image:
      'https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_original/v1/attachments/profile/photo/d76603727c706be13698b9a859a98447-1712483551521/c339b603-0c18-41a2-8fb0-c662474ea38b.jpg',
    portfolioUrl: 'https://mubaidjavaid.vercel.app/'
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    role: 'Graphic Designer',
    description: 'Passionate designer creating stunning visual experiences',
    image:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    portfolioUrl: '#'
  }
]

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'CEO, TechStart Inc.',
    content:
      'CreatorsHelpline transformed our brand identity beyond expectations. Their creative approach and attention to detail resulted in a 300% increase in engagement.',
    rating: 5
  },
  {
    id: '2',
    name: 'Lisa Anderson',
    role: 'Marketing Director, GrowthCo',
    content:
      'Working with this team was an absolute pleasure. They delivered our video campaign ahead of schedule and the results were phenomenal.',
    rating: 5
  },
  {
    id: '3',
    name: 'David Kim',
    role: 'Founder, StartupHub',
    content:
      "The website they built for us is not just beautiful, it's functional and has significantly improved our conversion rates. Highly recommended!",
    rating: 5
  }
]

// App Component
const App: React.FC = () => {
  const { isDarkMode, toggleDarkMode, selectedProject, setSelectedProject } =
    useStore()
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'graphics' | 'video' | 'web'
  >('all')
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0)
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  )
  const teamIntervalRef = useRef<ReturnType<typeof setTimeout>>()
  const testimonialIntervalRef = useRef<ReturnType<typeof setTimeout>>()

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter(p => p.category === activeFilter)

  // Auto-scroll for team
  useEffect(() => {
    teamIntervalRef.current = setInterval(() => {
      setCurrentTeamSlide(prev => (prev + 1) % teamMembers.length)
    }, 5000)

    return () => {
      if (teamIntervalRef.current) clearInterval(teamIntervalRef.current)
    }
  }, [])

  // Auto-scroll for testimonials
  useEffect(() => {
    testimonialIntervalRef.current = setInterval(() => {
      setCurrentTestimonialSlide(prev => (prev + 1) % testimonials.length)
    }, 6000)

    return () => {
      if (testimonialIntervalRef.current)
        clearInterval(testimonialIntervalRef.current)
    }
  }, [])
useEffect(() => {
  if (selectedProject) {
    document.body.classList.add('scroll-hidden')
  } else {
    document.body.classList.remove('scroll-hidden')
  }
}, [selectedProject])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate email sending (replace with EmailJS integration)
    try {
      // Add your EmailJS code here
      await new Promise(resolve => setTimeout(resolve, 1000))
      setFormStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setFormStatus('idle'), 3000)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-black' : 'bg-white'
      } transition-colors duration-300`}
    >
      {/* WhatsApp Floating Button */};
      <motion.a
        href='https://wa.me/923292982262?text=Hello%20CreatorsHelpline,%20I%20want%20to%20contact%20you'
        target='_blank'
        rel='noopener noreferrer'
        className='fixed bottom-8 right-8 z-40 p-4 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors'
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={28} className='text-white' />
      </motion.a>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-30 ${
          isDarkMode ? 'bg-black/95' : 'bg-white/95'
        } backdrop-blur-sm border-b ${
          isDarkMode ? 'border-white/10' : 'border-black/10'
        }`}
      >
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <h1
            className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            CreatorsHelpline<span className='text-orange-500'>.</span>
          </h1>

          <div className='flex gap-6 items-center'>
            <a
              href='#home'
              className='text-orange-500 hover:text-orange-600 transition-colors'
            >
              Home
            </a>
            <a
              href='#services'
              className={`${
                isDarkMode ? 'text-white' : 'text-black'
              } hover:text-orange-500 transition-colors`}
            >
              Services
            </a>
            <a
              href='#projects'
              className={`${
                isDarkMode ? 'text-white' : 'text-black'
              } hover:text-orange-500 transition-colors`}
            >
              Projects
            </a>
            <a
              href='#team'
              className={`${
                isDarkMode ? 'text-white' : 'text-black'
              } hover:text-orange-500 transition-colors`}
            >
              Team
            </a>
            <a
              href='#contact'
              className={`${
                isDarkMode ? 'text-white' : 'text-black'
              } hover:text-orange-500 transition-colors`}
            >
              Contact
            </a>
  <button
    onClick={toggleDarkMode}
    className='p-2 rounded-full hover:bg-orange-500/20 transition-colors'
    title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
  >
    {isDarkMode ? <Sun size={20} /> : <Moon size={20} className="text-black"/>}
  </button>

          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section
        id='home'
        className='min-h-screen flex items-center justify-center pt-20 px-4'
      >
        {' '}
        <div className='absolute inset-0 z-0'>
          <Scene3D
            showParticles={true}
            showLogo={false}
            cameraPosition={[0, 0, 8]}
          />
        </div>
        <div className='container mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Want to make{' '}
              <span className='text-orange-500'>personal brand?</span>
            </h1>
            <p
              className={`text-2xl md:text-3xl mb-12 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Want to see how we do it?
            </p>
            <motion.a
              href='#projects'
              className='inline-block px-8 py-4 bg-orange-500 text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Work
            </motion.a>
          </motion.div>
        </div>
      </section>
      {/* Services Section */}
      <section id='services' className='py-20 px-4'>
        <div className='container mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Our <span className='text-orange-500'>Services</span>
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Comprehensive creative solutions designed to elevate your brand
            </p>
          </motion.div>

          <ServicesList isDarkMode={isDarkMode} />
        </div>
      </section>
      {/* Projects Section */}
      <section
        id='projects'
        className={`py-20 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className='container mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-12'
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Our <span className='text-orange-500'>Projects</span>
            </h2>
            <p
              className={`text-xl mb-8 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Discover the creative solutions that drive results
            </p>

            {/* Filter Buttons */}
            <div className='flex flex-wrap justify-center gap-4 mb-12'>
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'graphics', label: 'Graphics Design' },
                { id: 'video', label: 'Video Editing' },
                { id: 'web', label: 'Website Development' }
              ].map(filter => (
                <motion.button
                  key={filter.id}
                  onClick={() =>
                    setActiveFilter(
                      filter.id as 'all' | 'graphics' | 'video' | 'web'
                    )
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full font-medium transition-all ${
                    activeFilter === filter.id
                      ? 'bg-orange-500 text-white shadow-lg'
                      : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:p-20'
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProjectCard
                    project={project}
                    isDarkMode={isDarkMode}
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      {/* Team Section */}
      <section id='team' className='py-20 px-4'>
        <div className='container mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Our <span className='text-orange-500'>Team</span>
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Meet the creative minds behind our success
            </p>
          </motion.div>

          <div className='relative max-w-4xl mx-auto'>
            <div className='overflow-hidden'>
              <motion.div
                className='flex'
                animate={{ x: `-${currentTeamSlide * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {teamMembers.map(member => (
                  <div key={member.id} className='min-w-full px-4'>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`p-8 rounded-2xl ${
                        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                      } shadow-lg`}
                    >
                      <div className='flex flex-col md:flex-row items-center gap-8'>
                        <img
                          src={member.image}
                          alt={member.name}
                          className='w-48 h-48 rounded-full object-cover shadow-xl'
                        />
                        <div className='flex-1 text-center md:text-left'>
                          <h3
                            className={`text-3xl font-bold mb-2 ${
                              isDarkMode ? 'text-white' : 'text-black'
                            }`}
                          >
                            {member.name}
                          </h3>
                          <p className='text-orange-500 text-xl mb-4'>
                            {member.role}
                          </p>
                          <p
                            className={`mb-6 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            }`}
                          >
                            {member.description}
                          </p>
                          <a
                            href={member.portfolioUrl}
                            className='inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors'
                          >
                            View Portfolio <ExternalLink size={18} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation */}
            <div className='flex justify-center gap-4 mt-8'>
              <button
                onClick={() =>
                  setCurrentTeamSlide(
                    prev => (prev - 1 + teamMembers.length) % teamMembers.length
                  )
                }
                className='p-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors'
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() =>
                  setCurrentTeamSlide(prev => (prev + 1) % teamMembers.length)
                }
                className='p-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors'
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Dots */}
            <div className='flex justify-center gap-2 mt-6'>
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTeamSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentTeamSlide === index
                      ? 'bg-orange-500 w-8'
                      : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section
        id='testimonials'
        className={`py-20 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className='container mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Client <span className='text-orange-500'>Testimonials</span>
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              What our clients say about us
            </p>
          </motion.div>

          <div className='relative max-w-4xl mx-auto'>
            <div className='overflow-hidden'>
              <motion.div
                className='flex'
                animate={{ x: `-${currentTestimonialSlide * 100}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {testimonials.map(testimonial => (
                  <div key={testimonial.id} className='min-w-full px-4'>
                    <motion.div
                      className={`p-8 md:p-12 rounded-2xl ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                      } shadow-xl`}
                    >
                      <div className='flex justify-center mb-6'>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className='text-orange-500 fill-orange-500'
                            size={24}
                          />
                        ))}
                      </div>
                      <p
                        className={`text-xl md:text-2xl italic mb-8 text-center ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        "{testimonial.content}"
                      </p>
                      <div className='text-center'>
                        <h4
                          className={`text-2xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-black'
                          }`}
                        >
                          {testimonial.name}
                        </h4>
                        <p className='text-orange-500'>{testimonial.role}</p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Dots */}
            <div className='flex justify-center gap-2 mt-8'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentTestimonialSlide === index
                      ? 'bg-orange-500 w-8'
                      : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id='contact' className='py-20 px-4'>
        <div className='container mx-auto max-w-4xl'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mb-16'
          >
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              Get in <span className='text-orange-500'>Touch</span>
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Ready to bring your vision to life? Let's talk!
            </p>
          </motion.div>

          <div className='grid md:grid-cols-3 gap-8 mb-12'>
            {[
              {
                icon: <Mail size={32} />,
                title: 'Email',
                content: 'hello@creatkaro.com'
              },
              {
                icon: <Phone size={32} />,
                title: 'Phone',
                content: '+1 (555) 123-4567'
              },
              {
                icon: <MapPin size={32} />,
                title: 'Location',
                content: 'Creative District, City'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`p-8 rounded-2xl ${
                  isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
                } text-center shadow-lg hover:shadow-xl transition-all`}
              >
                <motion.div
                  className='flex justify-center mb-4 text-orange-500'
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  {item.icon}
                </motion.div>
                <h3
                  className={`text-xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {item.title}
                </h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {item.content}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className={`p-8 rounded-2xl ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            } shadow-xl`}
          >
            <div className='grid md:grid-cols-2 gap-6 mb-6'>
              <input
                type='text'
                placeholder='Your Name'
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className={`px-6 py-4 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-white text-black border-gray-300'
                } border-2 focus:border-orange-500 outline-none transition-colors`}
              />
              <input
                type='email'
                placeholder='Your Email'
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className={`px-6 py-4 rounded-lg ${
                  isDarkMode
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-white text-black border-gray-300'
                } border-2 focus:border-orange-500 outline-none transition-colors`}
              />
            </div>
            <textarea
              placeholder='Your Message'
              value={formData.message}
              onChange={e =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              rows={6}
              className={`w-full px-6 py-4 rounded-lg mb-6 ${
                isDarkMode
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white text-black border-gray-300'
              } border-2 focus:border-orange-500 outline-none transition-colors resize-none`}
            />
            <motion.button
              type='submit'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='w-full px-8 py-4 bg-orange-500 text-white rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2'
            >
              <Send size={20} />
              Send Message
            </motion.button>

            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mt-4 p-4 bg-green-500/20 border-2 border-green-500 rounded-lg flex items-center gap-2 text-green-500'
              >
                <CheckCircle size={20} />
                Message sent successfully!
              </motion.div>
            )}

            {formStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className='mt-4 p-4 bg-red-500/20 border-2 border-red-500 rounded-lg text-red-500'
              >
                Failed to send message. Please try again.
              </motion.div>
            )}
          </motion.form>
        </div>
      </section>
      {/* Footer */}
      <footer
        className={`py-12 px-4 border-t ${
          isDarkMode
            ? 'bg-gray-900 border-gray-800'
            : 'bg-gray-50 border-gray-200'
        }`}
      >
        <div className='container mx-auto'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            <div>
              <h3
                className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                CreatorsHelpline<span className='text-orange-500'>.</span>
              </h3>
              <p
                className={`mt-2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Creating brands that matter since 2020
              </p>
            </div>

            <div className='flex gap-6'>
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' }
              ].map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.a
                    key={index}
                    href='#'
                    aria-label={item.label}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className='w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white hover:shadow-lg transition-all'
                  >
                    <IconComponent size={20} />
                  </motion.a>
                )
              })}
            </div>
          </div>

          <div
            className={`mt-8 pt-8 border-t text-center ${
              isDarkMode
                ? 'border-gray-800 text-gray-400'
                : 'border-gray-200 text-gray-600'
            }`}
          >
            <p>© 2024 CreatorsHelpline. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
