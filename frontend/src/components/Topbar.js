import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

const Topbar = ({ user, onLogout }) => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Pharmacy Management System
      </Typography>
      {user ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 1 }}>{user.name ? user.name[0] : 'U'}</Avatar>
          <Typography variant="body1" sx={{ mr: 2 }}>{user.name}</Typography>
          <Button color="inherit" onClick={onLogout}>Logout</Button>
        </Box>
      ) : (
        <Button color="inherit" href="/login">Login</Button>
      )}
    </Toolbar>
  </AppBar>
);

export default Topbar; 