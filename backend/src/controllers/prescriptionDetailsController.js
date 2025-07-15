const PrescriptionDetails = require('../models/PrescriptionDetails');

exports.getAll = async (req, res) => {
  const details = await PrescriptionDetails.find();
  res.json(details);
};

exports.getById = async (req, res) => {
  const { doctorId, patientId, prescDate, tradeName, companyName } = req.params;
  const detail = await PrescriptionDetails.findOne({ doctorId, patientId, prescDate, tradeName, companyName });
  if (!detail) return res.status(404).json({ error: 'Not found' });
  res.json(detail);
};

exports.create = async (req, res) => {
  const { doctorId, patientId, prescDate, tradeName, companyName, quantity } = req.body;
  const detail = new PrescriptionDetails({ doctorId, patientId, prescDate, tradeName, companyName, quantity });
  await detail.save();
  res.status(201).json(detail);
};

exports.update = async (req, res) => {
  const { quantity } = req.body;
  const { doctorId, patientId, prescDate, tradeName, companyName } = req.params;
  const detail = await PrescriptionDetails.findOneAndUpdate(
    { doctorId, patientId, prescDate, tradeName, companyName },
    { quantity },
    { new: true }
  );
  if (!detail) return res.status(404).json({ error: 'Not found' });
  res.json(detail);
};

exports.remove = async (req, res) => {
  const { doctorId, patientId, prescDate, tradeName, companyName } = req.params;
  const detail = await PrescriptionDetails.findOneAndDelete({ doctorId, patientId, prescDate, tradeName, companyName });
  if (!detail) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
};

// Get all details for a patient and date
exports.getByPatientAndDate = async (req, res) => {
  const { patientId, prescDate } = req.query;
  const details = await PrescriptionDetails.find({ patientId, prescDate: new Date(prescDate) });
  res.json(details);
}; 