// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  coverUrl: String,
  category: String, // ✅ added for filtering
});

module.exports = mongoose.model('Book', bookSchema);
