const mongoose = require('mongoose');

const patientDoctorSchema = new mongoose.Schema({
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
});

patientDoctorSchema.index({ patientId: 1, doctorId: 1 }, { unique: true });

module.exports = mongoose.model('PatientDoctor', patientDoctorSchema);
