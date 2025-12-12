import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import { useStore } from '../../store/useStore'

export const LoadingScreen: React.FC = () => {
  const { isDarkMode } = useStore()

  return (
    <Box
      className={`fixed inset-0 ${
        isDarkMode ? 'bg-black' : 'bg-white'
      } flex items-center justify-center z-50`}
      sx={{
        background: isDarkMode
          ? 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)'
          : 'radial-gradient(circle at center, #f8f9fa 0%, #ffffff 100%)'
      }}
      component={motion.div}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-center relative'
      >
        {/* Animated Background Circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className='absolute inset-0 -m-20 rounded-full border-2 border-orange-500'
        />

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
          className='absolute inset-0 -m-32 rounded-full border border-orange-300'
        />

        <motion.div
          animate={{
            rotateY: 360,
            scale: [1, 1.05, 1]
          }}
          transition={{
            rotateY: { duration: 3, repeat: Infinity, ease: 'linear' },
            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
          }}
          className='mb-6'
        >
          {/* <motion.img
            src={logo}
            alt='CreatorsHelpline Logo'
            className='h-16 w-auto'
            animate={{
              scale: [0.9, 1, 0.9]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          /> */}
          <Typography
            variant='h2'
            className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold`}
            sx={{
              fontFamily: 'Coolvetica, Arial, sans-serif',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: isDarkMode
                ? '0 0 20px rgba(247, 131, 5, 0.5)'
                : '0 0 20px rgba(0, 0, 0, 0.1)',
              background: isDarkMode
                ? 'linear-gradient(45deg, #FFFFFF 0%, #F78305 50%, #FFFFFF 100%)'
                : 'linear-gradient(45deg, #000000 0%, #F78305 50%, #000000 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 100%',
              animation: 'gradient-shift 3s ease-in-out infinite'
            }}
          >
            CreatorsHelpline
            <span className='text-orange-500'>.</span>
          </Typography>
        </motion.div>

        {/* Custom 3D Loading Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className='relative mx-auto mb-4'
          style={{ width: '60px', height: '60px' }}
        >
          <div className='absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full'></div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className='absolute inset-2 border-2 border-orange-300 border-b-transparent rounded-full'
          />
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Typography
            variant='body1'
            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            sx={{
              fontFamily: 'Coolvetica, Arial, sans-serif',
              fontSize: '1.1rem',
              letterSpacing: '0.1em'
            }}
          >
            Loading.....
          </Typography>
        </motion.div>
      </motion.div>

      {/* Add CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </Box>
  )
}
