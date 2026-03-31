const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String },
  content: { type: String },
  author: { type: String },
  date: { type: String },
  readTime: { type: String },
  image: { type: String },
  category: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
