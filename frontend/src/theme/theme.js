import { createTheme } from '@mui/material/styles';

const getTheme = (darkMode) => createTheme({
  palette: {
    mode: darkMode ? 'dark' : 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#ff4081' },
    background: { default: darkMode ? '#121212' : '#f4f6f8' },
  },
  shape: { borderRadius: 8 },
});

export default getTheme;
