import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import * as productController from './controllers/productController.js';
import * as categoryController from './controllers/categoryController.js';
import * as orderController from './controllers/orderController.js';
import * as userController from './controllers/userController.js';

import { orderValidation, userValitdation } from './validations.js';
import { handleValidationsErrors } from './utils/handleValidationsErrors.js';
import checkAuth from './utils/checkAuth.js';

const app = express();

app.use(express.json());
app.use(cors());

//Connect to DB and create server
mongoose
  .connect(
    'mongodb+srv://vadik:12345@cluster0.lrrifdd.mongodb.net/compcompany?retryWrites=true&w=majority', 
  )
  // mongodb+srv://brod:12BroD21@cluster.8z0udat.mongodb.net/sportstore?retryWrites=true&w=majority
  .then(() => console.log('DB ok'))
  .catch((err) => console.log(err));

app.listen('4000', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Server started');
});

//Query

app.get('/products', productController.getALl);

app.get('/products/:id', productController.getOne);

app.get('/categories', categoryController.getCategory);

app.get('/auth', checkAuth, userController.auth);

app.post('/order', checkAuth, orderController.createOrder);

app.post('/login', userController.login);

app.post('/register', userValitdation, handleValidationsErrors, userController.reqister);
