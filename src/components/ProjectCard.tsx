import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import React from 'react'

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    thumbnail?: string
    mediaType?: 'image' | 'video'
    tags: string[]
  }
  isDarkMode: boolean
  onClick: () => void
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isDarkMode,
  onClick
}) => {
  const isVideo = project.mediaType === 'video'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer h-full flex flex-col ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      {/* Image Container */}
      <div className='relative overflow-hidden group bg-gray-900 aspect-video'>
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
          loading='lazy'
        />

        {/* Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6'
        >
          <div className='flex items-center gap-3'>
            {isVideo ? (
              <>
                <Play size={24} className='text-white fill-white' />
                <span className='text-white font-bold'>Watch</span>
              </>
            ) : (
              <span className='text-white font-bold'>View Details →</span>
            )}
          </div>
        </motion.div>

        {/* Video Badge */}
        {isVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2'
          >
            <Play size={14} className='fill-current' /> VIDEO
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className='p-6 flex-1 flex flex-col'>
        <h3
          className={`text-xl font-bold mb-2 line-clamp-2 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`mb-4 line-clamp-2 flex-1 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {project.description}
        </p>
        <div className='flex flex-wrap gap-2'>
          {project.tags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className='px-3 py-1 bg-orange-500/20 text-orange-500 text-xs rounded-full font-medium'
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 2 && (
            <span className='px-3 py-1 text-gray-500 text-xs'>
              +{project.tags.length - 2}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
