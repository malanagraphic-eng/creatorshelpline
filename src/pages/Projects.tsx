import React, { Suspense, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, Chip, Dialog, DialogContent, DialogTitle, IconButton, Tabs, Tab } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Scene3D } from '../components/3D/Scene3D';
import { ProjectCard3D } from '../components/3D/ProjectCard3D';
import { useStore } from '../store/useStore';
import { Project } from '../types';

const filterCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'brand-development', label: 'Brand Development' },
  { id: 'social-media', label: 'Social Media' },
  { id: 'web-design', label: 'Web Design' },
  { id: 'graphic-design', label: 'Graphic Design' },
];

export const Projects: React.FC = () => {
  const { projects, isDarkMode } = useStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('all');
  const [view3D, setView3D] = useState(false);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleFilterChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilter(newValue);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-white'} pt-20`}>
      <Container className="py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Typography
            variant="h2"
            className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-4`}
            sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
          >
            Our <span className="text-orange-500">Projects</span>
          </Typography>
          <Typography
            variant="h5"
            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}
            sx={{ fontFamily: 'Coolvetica, Arial, sans-serif', fontWeight: 'normal' }}
          >
            Discover the creative solutions that drive results
          </Typography>

          {/* View Toggle */}
          <Box className="flex justify-center gap-4 mb-8" component="div">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView3D(false)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                !view3D 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Grid View
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView3D(true)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                view3D 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              3D View
            </motion.button>
          </Box>
        </motion.div>

        {/* Filter Tabs */}
        <Box className="mb-8 flex justify-center" component="div" >
          <Tabs
            value={filter}
            onChange={handleFilterChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontFamily: 'Coolvetica, Arial, sans-serif',
                fontSize: '16px',
                textTransform: 'none',
                color: isDarkMode ? '#CCCCCC' : '#666666',
                '&.Mui-selected': {
                  color: '#F78305',
                  fontWeight: 'bold',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#F78305',
                height: '3px',
              },
            }}
          >
            {filterCategories.map((category) => (
              <Tab
                key={category.id}
                label={category.label}
                value={category.id}
              />
            ))}
          </Tabs>
        </Box>

        {/* Projects Display */}
        <AnimatePresence mode="wait">
          {view3D ? (
            <motion.div
              key="3d-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-96 mb-12"
            >
              <Scene3D enableControls={true}>
                <Suspense fallback={null}>
                  {filteredProjects.map((project, index) => (
                    <ProjectCard3D
                      key={project.id}
                      project={project}
                      position={[
                        (index % 3 - 1) * 3,
                        Math.floor(index / 3) * -2,
                        0
                      ]}
                      onSelect={handleProjectSelect}
                    />
                  ))}
                </Suspense>
              </Scene3D>
            </motion.div>
          ) : (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Grid container spacing={4}>
                {filteredProjects.map((project, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={project.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        z: 50
                      }}
                      style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px'
                      }}
                    >
                      <Card
                        className="cursor-pointer shadow-lg border-0 h-full"
                        onClick={() => handleProjectSelect(project)}
                        sx={{
                          borderRadius: '16px',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease-in-out',
                          background: isDarkMode 
                            ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)' 
                            : 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                          '&:hover': {
                            boxShadow: '0 20px 40px rgba(247, 131, 5, 0.3)',
                            transform: 'translateY(-8px) rotateX(5deg)',
                          }
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={project.image}
                          alt={project.title}
                          sx={{
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                              transform: 'scale(1.1)',
                            }
                          }}
                        />
                        <CardContent className="p-6">
                          <Typography
                            variant="h6"
                            className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold mb-2`}
                            sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
                          >
                            {project.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}
                            sx={{ lineHeight: 1.6 }}
                          >
                            {project.description}
                          </Typography>
                          <Box className="flex flex-wrap gap-2" component="div">
                            {project.tags.map((tag, tagIndex) => (
                              <Chip
                                key={tagIndex}
                                label={tag}
                                size="small"
                                sx={{
                                  backgroundColor: '#F78305',
                                  color: 'white',
                                  fontFamily: 'Coolvetica, Arial, sans-serif',
                                  fontSize: '12px',
                                  '&:hover': {
                                    backgroundColor: '#E67300',
                                  }
                                }}
                              />
                            ))}
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Modal */}
        <Dialog
          open={!!selectedProject}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: '16px',
              maxHeight: '90vh',
              backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#000000',
            }
          }}
        >
          {selectedProject && (
            <>
              <DialogTitle className="flex justify-between items-center p-6">
                <Typography
                  variant="h5"
                  className={`${isDarkMode ? 'text-white' : 'text-black'} font-bold`}
                  sx={{ fontFamily: 'Coolvetica, Arial, sans-serif' }}
                >
                  {selectedProject.title}
                </Typography>
                <IconButton 
                  onClick={handleCloseModal}
                  sx={{ color: isDarkMode ? '#ffffff' : '#000000' }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent className="p-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <Typography
                  variant="body1"
                  className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}
                  sx={{ lineHeight: 1.8 }}
                >
                  {selectedProject.description}
                </Typography>
                <Typography
                  variant="body1"
                  className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}
                  sx={{ lineHeight: 1.8 }}
                >
                  This project showcases our expertise in creating comprehensive solutions 
                  that drive real business results. Through strategic planning, creative 
                  execution, and data-driven optimization, we delivered exceptional value 
                  and measurable outcomes for our client.
                </Typography>
                <Box className="flex flex-wrap gap-2 mb-4" component="div">
                  {selectedProject.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      sx={{
                        backgroundColor: '#F78305',
                        color: 'white',
                        fontFamily: 'Coolvetica, Arial, sans-serif',
                      }}
                    />
                  ))}
                </Box>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Container>
    </div>
  );
};