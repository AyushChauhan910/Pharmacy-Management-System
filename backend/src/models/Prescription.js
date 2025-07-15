const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  doctorId: { type: String, required: true },
  patientId: { type: String, required: true },
  prescDate: { type: Date, required: true },
});

prescriptionSchema.index({ doctorId: 1, patientId: 1, prescDate: 1 }, { unique: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);
