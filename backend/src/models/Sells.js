const mongoose = require('mongoose');

const sellsSchema = new mongoose.Schema({
  pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy', required: true },
  tradeName: { type: String, required: true },
  companyName: { type: String, required: true },
  price: Number,
});

sellsSchema.index({ pharmacyId: 1, tradeName: 1, companyName: 1 }, { unique: true });

module.exports = mongoose.model('Sells', sellsSchema);
