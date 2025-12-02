import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, MenuItem, Box, Snackbar, Alert, Paper } from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { CTAButton } from '../components/UI/CTAButton';
import { ContactForm as ContactFormType } from '../types';
import { useStore } from '../store/useStore';

const contactInfo = [
  {
    icon: <Email className="text-orange-500" />,
    title: 'Email Us',
    content: 'hello@creatkaroro.com',
    link: 'mailto:hello@creatkaroro.com',
  },
  {
    icon: <Phone className="text-orange-500" />,
    title: 'Call Us',
    content: '+1 (555) 123-4567',
    link: 'tel:+15551234567',
  },
  {
    icon: <LocationOn className="text-orange-500" />,
    title: 'Visit Us',
    content: '123 Creative Street, Design City, DC 12345',
    link: '#',
  },
];

const serviceOptions = [
  'Brand Development',
  'Social Media Marketing',
  'Web Designing',
  'Graphic Designing',
  'Video Editing',
  'Consultation',
  'Other',
];

export const Contact: React.FC = () => {
  const { isDarkMode } = useStore();
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    service: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const [errors, setErrors] = useState<Partial<ContactFormType>>({});

  const handleInputChange = (field: keyof ContactFormType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormType> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSnackbar({
        open: true,
        message: 'Thank you for your message! We\'ll get back to you soon.',
        severity: 'success',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        service: '',
        message: '',
      });
      
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Something went wrong. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

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
            Let's <span className="text-orange-500">Connect</span>
          </Typography>
          <Typography
            variant="h5"
            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}
            sx={{ fontFamily: 'Coolvetica, Arial, sans-serif', fontWeight: 'normal' }}
          >
            Ready to bring your vision to life? We'd love to hear about your project.
          </Typography>
        </motion.div>

        <Grid container spacing={8}>
          {/* Contact Form */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Paper
                className="p-8 shadow-xl border-0"
                sx={{ 
                  borderRadius: '20px',
                  background: isDarkMode 
                    ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)' 
                    : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                }}
              >
                <Typography
                  variant="h4"
                  className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-6`}
                  sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
                >
                  Send us a Message
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <TextField
                          fullWidth
                          label="Your Name"
                          variant="outlined"
                          value={formData.name}
                          onChange={handleInputChange('name')}
                          error={!!errors.name}
                          helperText={errors.name}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              transition: 'all 0.3s ease-in-out',
                              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'transparent',
                              color: isDarkMode ? '#ffffff' : 'inherit',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(247, 131, 5, 0.15)',
                              },
                              '&.Mui-focused': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(247, 131, 5, 0.25)',
                              },
                              '& fieldset': {
                                borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#F78305',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#F78305',
                              borderWidth: '2px',
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <TextField
                          fullWidth
                          label="Email Address"
                          variant="outlined"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange('email')}
                          error={!!errors.email}
                          helperText={errors.email}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              transition: 'all 0.3s ease-in-out',
                              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'transparent',
                              color: isDarkMode ? '#ffffff' : 'inherit',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(247, 131, 5, 0.15)',
                              },
                              '&.Mui-focused': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(247, 131, 5, 0.25)',
                              },
                              '& fieldset': {
                                borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#F78305',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#F78305',
                              borderWidth: '2px',
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12}>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <TextField
                          fullWidth
                          select
                          label="Service Needed"
                          variant="outlined"
                          value={formData.service}
                          onChange={handleInputChange('service')}
                          error={!!errors.service}
                          helperText={errors.service}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              transition: 'all 0.3s ease-in-out',
                              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'transparent',
                              color: isDarkMode ? '#ffffff' : 'inherit',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(247, 131, 5, 0.15)',
                              },
                              '&.Mui-focused': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(247, 131, 5, 0.25)',
                              },
                              '& fieldset': {
                                borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#F78305',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#F78305',
                              borderWidth: '2px',
                            },
                          }}
                        >
                          {serviceOptions.map((option) => (
                            <MenuItem 
                              key={option} 
                              value={option}
                              sx={{
                                backgroundColor: isDarkMode ? '#2d2d2d' : 'transparent',
                                color: isDarkMode ? '#ffffff' : 'inherit',
                                '&:hover': {
                                  backgroundColor: isDarkMode ? '#3d3d3d' : 'rgba(247, 131, 5, 0.1)',
                                },
                              }}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </motion.div>
                    </Grid>

                    <Grid item xs={12}>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <TextField
                          fullWidth
                          label="Your Message"
                          variant="outlined"
                          multiline
                          rows={5}
                          value={formData.message}
                          onChange={handleInputChange('message')}
                          error={!!errors.message}
                          helperText={errors.message}
                          placeholder="Tell us about your project, goals, and how we can help you achieve them..."
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              transition: 'all 0.3s ease-in-out',
                              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'transparent',
                              color: isDarkMode ? '#ffffff' : 'inherit',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(247, 131, 5, 0.15)',
                              },
                              '&.Mui-focused': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(247, 131, 5, 0.25)',
                              },
                              '& fieldset': {
                                borderColor: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.23)',
                              },
                            },
                            '& .MuiInputLabel-root': {
                              color: isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: '#F78305',
                            },
                            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#F78305',
                              borderWidth: '2px',
                            },
                          }}
                        />
                      </motion.div>
                    </Grid>

                    <Grid item xs={12}>
                      <Box className="text-center" component="div" >
                        <CTAButton
                          type="submit"
                          disabled={loading}
                          size="large"
                          variant3D={true}
                          startIcon={loading ? undefined : <Send />}
                          sx={{ 
                            minWidth: '200px',
                            position: 'relative',
                          }}
                        >
                          {loading ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                            />
                          ) : (
                            'Send Message'
                          )}
                        </CTAButton>
                      </Box>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </motion.div>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <Typography
                variant="h4"
                className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-6`}
                sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
              >
                Get in Touch
              </Typography>

              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    x: 10,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                >
                  <Paper
                    className="p-6 shadow-lg border-0 cursor-pointer"
                    sx={{ 
                      borderRadius: '16px',
                      background: isDarkMode 
                        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' 
                        : 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: '0 15px 30px rgba(247, 131, 5, 0.2)',
                      }
                    }}
                    component="a"
                    href={info.link}
                    onClick={info.link === '#' ? (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault() : undefined}

                  >
                    <Box className="flex items-center" component="div">
                      <Box className="mr-4 text-2xl" component="div">
                        {info.icon}
                      </Box>
                      <Box  component="div">
                        <Typography
                          variant="h6"
                          className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold`}
                          sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
                        >
                          {info.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
                        >
                          {info.content}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              ))}

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-8"
              >
                <Typography
                  variant="h6"
                  className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-4`}
                  sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
                >
                  Follow Us
                </Typography>
                <Box className="flex space-x-4" component={'div'} >
                  {['📘', '📸', '🐦', '💼'].map((icon, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 15,
                        transition: { type: "spring", stiffness: 300, damping: 10 }
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg text-white text-xl"
                    >
                      {icon}
                    </motion.div>
                  ))}
                </Box>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>

        {/* Success/Error Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ 
              width: '100%',
              borderRadius: '12px',
              fontFamily: 'Coolvetica, Arial, sans-serif',
              backgroundColor: isDarkMode ? '#2d2d2d' : undefined,
              color: isDarkMode ? '#ffffff' : undefined,
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};