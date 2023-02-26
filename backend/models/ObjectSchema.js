import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const workTimeSchema = new Schema({
  Ponedjeljak: { type: String, required: true },
  Utorak: { type: String, required: true },
  Srijeda: { type: String, required: true },
  Cetvrtak: { type: String, required: true },
  Petak: { type: String, required: true },
  Subota: { type: String, required: true },
  Nedjelja: { type: String, required: true },
});

const productSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  kategorija: { type: String, required: true },
  availableSizes: { type: [String], required: true },
  availableToppings: { type: [String], required: true },
  prices: { type: [Number], required: true },
  size: { type: String, default: '' },
  toppings: { type: [String], default: [] },
  price: { type: Number, default: 0 },
  slug: { type: String, required: true },
});

const objectSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  status: { type: String, required: true },
  workTime: { type: workTimeSchema, required: true },
  lokacija: { type: String, required: true },
  image: { type: String, required: true },
  minDostava: { type: Number, required: true },
  cijenaDostave: { type: Number, required: true },
  products: { type: [productSchema], required: true },
});

const Object = mongoose.model('Object', objectSchema);

export default Object;
