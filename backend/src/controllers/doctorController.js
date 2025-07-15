const Doctor = require('../models/Doctor');

exports.getAll = async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};

exports.getById = async (req, res) => {
  const doctor = await Doctor.findOne({ aadharID: req.params.id });
  if (!doctor) return res.status(404).json({ error: 'Not found' });
  res.json(doctor);
};

exports.create = async (req, res) => {
  const { aadharID, name, specialty, experience } = req.body;
  const doctor = new Doctor({ aadharID, name, specialty, experience });
  await doctor.save();
  res.status(201).json(doctor);
};

exports.update = async (req, res) => {
  const { name, specialty, experience } = req.body;
  const doctor = await Doctor.findOneAndUpdate(
    { aadharID: req.params.id },
    { name, specialty, experience },
    { new: true }
  );
  if (!doctor) return res.status(404).json({ error: 'Not found' });
  res.json(doctor);
};

exports.remove = async (req, res) => {
  const doctor = await Doctor.findOneAndDelete({ aadharID: req.params.id });
  if (!doctor) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
};
