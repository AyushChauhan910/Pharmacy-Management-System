const Patient = require('../models/Patient');

// Get all patients
exports.getAll = async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
};

// Get patient by AadharID
exports.getById = async (req, res) => {
  const patient = await Patient.findOne({ aadharID: req.params.id });
  if (!patient) return res.status(404).json({ error: 'Not found' });
  res.json(patient);
};

// Add new patient
exports.create = async (req, res) => {
  const { aadharID, name, address, age } = req.body;
  const patient = new Patient({ aadharID, name, address, age });
  await patient.save();
  res.status(201).json(patient);
};

// Update patient
exports.update = async (req, res) => {
  const { name, address, age } = req.body;
  const patient = await Patient.findOneAndUpdate(
    { aadharID: req.params.id },
    { name, address, age },
    { new: true }
  );
  if (!patient) return res.status(404).json({ error: 'Not found' });
  res.json(patient);
};

// Delete patient
exports.remove = async (req, res) => {
  const patient = await Patient.findOneAndDelete({ aadharID: req.params.id });
  if (!patient) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
};
