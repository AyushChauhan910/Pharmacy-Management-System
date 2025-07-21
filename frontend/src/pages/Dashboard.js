import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Grow, Fade, useTheme } from '@mui/material';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Dashboard() {
  const [counts, setCounts] = useState({ patients: 0, doctors: 0, pharmacies: 0, drugs: 0 });
  const [topDrugs, setTopDrugs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const API_URL = process.env.REACT_APP_API_URL;
    const fetchCounts = async () => {
      const [patients, doctors, pharmacies, drugs] = await Promise.all([
        axios.get(`${API_URL}/patients`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/doctors`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/pharmacies`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/drugs`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setCounts({
        patients: patients.data.length,
        doctors: doctors.data.length,
        pharmacies: pharmacies.data.length,
        drugs: drugs.data.length,
      });
    };
    const fetchTopDrugs = async () => {
      setTopDrugs([
        { name: 'Paracetamol', sales: 120 },
        { name: 'Ibuprofen', sales: 90 },
        { name: 'Aspirin', sales: 60 },
        { name: 'Amoxicillin', sales: 40 },
        { name: 'Cetirizine', sales: 30 },
      ]);
    };
    fetchCounts();
    fetchTopDrugs();
    setTimeout(() => setLoaded(true), 300);
  }, []);

  const barData = {
    labels: topDrugs.map(d => d.name),
    datasets: [
      {
        label: 'Sales',
        data: topDrugs.map(d => d.sales),
        backgroundColor: 'rgba(25, 118, 210, 0.7)',
      },
    ],
  };

  const pieData = {
    labels: ['Patients', 'Doctors', 'Pharmacies', 'Drugs'],
    datasets: [
      {
        data: [counts.patients, counts.doctors, counts.pharmacies, counts.drugs],
        backgroundColor: [
          'rgba(25, 118, 210, 0.7)',
          'rgba(255, 64, 129, 0.7)',
          'rgba(0, 200, 83, 0.7)',
          'rgba(255, 193, 7, 0.7)'
        ],
      },
    ],
  };

  return (
    <Container maxWidth={false} disableGutters sx={{
      minHeight: '100vh',
      py: { xs: 2, md: 4 },
      px: { xs: 0, md: 2 },
      transition: 'background 0.5s',
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, letterSpacing: 1, mb: 3, textAlign: 'center' }}>Dashboard</Typography>
      <Grid container spacing={3}>
        {['patients', 'doctors', 'pharmacies', 'drugs'].map((key, i) => (
          <Grow in={loaded} style={{ transformOrigin: '0 0 0' }} timeout={400 + i * 150} key={key}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{
                borderRadius: 3,
                boxShadow: 6,
                background: theme.palette.mode === 'dark' 
                  ? 'linear-gradient(120deg, #1e1e1e 60%, #2d2d2d 100%)'
                  : 'linear-gradient(120deg, #fff 60%, #e3f2fd 100%)',
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: 12 }
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>{counts[key]}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grow>
        ))}
      </Grid>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Fade in={loaded} timeout={800}>
            <Card sx={{ borderRadius: 3, boxShadow: 6, p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Top Selling Drugs</Typography>
                <Bar data={barData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
              </CardContent>
            </Card>
          </Fade>
        </Grid>
        <Grid item xs={12} md={6}>
          <Fade in={loaded} timeout={1200}>
            <Card sx={{ borderRadius: 3, boxShadow: 6, p: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Entity Distribution</Typography>
                <Pie data={pieData} options={{ responsive: true }} />
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 