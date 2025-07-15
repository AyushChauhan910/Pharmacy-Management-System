import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import ScienceIcon from '@mui/icons-material/Science';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => (
  <Drawer
    variant="permanent"
    anchor="left"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', mt: 8 },
    }}
  >
    <List>
      <ListItem button component={Link} to="/patients">
        <ListItemIcon><PeopleIcon /></ListItemIcon>
        <ListItemText primary="Patients" />
      </ListItem>
      <ListItem button component={Link} to="/doctors">
        <ListItemIcon><LocalHospitalIcon /></ListItemIcon>
        <ListItemText primary="Doctors" />
      </ListItem>
      <ListItem button component={Link} to="/pharmacies">
        <ListItemIcon><LocalPharmacyIcon /></ListItemIcon>
        <ListItemText primary="Pharmacies" />
      </ListItem>
      <ListItem button component={Link} to="/drugs">
        <ListItemIcon><ScienceIcon /></ListItemIcon>
        <ListItemText primary="Drugs" />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar; 