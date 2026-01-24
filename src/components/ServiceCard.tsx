import { motion } from 'framer-motion'
import { Globe, Palette, Video } from 'lucide-react'
import React from 'react'

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  isDarkMode: boolean
  index: number
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  isDarkMode,
  index
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className={`p-8 rounded-2xl ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      } shadow-lg hover:shadow-2xl transition-all`}
    >
      <motion.div
        className='w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6 shadow-lg'
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        {icon}
      </motion.div>
      <h3
        className={`text-2xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </h3>
      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
        {description}
      </p>
    </motion.div>
  )
}

interface ServicesListProps {
  isDarkMode: boolean
}

export const ServicesList: React.FC<ServicesListProps> = ({ isDarkMode }) => {
  const services = [
    {
      icon: <Palette size={32} className='text-white' />,
      title: 'Graphics Design',
      description:
        'Creative visual solutions that communicate your brand message effectively'
    },
    {
      icon: <Video size={32} className='text-white' />,
      title: 'Video Editing',
      description:
        'Professional video content that tells your story and engages your audience'
    },
    {
      icon: <Globe size={32} className='text-white' />,
      title: 'Website Development',
      description:
        'Modern, responsive websites that deliver exceptional user experiences'
    }
  ]

  return (
    <div className='grid md:grid-cols-3 gap-8'>
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          icon={service.icon}
          title={service.title}
          description={service.description}
          isDarkMode={isDarkMode}
          index={index}
        />
      ))}
    </div>
  )
}
