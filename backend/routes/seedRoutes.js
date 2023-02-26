import express from 'express';
import Object from '../models/objectSchema.js';
import User from '../models/UserSchema.js';
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Object.remove({});
  const createdObjects = await Object.insertMany(data.objects);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdObjects, createdUsers });
});
export default seedRouter;
