const PatientDoctor = require('../models/PatientDoctor');

exports.getAll = async (req, res) => {
  const relations = await PatientDoctor.find();
  res.json(relations);
};

exports.getById = async (req, res) => {
  const { patientId, doctorId } = req.params;
  const relation = await PatientDoctor.findOne({ patientId, doctorId });
  if (!relation) return res.status(404).json({ error: 'Not found' });
  res.json(relation);
};

exports.create = async (req, res) => {
  const { patientId, doctorId } = req.body;
  const relation = new PatientDoctor({ patientId, doctorId });
  await relation.save();
  res.status(201).json(relation);
};

exports.remove = async (req, res) => {
  const { patientId, doctorId } = req.params;
  const relation = await PatientDoctor.findOneAndDelete({ patientId, doctorId });
  if (!relation) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
}; 