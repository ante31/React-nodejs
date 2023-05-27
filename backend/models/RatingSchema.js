import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // reference to User model
  },
  objectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Object', // reference to Restaurant model
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
