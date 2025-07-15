const Contract = require('../models/Contract');

exports.getAll = async (req, res) => {
  const contracts = await Contract.find();
  res.json(contracts);
};

exports.getById = async (req, res) => {
  const { pharmacyId, companyName, startDate } = req.params;
  const contract = await Contract.findOne({ pharmacyId, companyName, startDate });
  if (!contract) return res.status(404).json({ error: 'Not found' });
  res.json(contract);
};

exports.create = async (req, res) => {
  const { pharmacyId, companyName, startDate, endDate, content, supervisor } = req.body;
  const contract = new Contract({ pharmacyId, companyName, startDate, endDate, content, supervisor });
  await contract.save();
  res.status(201).json(contract);
};

exports.update = async (req, res) => {
  const { endDate, content, supervisor } = req.body;
  const { pharmacyId, companyName, startDate } = req.params;
  const contract = await Contract.findOneAndUpdate(
    { pharmacyId, companyName, startDate },
    { endDate, content, supervisor },
    { new: true }
  );
  if (!contract) return res.status(404).json({ error: 'Not found' });
  res.json(contract);
};

exports.remove = async (req, res) => {
  const { pharmacyId, companyName, startDate } = req.params;
  const contract = await Contract.findOneAndDelete({ pharmacyId, companyName, startDate });
  if (!contract) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
}; 