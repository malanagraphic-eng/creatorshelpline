import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { CTAButton } from '../components/UI/CTAButton';
import { useNavigate } from 'react-router-dom';

const ServiceIcon: React.FC<{ type: string }> = ({ type }) => {
  const iconMap: { [key: string]: string } = {
    branding: '🎯',
    social: '📱',
    web: '💻',
    graphics: '🎨',
    video: '🎬',
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.2, 
        rotate: 15,
        transition: { type: "spring", stiffness: 300, damping: 10 }
      }}
      className="text-6xl mb-4 text-center"
    >
      {iconMap[type] || '✨'}
    </motion.div>
  );
};

export const Services: React.FC = () => {
  const { services, isDarkMode } = useStore();
  const navigate = useNavigate();

  const primaryServices = services.filter(service => service.isPrimary);
  const secondaryServices = services.filter(service => !service.isPrimary);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} pt-20`}>
      <Container className="py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Typography
            variant="h2"
            className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-4`}
            sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
          >
            Our <span className="text-orange-500">Services</span>
          </Typography>
          <Typography
            variant="h5"
            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}
            sx={{ fontFamily: 'Coolvetica, Arial, sans-serif', fontWeight: 'normal' }}
          >
            Comprehensive creative solutions designed to elevate your brand and drive growth
          </Typography>
        </motion.div>

        {/* Primary Services */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <Typography
              variant="h3"
              className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-4`}
              sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
            >
              Core Services
            </Typography>
            <Typography
              variant="body1"
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
            >
              Our flagship services that form the foundation of exceptional brand experiences
            </Typography>
          </motion.div>

          <Grid container spacing={6} className="mb-8">
            {primaryServices.map((service, index) => (
              <Grid item xs={12} md={6} key={service.id}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                  whileHover={{ 
                    scale: 1.03,
                    rotateY: 3,
                    z: 50
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px'
                  }}
                >
                  <Card 
                    className="h-full shadow-xl border-0"
                    sx={{ 
                      borderRadius: '20px',
                      background: isDarkMode 
                        ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)' 
                        : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                      transition: 'all 0.4s ease-in-out',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                      '&:hover': {
                        boxShadow: '0 25px 50px rgba(247, 131, 5, 0.3)',
                        transform: 'translateY(-10px) rotateX(3deg)',
                      }
                    }}
                  >
                    <CardContent className="p-8">
                      <ServiceIcon type={service.icon} />
                      
                      <Typography
                        variant="h4"
                        className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-4 text-center`}
                        sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
                      >
                        {service.title}
                      </Typography>
                      
                      <Typography
                        variant="body1"
                        className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 text-center`}
                        sx={{ lineHeight: 1.8, fontSize: '1.125rem' }}
                      >
                        {service.description}
                      </Typography>

                      <List className="mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <ListItem key={featureIndex} className="px-0">
                            <ListItemIcon>
                              <CheckCircle sx={{ color: '#F78305' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontFamily: 'Coolvetica, Arial, sans-serif',
                                  fontSize: '16px',
                                  color: isDarkMode ? '#CCCCCC' : '#333333'
                                }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      <Box className="text-center" component="div">
                        <CTAButton 
                          onClick={() => navigate('/contact')}
                          variant3D={true}
                        >
                          Get Started
                        </CTAButton>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </section>

        {/* Secondary Services */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Typography
              variant="h3"
              className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-4`}
              sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
            >
              Additional Services
            </Typography>
            <Typography
              variant="body1"
              className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
            >
              Specialized services to complete your brand ecosystem and maximize impact
            </Typography>
          </motion.div>

          <Grid container spacing={4} className="mb-12">
            {secondaryServices.map((service, index) => (
              <Grid item xs={12} sm={6} lg={4} key={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    z: 30
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '800px'
                  }}
                >
                  <Card 
                    className="h-full shadow-lg border-0"
                    sx={{ 
                      borderRadius: '16px',
                      transition: 'all 0.3s ease-in-out',
                      background: isDarkMode 
                        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' 
                        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      '&:hover': {
                        boxShadow: '0 15px 30px rgba(247, 131, 5, 0.2)',
                        transform: 'translateY(-5px)',
                      }
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <ServiceIcon type={service.icon} />
                      
                      <Typography
                        variant="h6"
                        className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-3`}
                        sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
                      >
                        {service.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}
                        sx={{ lineHeight: 1.6 }}
                      >
                        {service.description}
                      </Typography>

                      <Box className="flex flex-wrap justify-center gap-2 mb-4" component="div">
                        {service.features.map((feature, featureIndex) => (
                          <Typography
                            key={featureIndex}
                            variant="caption"
                            className={`${isDarkMode ? 'bg-orange-900 text-orange-300' : 'bg-orange-100 text-orange-600'} px-2 py-1 rounded-full`}
                            sx={{ 
                              fontFamily: 'Coolvetica, Arial, sans-serif',
                              fontSize: '12px'
                            }}
                          >
                            {feature}
                          </Typography>
                        ))}
                      </Box>

                      <CTAButton 
                        size="small"
                        onClick={() => navigate('/contact')}
                        variant3D={false}
                        sx={{ 
                          fontSize: '14px',
                          padding: '8px 20px'
                        }}
                      >
                        Learn More
                      </CTAButton>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </section>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-center ${isDarkMode ? 'bg-gradient-to-r from-orange-900 to-orange-800' : 'bg-gradient-to-r from-orange-50 to-orange-100'} rounded-2xl p-12`}
        >
          <Typography
            variant="h3"
            className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-4`}
            sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
          >
            Ready to Transform Your Brand?
          </Typography>
          <Typography
            variant="body1"
            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl mx-auto`}
            sx={{ fontSize: '1.125rem', lineHeight: 1.8 }}
          >
            Let's discuss how our services can help you achieve your business goals 
            and create lasting impact in your market.
          </Typography>
          <CTAButton 
            size="large"
            onClick={() => navigate('/contact')}
            variant3D={true}
          >
            Start Your Project Today
          </CTAButton>
        </motion.div>
      </Container>
    </div>
  );
};