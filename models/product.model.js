const mongoose = require('mongoose');

//schema definition 
const productSchema = new mongoose.Schema({

   title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  rating: {
    type: String,
  },
  price: {
    type: String,
    trim: true,
  },
  offerprice: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
  },
});


//model creation 
module.exports = mongoose.model('products',productSchema);