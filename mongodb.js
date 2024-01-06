const mongoose = require('mongoose');
const url = 'mongodb+srv://Aniruddha:9WIIhZyP1hOpMt5M@cluster0.t9rh375.mongodb.net/test';
const database = 'e-com';

async function connectToDatabase() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
    return mongoose.connection.db.collection('products');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };
