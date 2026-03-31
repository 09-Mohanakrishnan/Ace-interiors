const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  location: { type: String },
  image: { type: String },
  price: { type: String },
  type: { type: String },
  sqft: { type: String },
  timeline: { type: String },
  summary: { type: String },
  detailedDescription: { type: String },
  challenge: { type: String },
  solution: { type: String },
  galleryImages: { type: String } // Comma-separated or Array
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
