const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: false },
  phone: { type: String, required: true },
  message: { type: String },
  source: { type: String, default: 'Website' },
  status: { type: String, default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Lead', LeadSchema);
