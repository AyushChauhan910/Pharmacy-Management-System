import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import theme from './theme/theme';
import PatientPage from './pages/PatientPage';
import DoctorPage from './pages/DoctorPage';
import PharmacyPage from './pages/PharmacyPage';
import DrugPage from './pages/DrugPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Box from '@mui/material/Box';
import UserManagementPage from './pages/UserManagementPage';

function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function RequireAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.role === 'admin' ? children : <Navigate to="/" />;
}

function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  const showTopbar = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <Box sx={{ display: 'flex' }}>
      {showTopbar && <Topbar user={user} onLogout={handleLogout} />}
      {showTopbar && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: showTopbar ? 8 : 0 }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/patients" element={<RequireAuth><PatientPage /></RequireAuth>} />
          <Route path="/doctors" element={<RequireAuth><DoctorPage /></RequireAuth>} />
          <Route path="/pharmacies" element={<RequireAuth><PharmacyPage /></RequireAuth>} />
          <Route path="/drugs" element={<RequireAuth><DrugPage /></RequireAuth>} />
          <Route path="/users" element={<RequireAuth><RequireAdmin><UserManagementPage /></RequireAdmin></RequireAuth>} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
