const Drug = require('../models/Drug');

exports.getAll = async (req, res) => {
  const drugs = await Drug.find();
  res.json(drugs);
};

exports.getById = async (req, res) => {
  const drug = await Drug.findOne({ tradeName: req.params.tradeName, companyName: req.params.companyName });
  if (!drug) return res.status(404).json({ error: 'Not found' });
  res.json(drug);
};

exports.create = async (req, res) => {
  const { tradeName, formula, companyName } = req.body;
  const drug = new Drug({ tradeName, formula, companyName });
  await drug.save();
  res.status(201).json(drug);
};

exports.update = async (req, res) => {
  const { formula } = req.body;
  const drug = await Drug.findOneAndUpdate(
    { tradeName: req.params.tradeName, companyName: req.params.companyName },
    { formula },
    { new: true }
  );
  if (!drug) return res.status(404).json({ error: 'Not found' });
  res.json(drug);
};

exports.remove = async (req, res) => {
  const drug = await Drug.findOneAndDelete({ tradeName: req.params.tradeName, companyName: req.params.companyName });
  if (!drug) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
}; 