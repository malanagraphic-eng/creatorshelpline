import { motion } from 'framer-motion'
import { X, ZoomIn, ZoomOut } from 'lucide-react'
import React, { useState } from 'react'

interface ProjectModalProps {
  project: {
    id: string
    title: string
    description: string
    mediaUrl?: string
    thumbnail?: string
    mediaType?: 'image' | 'video'
    tags: string[]
    link?: string
  }
  onClose: () => void
  isDarkMode: boolean
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  isDarkMode
}) => {
  const [zoom, setZoom] = useState(1)
  const maxZoom = 3
  const minZoom = 1

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, maxZoom))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, minZoom))
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const isVideo = project.mediaType === 'video'
  const mediaUrl = project.mediaUrl || project.thumbnail || ''

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm scroll-hidden'
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 40 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl scroll-hidden ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className='absolute top-4 right-4 z-40 p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors'
          aria-label='Close modal'
        >
          <X size={24} />
        </motion.button>

        {/* Content Container */}
        <div className='overflow-auto max-h-[90vh] flex flex-col scroll-hidden'>
          {/* Media Section */}
          <div
            className={`relative bg-black flex items-center justify-center ${
              isVideo ? 'aspect-video' : 'aspect-auto'
            }`}
          >
            {isVideo ? (
              <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                controls
                autoPlay
                className='w-full h-full'
                controlsList='nodownload'
              >
                <source src={mediaUrl} type='video/mp4' />
                Your browser does not support the video tag.
              </motion.video>
            ) : (
              <div className='relative w-full h-auto flex items-center justify-center overflow-hidden bg-gray-800'>
                <motion.img
                  src={mediaUrl}
                  alt={project.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ scale: zoom }}
                  transition={{ type: 'spring', damping: 20 }}
                  className='max-w-full h-auto cursor-grab active:cursor-grabbing'
                  draggable={false}
                />
              </div>
            )}

            {/* Zoom Controls (Image only) */}
            {!isVideo && zoom < maxZoom && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleZoomIn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='absolute top-4 left-4 p-2 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30 transition-colors'
                aria-label='Zoom in'
              >
                <ZoomIn size={20} />
              </motion.button>
            )}

            {!isVideo && zoom > minZoom && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleZoomOut}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='absolute top-4 left-12 p-2 rounded-full bg-white/20 backdrop-blur text-white hover:bg-white/30 transition-colors'
                aria-label='Zoom out'
              >
                <ZoomOut size={20} />
              </motion.button>
            )}
          </div>

          {/* Details Section */}
          <div className='p-6 md:p-8'>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {project.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`text-lg md:text-xl mb-6 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              {project.description}
            </motion.p>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='flex flex-wrap gap-2 mb-6'
            >
              {project.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.25 + index * 0.05 }}
                  className='px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-medium shadow-lg'
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* External Link */}
            {project.link && (
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ x: 5 }}
                className='inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors'
              >
                View Project
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
