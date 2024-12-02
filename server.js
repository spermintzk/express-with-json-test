const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Enable CORS
app.use(cors());

// JSON өгөгдөлтэй ажиллахад тохируулах
app.use(express.json());

// MongoDB холболт
mongoose.connect('mongodb://localhost:27017/typeORM', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Модел үүсгэх
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  books: {
    id: [mongoose.Schema.Types.ObjectId],
    title: [String],
    year: [Number],
    price: [Number],
  },
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Author = mongoose.model('Author', authorSchema);

// API - Хэрэглэгчийн жагсаалт авах
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Хэрэглэгчдийн өгөгдлийг авахад алдаа гарлаа' });
  }
});

// API - Барааны жагсаалт авах
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Барааны өгөгдлийг авахад алдаа гарлаа' });
  }
});

// API - Зохиолчдын жагсаалт авах
app.get('/api/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Зохиолчдын өгөгдлийг авахад алдаа гарлаа' });
  }
});

// Серверийг ажиллуулах
app.listen(4000, () => {
  console.log('Express.js сервер 4000 порт дээр ажиллаж байна');
});