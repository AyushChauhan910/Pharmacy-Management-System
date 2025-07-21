import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post(process.env.REACT_APP_API_URL + '/auth/register', {
        username: form.username,
        email: form.email,
        password: form.password
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: { xs: 2, md: 4 },
      px: { xs: 2, md: 4 },
      transition: 'background 0.5s',
    }}>
      <Fade in timeout={800}>
        <Paper sx={{
          p: 4,
          borderRadius: 3,
          boxShadow: 12,
          background: 'linear-gradient(120deg, #fff 60%, #e3f2fd 100%)',
          maxWidth: 400,
          width: '100%',
          transition: 'box-shadow 0.3s',
          '&:hover': { boxShadow: 16 }
        }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, textAlign: 'center', mb: 3 }}>
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              sx={{ mb: 2 }}
            />
            {error && (
              <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                transition: '0.2s',
                '&:hover': { boxShadow: 6, transform: 'scale(1.02)' }
              }}
            >
              Create Account
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/login')}
              sx={{
                transition: '0.2s',
                '&:hover': { boxShadow: 6, transform: 'scale(1.02)' }
              }}
            >
              Back to Login
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
}

export default RegisterPage; 