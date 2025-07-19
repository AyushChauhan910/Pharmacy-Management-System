import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box, Fade, Switch, FormControlLabel
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';

function Topbar({ darkMode, onDarkModeToggle }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(90deg, #1976d2 0%, #1565c0 100%)',
        boxShadow: 3,
        transition: 'all 0.3s',
      }}
    >
      <Toolbar>
        <Fade in timeout={700}>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Pharmacy Management System
          </Typography>
        </Fade>
        
        <Fade in timeout={900}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              color="inherit"
              onClick={() => navigate('/dashboard')}
              sx={{
                transition: '0.2s',
                '&:hover': { 
                  transform: 'scale(1.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <DashboardIcon />
            </IconButton>
            
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={onDarkModeToggle}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      },
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#fff',
                    },
                  }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                  {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
                </Box>
              }
            />
            
            <Fade in timeout={1100}>
              <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                Welcome, {user.username || 'User'}
              </Typography>
            </Fade>
          </Box>
        </Fade>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar; 