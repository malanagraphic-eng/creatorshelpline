import React, { useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

interface CTAButtonProps extends ButtonProps {
  children: React.ReactNode;
  variant3D?: boolean;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ 
  children, 
  variant3D = true,
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: variant3D ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
    >
      <Button
        {...props}
        className={`
          ${props.className || ''}
          ${variant3D ? 'shadow-lg transform transition-all duration-300' : ''}
          ${isPressed && variant3D ? 'shadow-xl translate-y-1' : ''}
        `}
        sx={{
          backgroundColor: '#F78305',
          color: 'white',
          fontFamily: 'Coolvetica, Arial, sans-serif',
          fontWeight: 'bold',
          fontSize: '16px',
          textTransform: 'none',
          padding: '12px 32px',
          borderRadius: '8px',
          border: '2px solid transparent',
          background: variant3D 
            ? 'linear-gradient(45deg, #F78305 0%, #FF9500 100%)'
            : '#F78305',
          boxShadow: variant3D 
            ? '0 8px 32px rgba(247, 131, 5, 0.3)'
            : 'none',
          '&:hover': {
            backgroundColor: '#E67300',
            background: variant3D 
              ? 'linear-gradient(45deg, #E67300 0%, #F78305 100%)'
              : '#E67300',
            boxShadow: variant3D 
              ? '0 12px 40px rgba(247, 131, 5, 0.4)'
              : 'none',
          },
          '&:active': {
            transform: variant3D ? 'translateY(2px)' : 'none',
          },
          ...props.sx,
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
};