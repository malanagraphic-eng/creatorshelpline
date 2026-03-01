import { Container, Typography } from '@mui/material'
import { Variants, motion } from 'framer-motion'
import { Sparkles, Target } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Scene3D } from '../components/3D/Scene3D'
import { CTAButton } from '../components/UI/CTAButton'
import { useStore } from '../store/useStore'
import { Projects } from './Projects'

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeInOut' // ✅ valid easing
    }
  }
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeInOut' // ✅ valid easing
    }
  })
}

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { isDarkMode } = useStore()

  const services = [
    {
      title: 'Brand Development',
      description:
        'Complete brand strategy and identity design that converts prospects into loyal customers.',
      icon: '🎯'
    },
    {
      title: 'Social Media Marketing',
      description:
        'Data-driven campaigns that build communities and drive engagement across all platforms.',
      icon: '📱'
    }
  ]

  return (
    <>
      <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        {/* Hero Section with 3D Background */}
        <section className='relative h-screen overflow-hidden'>
          <div className='absolute inset-0 z-0'>
            <Scene3D
              showParticles={true}
              showLogo={false}
              cameraPosition={[0, 0, 8]}
            />
          </div>

          <Container className='relative z-10 h-full flex items-center my-44'>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={heroVariants}
              className='max-w-4xl mx-auto text-center'
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className='mb-8'
              >
                <Typography
                  variant='h1'
                  className={`${
                    isDarkMode ? 'text-white' : 'text-black'
                  } font-extrabold  mb-4`}
                  sx={{
                    fontFamily: 'Coolvetica, Arial, sans-serif',
                    fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                    fontWeight: 'bold',
                    textTransform: 'capitalize',
                    lineHeight: 1.2,
                    textShadow: isDarkMode
                      ? '2px 2px 4px rgba(255,255,255,0.1)'
                      : '2px 2px 4px rgba(255, 253, 253, 0.1)'
                  }}
                >
                  Want to make{' '}
                  <span className='text-orange-500'>personal brand?</span>
                </Typography>

                <Typography
                  variant='h2'
                  className={`${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-8`}
                  sx={{
                    fontFamily: 'Coolvetica, Arial, sans-serif',
                    fontSize: { xs: '1.125rem', sm: '1.5rem', md: '1.875rem' },
                    fontWeight: 'normal'
                  }}
                >
                  Want to see how we do it?
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className='flex flex-col sm:flex-row gap-4 justify-center'
              >
                <CTAButton
                  variant3D={true}
                  onClick={() => navigate('/projects')}
                  size='large'
                  className='bg-orange-500'
                  sx={{
                    backgroundColor: '#F78305'
                  }}
                >
                  View Our Work
                </CTAButton>

                {/* <CTAButton
                variant3D={true}
                onClick={() => navigate('/contact')}
                size="large"
                sx={{
                  backgroundColor: 'transparent',
                  color: isDarkMode ? '#FFFFFF' : '#000000',
                  border: isDarkMode ? '2px solid #FFFFFF' : '2px solid #000000',
                  background: isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#FFFFFF' : '#000000',
                    color: isDarkMode ? '#000000' : '#FFFFFF',
                  }
                }}
              >
                Start a Project
              </CTAButton> */}
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* <section className="relative h-screen flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 z-100">
                      <Scene3D showLogo={true} showParticles={true} />
                    </div>
  </section> */}
        <section className={`py-20 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='max-w-4xl mx-auto text-center mb-16'
            >
              <Projects />
            </motion.div>
          </Container>
        </section>

        {/* <section className="relative h-screen overflow-hidden">
  <div className="absolute inset-0 z-0">
    <Scene3D showParticles={true} showLogo={true} cameraPosition={[0, 0, 8]} />
  </div>
  <div className="relative z-10">
    <Container className="flex flex-col items-center justify-center h-full">
      {/* <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <Typography
          variant="h5"
          className="text-orange-500 font-bold mb-4"
          sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
        >
          Our Values
        </Typography>
        <Typography
          variant="body1"
          className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg`}
          sx={{ lineHeight: 1.8 }}
        >
          Creativity, Integrity, Collaboration, Innovation, and Excellence
        </Typography>
      </motion.div>
    </Container>
  </div>
</section> */}

        {/* About Section */}
        <section className={`py-20 ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='max-w-4xl mx-auto text-center mb-16'
            >
              <Typography
                variant='h3'
                className={`${
                  isDarkMode ? 'text-white' : 'text-black'
                } font-bold mb-6`}
                sx={{
                  fontFamily: 'Coolvetica, Arial, sans-serif',
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  my: 2
                }}
              >
                We Create Brands That Matter
              </Typography>

              <Typography
                variant='body1'
                className={`${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                } text-lg leading-relaxed`}
                sx={{
                  textAlign: 'justify',
                  fontSize: '1.125rem',
                  lineHeight: 1.8
                }}
              >
                At CreatKaro, we believe every brand has a unique story waiting
                to be told. Our team of creative strategists, designers, and
                digital marketing experts work collaboratively to transform your
                vision into powerful brand experiences that resonate with your
                audience and drive measurable results. From comprehensive brand
                development to cutting-edge digital marketing campaigns, we
                craft solutions that not only look exceptional but perform
                exceptionally. Our data-driven approach ensures that every
                creative decision contributes to your bottom line, helping you
                build lasting relationships with your customers while achieving
                sustainable growth in today's competitive marketplace.
              </Typography>
            </motion.div>

            <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto my-10'>
              <div
                className='bg-card/50 p-8 rounded-2xl border border-border hover:border-orange-500
     hover:shadow-[0_0_15px_5px_rgba(249,115,22,0.5)]
     transition-all duration-300  hover:glow-orange'
              >
                <div className='w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6'>
                  <Sparkles className='h-8 w-8 text-black' />
                </div>
                <h3 className='text-2xl font-bold mb-4'>Brand Development</h3>
                <p className='text-muted-foreground'>
                  Complete brand identity creation from logo design to brand
                  guidelines, ensuring your business stands out with a memorable
                  visual identity.
                </p>
              </div>
              <div className='bg-card/50 p-8 rounded-2xl border border-border hover:border-orange-500 hover:shadow-[0_0_15px_5px_rgba(249,115,22,0.5)] transition-all duration-300 hover:glow-orange'>
                <div className='w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6'>
                  <Target className='h-8 w-8 text-black' />
                </div>
                <h3 className='text-2xl font-bold mb-4'>
                  Social Media Marketing
                </h3>
                <p className='text-muted-foreground'>
                  Strategic social media campaigns that engage your audience,
                  build brand awareness, and drive meaningful business results.
                </p>
              </div>
            </div>
            <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
              <div
                className='bg-card/50 p-8 rounded-2xl border border-border hover:border-orange-500
     hover:shadow-[0_0_15px_5px_rgba(249,115,22,0.5)]
     transition-all duration-300  hover:glow-orange'
              >
                <div className='w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6'>
                  <Sparkles className='h-8 w-8 text-black' />
                </div>
                <h3 className='text-2xl font-bold mb-4'>Brand Development</h3>
                <p className='text-muted-foreground'>
                  Complete brand identity creation from logo design to brand
                  guidelines, ensuring your business stands out with a memorable
                  visual identity.
                </p>
              </div>
              <div className='bg-card/50 p-8 rounded-2xl border border-border hover:border-orange-500 hover:shadow-[0_0_15px_5px_rgba(249,115,22,0.5)] transition-all duration-300 hover:glow-orange'>
                <div className='w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6'>
                  <Target className='h-8 w-8 text-black' />
                </div>
                <h3 className='text-2xl font-bold mb-4'>
                  Social Media Marketing
                </h3>
                <p className='text-muted-foreground'>
                  Strategic social media campaigns that engage your audience,
                  build brand awareness, and drive meaningful business results.
                </p>
              </div>
            </div>
            {/* Service Highlights */}
            {/* <Grid container spacing={4} className="mb-12">
            {services.map((service, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  variants={cardVariants}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.03,
                    rotateY: 5,
                    z: 50
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <Card
                    className="h-full shadow-lg border-0 cursor-pointer"
                    sx={{
                      borderRadius: '12px',
                      transition: 'all 0.3s ease-in-out',
                      background: isDarkMode
                        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      '&:hover': {
                        boxShadow: '0 20px 40px rgba(247, 131, 5, 0.2)',
                        transform: 'translateY(-8px)',
                      }
                    }}
                    onClick={() => navigate('/services')}
                  >
                    <CardContent className="p-6">
                      <Box className="text-4xl mb-4 text-center" component="div">
                        {service.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-3 text-center`}
                        sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-center`}
                        sx={{ lineHeight: 1.6 }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid> */}
          </Container>
        </section>
      </div>
    </>
  )
}
