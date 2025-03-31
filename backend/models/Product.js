const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: String },
  numberOfRatings: { type: String },
  price: { type: String },
  discount: { type: String },
  aboutThisItem: [{ type: String }],
  productInformation: { type: Map, of: String },
  productImages: [{ type: String }],
  aiSummary: { type: String },
  bankOffers: [{ type: String }],
  manufacturerImages: [{ type: String }],
});

module.exports = mongoose.model('Product', productSchema);
