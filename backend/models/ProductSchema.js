import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  Category: { type: String, required: true },
  productImage: { type: String, required: true },
  availableSizes: { type: [String], required: true },
  availableToppings: { type: [String], required: true },
  prices: { type: [Number], required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
