import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Object from './models/objectSchema.js';
import User from './models/UserSchema.js';
import Product from './models/ProductSchema.js';
import Rating from './models/RatingSchema.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://Ante:A2mt3UTB@cluster.dvnypvh.mongodb.net/mybd', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch((error) => {
    console.error('Error connecting to mongodb:', error);
  });

// API endpoint to fetch data from "objects" collection
app.get('/api', (req, res) => {
  Object.find({}, (err, objects) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
    } else {
      res.send(objects);
    }
  });
});

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
    } else {
      console.log(users);
      res.send(users);
    }
  });
});

app.get('/api/:objectID', async (req, res) => {
  try {
    const objectID = req.params.objectID;

    const object = await Object.findById(objectID);

    if (!object) {
      return res.status(404).json({ message: 'Object not found' });
    }

    res.status(200).json(object);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/api/:objectID', (req, res) => {
  const objectID = req.params.objectID;

  Object.findByIdAndDelete(objectID)
    .then(() => {
      res
        .status(200)
        .json({ message: `User with ID ${objectID} deleted successfully` });
    })
    .catch((error) => {
      res.status(500).json({
        message: `Failed to delete user with ID ${objectID}: ${error.message}`,
      });
    });
});

// Define DELETE endpoint for deleting a user by ID
app.delete('/api/users/:userID', (req, res) => {
  const userID = req.params.userID;

  User.findByIdAndDelete(userID)
    .then(() => {
      res
        .status(200)
        .json({ message: `User with ID ${userID} deleted successfully` });
    })
    .catch((error) => {
      res.status(500).json({
        message: `Failed to delete user with ID ${userID}: ${error.message}`,
      });
    });
});

app.put('/api/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await User.updateOne({ _id: userId }, updateData);
    console.log('User updated successfully');
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/users/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/api/:objectID', async (req, res) => {
  const objectID = req.params.objectID;
  const updateData = req.body;

  try {
    const updatedObject = await Object.updateOne({ _id: objectID }, updateData);
    console.log('User updated successfully');
    res.status(200).json(updatedObject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/restorani/:slug', async (req, res) => {
  const object = await Object.findOne({ slug: req.params.slug });
  if (object) {
    res.json(object);
  } else {
    res.send('Error 404 - restoran ne postoji');
  }
});

app.post('/api/signin', async (req, res) => {
  const { email, password } = req.query;
  const user = await User.findOne({ email: email });
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        cartItems: user.cartItems,
      });
      return;
    }
  }
  res.send({ message: 'Invalid email or password' });
});

app.post('/api/addRestaurant', (req, res) => {
  const formData = req.body;
  const object = new Object(formData);

  object
    .save()
    .then(() => {
      res.status(201).send('Data saved successfully');
    })
    .catch((error) => {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    });
});

app.post('/api/registracija', (req, res) => {
  const { username, email, password, role } = req.body;
  const newPassword = bcrypt.hashSync(password);
  console.log(newPassword);

  // Check if the user already exists in the database
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(500).send({ message: err.message });
    }
    if (existingUser) {
      return res.status(400).send({ message: 'Korisnik već postoji' });
    }

    // Create a new user object with the email and password
    const newUser = new User({ username, email, password: newPassword, role });

    // Save the user object to the MongoDB database
    newUser.save(function (err, doc) {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      console.log('Saved to MongoDB:', doc);
    });
  });
});

app.post('/api/updateCartItems', async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    // find user in database and update cartItems
    const user = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );

    res.status(200).json({ message: 'Cart items updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Update the object after deleting a product
app.put('/api/:objectId/products/:productId', async (req, res) => {
  const objectId = req.params.objectId;
  const productId = req.params.productId;

  // Find the object with the specified ID
  const object = await Object.findById(objectId);

  const index = object.products.findIndex(
    (el) => el._id.toString() === productId
  );

  object.products.splice(index, 1);

  console.log('After removal:', object.products);

  await Object.updateOne({ _id: objectId }, object);

  // Save the updated object to the database
});

//Add product
app.post('/api/:objectId/products', async (req, res) => {
  try {
    const objectId = req.params.objectId;
    const product = req.body;
    const object = await Object.findById(objectId);
    if (!object) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    object.products.push(product);

    const updatedObject = await Object.updateOne({ _id: objectId }, object);
    console.log('Object updated successfully');
    res.status(200).json(updatedObject);
  } catch {
    console.log('Nesto ne valja');
  }
});

app.put('/api/:objectId/products/:productId/update', async (req, res) => {
  const objectId = req.params.objectId;
  const productId = req.params.productId;

  // Find the object with the specified ID
  const object = await Object.findById(objectId);
  if (!object) {
    return res.status(404).json({ error: 'Object not found' });
  }

  // Find the index of the product to be updated
  const productIndex = object.products.findIndex(
    (product) => product._id.toString() === productId
  );
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Update the product with the new data
  object.products[productIndex].name = req.body.name;
  object.products[productIndex].Category = req.body.Category;
  object.products[productIndex].productImage = req.body.productImage;
  object.products[productIndex].availableSizes = req.body.availableSizes;
  object.products[productIndex].availableToppings = req.body.availableToppings;
  object.products[productIndex].prices = req.body.prices;

  // Save the updated object to the database
  console.log(object.products);
  try {
    const updatedObject = await Object.updateOne({ _id: objectId }, object);
    res.json(updatedObject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Submit a rating to a object
app.post('/api/rate', async (req, res) => {
  const { objectId, userId, rating, comment } = req.body;
  const existingRating = await Rating.findOne({
    objectId: objectId,
    userId: userId,
  });

  if (existingRating) {
    existingRating.rating = rating;
    existingRating.comment = comment;
    try {
      const updatedRating = await existingRating.save();
      res.status(200).json(updatedRating);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update rating' });
    }
  } else {
    const newRating = new Rating({
      userId: userId,
      objectId: objectId,
      rating,
      comment,
    });
    try {
      const savedRating = await newRating.save();
      res.status(201).json(savedRating);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit rating' });
    }
  }
});

//find a rating based on userId and objectId
app.get('/api/rate/:objectId/:userId', async (req, res) => {
  const { objectId, userId } = req.params;

  try {
    const rating = await Rating.findOne({ objectId, userId });
    res.status(200).json({
      rating: rating ? rating.rating : null,
      comment: rating ? rating.comment : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//Rating Calculation
app.put('/api/:objectId/updateRating', async (req, res) => {
  const objectId = req.params.objectId;

  const objectRatings = await Rating.find({ objectId }); // Get all ratings for this object
  const totalRating = objectRatings.reduce(
    (sum, rating) => sum + rating.rating,
    0
  ); // Calculate total rating
  const averageRating = totalRating / objectRatings.length; // Calculate average rating
  const numOfReviews = objectRatings.length; // Get number of reviews
  console.log(totalRating, ' / ', numOfReviews, ' = ', averageRating);
  await Object.updateOne(
    { _id: objectId },
    { rating: averageRating, reviews: numOfReviews }
  );

  res.sendStatus(200);
});

app.get('/api/rate/:objectId', async (req, res) => {
  const { objectId } = req.params;

  try {
    const ratings = await Rating.find({ objectId });
    console.log('Ratings', ratings);
    res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(5000, () => {
  console.log(`Server listening at http://localhost:5000`);
});
