const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/notesRoutes');
const PORT = process.env.PORT || 3000;
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://Aniruddha:9WIIhZyP1hOpMt5M@cluster0.t9rh375.mongodb.net/Notes_database', { useUnifiedTopology: true });

// Middleware
app.use(express.json());

app.get("/",(req,res) =>{
  res.send('application is running');
})

//Rate limit -logic

const limiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use(limiter);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', noteRoutes);


// Start server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
