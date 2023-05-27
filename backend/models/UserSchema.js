import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  productImage: { type: String, required: true },
  availableSizes: { type: [String], required: true },
  availableToppings: { type: [String], required: true },
  quantity: { type: Number, default: 0 },
  prices: { type: [Number], required: true },
  size: { type: String, default: '' },
  toppings: { type: [String], default: [] },
  price: { type: Number, default: 0 },
  slug: { type: String, required: true },
});

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  cartItems: { type: [productSchema], default: [] },
});

const User = mongoose.model('User', userSchema);

export default User;
