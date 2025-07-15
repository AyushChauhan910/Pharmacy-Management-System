const mongoose = require('mongoose');

const prescriptionDetailsSchema = new mongoose.Schema({
  doctorId: { type: String, required: true },
  patientId: { type: String, required: true },
  prescDate: { type: Date, required: true },
  tradeName: { type: String, required: true },
  companyName: { type: String, required: true },
  quantity: Number,
});

prescriptionDetailsSchema.index(
  { doctorId: 1, patientId: 1, prescDate: 1, tradeName: 1, companyName: 1 },
  { unique: true }
);

module.exports = mongoose.model('PrescriptionDetails', prescriptionDetailsSchema);
