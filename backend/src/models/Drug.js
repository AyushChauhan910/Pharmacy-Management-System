const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  tradeName: { type: String, required: true },
  formula: String,
  companyName: { type: String, required: true, ref: 'PharmaceuticalCompany' },
});

drugSchema.index({ tradeName: 1, companyName: 1 }, { unique: true });

module.exports = mongoose.model('Drug', drugSchema);
