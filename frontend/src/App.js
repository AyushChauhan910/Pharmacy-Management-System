import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Slide, Fade } from '@mui/material';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PatientPage from './pages/PatientPage';
import DoctorPage from './pages/DoctorPage';
import PharmacyPage from './pages/PharmacyPage';
import DrugPage from './pages/DrugPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserManagementPage from './pages/UserManagementPage';

function App() {
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'admin';
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      TransitionComponent={Slide}
      autoHideDuration={4000}
    >
      <Router>
        <Routes>
          <Route path="/login" element={
            <Fade in timeout={500}>
              <div>
                <LoginPage />
              </div>
            </Fade>
          } />
          <Route path="/register" element={
            <Fade in timeout={500}>
              <div>
                <RegisterPage />
              </div>
            </Fade>
          } />
          <Route path="/" element={
            isAuthenticated() ? (
              <Fade in timeout={500}>
                <div>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </div>
              </Fade>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/dashboard" element={
            isAuthenticated() ? (
              <Fade in timeout={500}>
                <div>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </div>
              </Fade>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/patients" element={
            isAuthenticated() ? (
              <Fade in timeout={500}>
                <div>
                  <Layout>
                    <PatientPage />
                  </Layout>
                </div>
              </Fade>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/doctors" element={
            isAuthenticated() ? (
              <Fade in timeout={500}>
                <div>
                  <Layout>
                    <DoctorPage />
                  </Layout>
                </div>
              </Fade>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/pharmacies" element={
            isAuthenticated() ? (
              <Fade in timeout={500}>
                <div>
                  <Layout>
                    <PharmacyPage />
                  </Layout>
                </div>
              </Fade>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/drugs" element={
            isAuthenticated() ? (
              <Fade in timeout={500}>
                <div>
                  <Layout>
                    <DrugPage />
                  </Layout>
                </div>
              </Fade>
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/users" element={
            isAuthenticated() && isAdmin() ? (
              <Fade in timeout={500}>
                <div>
                  <Layout>
                    <UserManagementPage />
                  </Layout>
                </div>
              </Fade>
            ) : (
              <Navigate to="/dashboard" replace />
            )
          } />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
