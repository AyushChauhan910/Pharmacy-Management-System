const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
  companyName: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  content: String,
  supervisor: String,
});

contractSchema.index({ pharmacyId: 1, companyName: 1, startDate: 1 }, { unique: true });

module.exports = mongoose.model('Contract', contractSchema);
