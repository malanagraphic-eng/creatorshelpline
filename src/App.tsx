import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import { Navigation } from './components/UI/Navigation';
import { LoadingScreen } from './components/UI/LoadingScreen';

import { Transition } from "framer-motion";
// Pages
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

// Store
import { useStore } from './store/useStore';

// Create Material-UI theme
const createAppTheme = (isDarkMode: boolean) => createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    primary: {
      main: '#F78305',
    },
    secondary: {
      main: isDarkMode ? '#FFFFFF' : '#000000',
    },
    background: {
      default: isDarkMode ? '#000000' : '#FFFFFF',
      paper: isDarkMode ? '#1a1a1a' : '#FFFFFF',
    },
    text: {
      primary: isDarkMode ? '#FFFFFF' : '#000000',
      secondary: isDarkMode ? '#CCCCCC' : '#666666',
    },
  },
  typography: {
    fontFamily: 'Coolvetica, Arial, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Coolvetica', 'Inter', Arial, sans-serif;
          line-height: 1.6;
          color: ${isDarkMode ? '#FFFFFF' : '#333333'};
          background-color: ${isDarkMode ? '#000000' : '#FFFFFF'};
          overflow-x: hidden;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `,
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: isDarkMode ? '#1a1a1a' : '#FFFFFF',
          transition: 'background-color 0.3s ease',
        },
      },
    },
  },
});

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: 20,
  },
};


const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

const App: React.FC = () => {
  const { isLoading, setLoading, initializeData, setReducedMotion, isDarkMode, setDarkMode } = useStore();

  useEffect(() => {
    // Initialize app data
    initializeData();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    }
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    // Add event listener for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [initializeData, setLoading, setReducedMotion, setDarkMode]);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const theme = createAppTheme(isDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navigation />
          
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <motion.div
                    key="home"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingScreen />}>
                      <Home />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/projects"
                element={
                  <motion.div
                    key="projects"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingScreen />}>
                      <Projects />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/services"
                element={
                  <motion.div
                    key="services"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingScreen />}>
                      <Services />
                    </Suspense>
                  </motion.div>
                }
              />
              <Route
                path="/contact"
                element={
                  <motion.div
                    key="contact"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingScreen />}>
                      <Contact />
                    </Suspense>
                  </motion.div>
                }
              />
            </Routes>
             {/* <Route
                path="/homeOne"
                element={
                  <motion.div
                    key="contact"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingScreen />}>
                          <HomePageOne />
                    </Suspense>
                  </motion.div>
                }
              /> */}
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;