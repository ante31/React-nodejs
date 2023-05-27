import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const workTimeSchema = new Schema({
  Monday: { type: String, required: true },
  Tuesday: { type: String, required: true },
  Wednesday: { type: String, required: true },
  Thursday: { type: String, required: true },
  Friday: { type: String, required: true },
  Saturday: { type: String, required: true },
  Sunday: { type: String, required: true },
});

const productSchema = new Schema({
  name: { type: String, required: true },
  Category: { type: String, required: true },
  productImage: { type: String, required: true },
  availableSizes: { type: [String], required: true },
  availableToppings: { type: [String], required: true },
  prices: { type: [Number], required: true },
});

const objectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: null,
  },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  status: { type: String, required: true },
  workTime: { type: workTimeSchema, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  minimalDelivery: { type: Number, required: true },
  deliveryPrice: { type: Number, required: true },
  products: { type: [productSchema], required: true },
});

const Object = mongoose.model('Object', objectSchema);

export default Object;
