const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI, port } = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const pharmacyRoutes = require('./routes/pharmacyRoutes');
const companyRoutes = require('./routes/companyRoutes');
const drugRoutes = require('./routes/drugRoutes');
const sellsRoutes = require('./routes/sellsRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const prescriptionDetailsRoutes = require('./routes/prescriptionDetailsRoutes');
const contractRoutes = require('./routes/contractRoutes');
const patientDoctorRoutes = require('./routes/patientDoctorRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/pharmacies', pharmacyRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/drugs', drugRoutes);
app.use('/api/sells', sellsRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/prescription-details', prescriptionDetailsRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/patient-doctors', patientDoctorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Pharmacy Management System API is running');
});

// Connect to MongoDB Atlas and start server
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
