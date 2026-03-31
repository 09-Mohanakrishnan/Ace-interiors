const mongoose = require('mongoose');

// We use Strict: false to allow flexible schema, 
// as the frontend Admin Panel relies on adding dynamic content properties.
// In a fully strictly-typed production app, we would explicitly declare every field.
const siteContentSchema = new mongoose.Schema({
  // Since site-content.json is one large nested object, we can just ingest it entirely 
  // into one document for now to preserve quick frontend compatibility.
}, { strict: false, timestamps: true });

module.exports = mongoose.model('SiteContent', siteContentSchema);
