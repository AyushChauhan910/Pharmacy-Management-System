const Pharmacy = require('../models/Pharmacy');

exports.getAll = async (req, res) => {
  const pharmacies = await Pharmacy.find();
  res.json(pharmacies);
};

exports.getById = async (req, res) => {
  const pharmacy = await Pharmacy.findById(req.params.id);
  if (!pharmacy) return res.status(404).json({ error: 'Not found' });
  res.json(pharmacy);
};

exports.create = async (req, res) => {
  const { name, address, phone } = req.body;
  const pharmacy = new Pharmacy({ name, address, phone });
  await pharmacy.save();
  res.status(201).json(pharmacy);
};

exports.update = async (req, res) => {
  const { name, address, phone } = req.body;
  const pharmacy = await Pharmacy.findByIdAndUpdate(
    req.params.id,
    { name, address, phone },
    { new: true }
  );
  if (!pharmacy) return res.status(404).json({ error: 'Not found' });
  res.json(pharmacy);
};

exports.remove = async (req, res) => {
  const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
  if (!pharmacy) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
};
