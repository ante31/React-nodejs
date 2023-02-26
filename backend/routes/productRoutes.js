import express from 'express';
import Object from '../models/objectSchema.js';
import User from '../models/UserSchema.js';
import bcrypt from 'bcryptjs';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Object.find();
  res.send(products);
});

productRouter.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

//popravi doli

productRouter.get('/kul', async (req, res) => {
  res.send("Yep it's working");
});

productRouter.get('/restorani/:slug', async (req, res) => {
  const object = await Object.findOne({ slug: req.params.slug });
  if (object) {
    res.json(object);
  } else {
    res.send('Error 404 - restoran ne postoji');
  }
});

productRouter.post('/signin', async (req, res) => {
  const { email, password } = req.query;
  const user = await User.findOne({ email: email });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
      return;
    }
  }
  res.send({ message: 'Invalid email or password' });
});

productRouter.get('/test/:slug', async (req, res) => {
  const object = await Object.findOne((x) => x.slug === req.params.slug);
  if (object) {
    res.send(object);
  } else {
    res.send('Error 404 - restoran ne postoji');
  }
});

export default productRouter;
