const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const colors = require('colors');

connectDB();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static 
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'));
} else {
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to the Support Desk API'
    });
  });
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});