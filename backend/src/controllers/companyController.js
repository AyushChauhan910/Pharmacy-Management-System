const PharmaceuticalCompany = require('../models/PharmaceuticalCompany');

exports.getAll = async (req, res) => {
  const companies = await PharmaceuticalCompany.find();
  res.json(companies);
};

exports.getById = async (req, res) => {
  const company = await PharmaceuticalCompany.findOne({ name: req.params.name });
  if (!company) return res.status(404).json({ error: 'Not found' });
  res.json(company);
};

exports.create = async (req, res) => {
  const { name, phone } = req.body;
  const company = new PharmaceuticalCompany({ name, phone });
  await company.save();
  res.status(201).json(company);
};

exports.update = async (req, res) => {
  const { phone } = req.body;
  const company = await PharmaceuticalCompany.findOneAndUpdate(
    { name: req.params.name },
    { phone },
    { new: true }
  );
  if (!company) return res.status(404).json({ error: 'Not found' });
  res.json(company);
};

exports.remove = async (req, res) => {
  const company = await PharmaceuticalCompany.findOneAndDelete({ name: req.params.name });
  if (!company) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
};
