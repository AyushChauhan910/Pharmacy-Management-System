import React from 'react';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Grow
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import MedicationIcon from '@mui/icons-material/Medication';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Patients', icon: <PeopleIcon />, path: '/patients' },
  { text: 'Doctors', icon: <LocalHospitalIcon />, path: '/doctors' },
  { text: 'Pharmacies', icon: <LocalPharmacyIcon />, path: '/pharmacies' },
  { text: 'Drugs', icon: <MedicationIcon />, path: '/drugs' },
];

const adminMenuItems = [
  { text: 'User Management', icon: <AdminPanelSettingsIcon />, path: '/users' },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          borderRight: 'none',
          boxShadow: 3,
        },
      }}
    >
      <Box sx={{ overflow: 'auto', mt: 8 }}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Grow in timeout={600}>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
              Pharmacy Management
            </Typography>
          </Grow>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <Grow in timeout={700 + index * 100} key={item.text}>
              <ListItem
                button
                onClick={() => navigate(item.path)}
                sx={{
                  mx: 1,
                  mb: 0.5,
                  borderRadius: 2,
                  backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      fontWeight: location.pathname === item.path ? 600 : 400 
                    } 
                  }} 
                />
              </ListItem>
            </Grow>
          ))}
          
          {isAdmin && (
            <>
              <Box sx={{ my: 2, mx: 2, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }} />
              {adminMenuItems.map((item, index) => (
                <Grow in timeout={800 + index * 100} key={item.text}>
                  <ListItem
                    button
                    onClick={() => navigate(item.path)}
                    sx={{
                      mx: 1,
                      mb: 0.5,
                      borderRadius: 2,
                      backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      transition: 'all 0.3s',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        transform: 'translateX(5px)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      sx={{ 
                        '& .MuiListItemText-primary': { 
                          fontWeight: location.pathname === item.path ? 600 : 400 
                        } 
                      }} 
                    />
                  </ListItem>
                </Grow>
              ))}
            </>
          )}
        </List>
        
        <Box sx={{ mt: 'auto', p: 2 }}>
          <Grow in timeout={1000}>
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  transform: 'translateX(5px)',
                },
              }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </Grow>
        </Box>
      </Box>
    </Drawer>
  );
}

export default Sidebar; 