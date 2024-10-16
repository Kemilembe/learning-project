import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,  // Change string to String
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,  // Change string to String
    required: true
  }
}, {
  timestamps: true // createdAt updatedAt
});

const Product = mongoose.model('Product', productSchema);  // Ensure the model is capitalized

export default Product;
