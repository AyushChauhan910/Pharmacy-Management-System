const Sells = require('../models/Sells');

exports.getAll = async (req, res) => {
  const sells = await Sells.find();
  res.json(sells);
};

exports.getById = async (req, res) => {
  const { pharmacyId, tradeName, companyName } = req.params;
  const sell = await Sells.findOne({ pharmacyId, tradeName, companyName });
  if (!sell) return res.status(404).json({ error: 'Not found' });
  res.json(sell);
};

exports.create = async (req, res) => {
  const { pharmacyId, tradeName, companyName, price } = req.body;
  const sell = new Sells({ pharmacyId, tradeName, companyName, price });
  await sell.save();
  res.status(201).json(sell);
};

exports.update = async (req, res) => {
  const { price } = req.body;
  const { pharmacyId, tradeName, companyName } = req.params;
  const sell = await Sells.findOneAndUpdate(
    { pharmacyId, tradeName, companyName },
    { price },
    { new: true }
  );
  if (!sell) return res.status(404).json({ error: 'Not found' });
  res.json(sell);
};

exports.remove = async (req, res) => {
  const { pharmacyId, tradeName, companyName } = req.params;
  const sell = await Sells.findOneAndDelete({ pharmacyId, tradeName, companyName });
  if (!sell) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
}; 