var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  title: String,
  description: String,
  imageUri: String
  })

module.exports = mongoose.model('Product', productSchema);