import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore } from "../../store/useStore";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/services", label: "Services" },
  { path: "/contact", label: "Contact" },
];

export const Navigation: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { setCurrentPage, isDarkMode, toggleDarkMode } = useStore();

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    const currentPath =
      location.pathname === "/" ? "home" : location.pathname.slice(1);
    setCurrentPage(currentPath);
  }, [location.pathname, setCurrentPage]);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: isDarkMode
            ? "rgba(0, 0, 0, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: isDarkMode
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar className="container mx-auto px-4 flex justify-between">
          {/* Logo */}
          <Typography
            variant="h5"
            component={Link}
            to="/"
            className={`${
              isDarkMode ? "text-white" : "text-black"
            } font-bold no-underline`}
            sx={{
              fontFamily: "Coolvetica, Arial, sans-serif",
              textDecoration: "none",
              color: isDarkMode ? "#FFFFFF" : "#000000",
            }}
          >
            CreatKaro<span className="text-orange-500 ml-1">.</span>
          </Typography>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box className="flex space-x-8" component="div" >
              {navItems.map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    to={item.path}
                    className={`text-base font-medium transition-colors duration-300 ${
                      location.pathname === item.path
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : `${
                            isDarkMode ? "text-white" : "text-black"
                          } hover:text-orange-500`
                    }`}
                    sx={{
                      fontFamily: "Coolvetica, Arial, sans-serif",
                      textTransform: "none",
                      fontSize: "16px",
                      color:
                        location.pathname === item.path
                          ? "#F78305"
                          : isDarkMode
                          ? "#FFFFFF"
                          : "#000000",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#F78305",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </Box>
          )}

          {/* Right Side Controls */}
          <Box className="flex items-center space-x-2" component="div">
            {/* Theme Toggle */}
            <IconButton onClick={toggleDarkMode}>
              {isDarkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250, p: 2 }} component="nav">
          <Box className="flex justify-between items-center mb-4" component="nav">
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.path}
                button
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  color:
                    location.pathname === item.path
                      ? "#F78305"
                      : isDarkMode
                      ? "#FFFFFF"
                      : "#000000",
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
