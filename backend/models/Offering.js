const mongoose = require('mongoose');

const OfferingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  href: { type: String },
  detailedDescription: { type: String },
  features: { type: String }, // Comma-separated or Array
  galleryImages: { type: String }, // Comma-separated or Array
  faqs: { type: String }, // Pipe-separated
  heroTitle: { type: String },
  heroDescription: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Offering', OfferingSchema);
