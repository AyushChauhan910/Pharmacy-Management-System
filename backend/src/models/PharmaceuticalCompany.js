const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phone: String,
});

module.exports = mongoose.model('PharmaceuticalCompany', companySchema);
