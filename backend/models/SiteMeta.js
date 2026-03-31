const mongoose = require('mongoose');

const SiteMetaSchema = new mongoose.Schema({
  hero: {
    title: [String],
    subtitle: String,
    backgroundImage: String,
    trustBadge: String,
    stats: [{ label: String, value: String }]
  },
  stats: [{ label: String, value: String }],
  pricing: {
    title: String,
    description: String,
    items: [{ bhk: String, essential: String, premium: String, luxury: String }]
  },
  faqs: {
    title: String,
    description: String,
    items: [{ question: String, answer: String }]
  },
  blogs_meta: {
    title: String,
    description: String
  },
  offerings_meta: {
    title: String,
    description: String
  },
  projects_meta: {
    title: String,
    description: String
  },
  testimonials: {
    title: String,
    description: String,
    items: [{ name: String, location: String, text: String, image: String }]
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteMeta', SiteMetaSchema);
