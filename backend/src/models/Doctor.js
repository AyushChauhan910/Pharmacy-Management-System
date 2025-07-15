const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  aadharID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  specialty: String,
  experience: Number,
});

module.exports = mongoose.model('Doctor', doctorSchema);
