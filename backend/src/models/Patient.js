const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  aadharID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  address: String,
  age: Number,
});

module.exports = mongoose.model('Patient', patientSchema);
