import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';

function Dashboard() {
  const [counts, setCounts] = useState({ patients: 0, doctors: 0, pharmacies: 0, drugs: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      const [patients, doctors, pharmacies, drugs] = await Promise.all([
        axios.get('http://localhost:5000/api/patients'),
        axios.get('http://localhost:5000/api/doctors'),
        axios.get('http://localhost:5000/api/pharmacies'),
        axios.get('http://localhost:5000/api/drugs'),
      ]);
      setCounts({
        patients: patients.data.length,
        doctors: doctors.data.length,
        pharmacies: pharmacies.data.length,
        drugs: drugs.data.length,
      });
    };
    fetchCounts();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Patients</Typography>
              <Typography variant="h4">{counts.patients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Doctors</Typography>
              <Typography variant="h4">{counts.doctors}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pharmacies</Typography>
              <Typography variant="h4">{counts.pharmacies}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Drugs</Typography>
              <Typography variant="h4">{counts.drugs}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard; 