const Prescription = require('../models/Prescription');

exports.getAll = async (req, res) => {
  const prescriptions = await Prescription.find();
  res.json(prescriptions);
};

exports.getById = async (req, res) => {
  const { doctorId, patientId, prescDate } = req.params;
  const prescription = await Prescription.findOne({ doctorId, patientId, prescDate });
  if (!prescription) return res.status(404).json({ error: 'Not found' });
  res.json(prescription);
};

exports.create = async (req, res) => {
  const { doctorId, patientId, prescDate } = req.body;
  const prescription = new Prescription({ doctorId, patientId, prescDate });
  await prescription.save();
  res.status(201).json(prescription);
};

exports.update = async (req, res) => {
  const { prescDate } = req.body;
  const { doctorId, patientId } = req.params;
  const prescription = await Prescription.findOneAndUpdate(
    { doctorId, patientId },
    { prescDate },
    { new: true }
  );
  if (!prescription) return res.status(404).json({ error: 'Not found' });
  res.json(prescription);
};

exports.remove = async (req, res) => {
  const { doctorId, patientId, prescDate } = req.params;
  const prescription = await Prescription.findOneAndDelete({ doctorId, patientId, prescDate });
  if (!prescription) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
};

// Get all prescriptions for a patient in a date range
exports.getByPatientAndDateRange = async (req, res) => {
  const { patientId, startDate, endDate } = req.query;
  const prescriptions = await Prescription.find({
    patientId,
    prescDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
  });
  res.json(prescriptions);
}; 