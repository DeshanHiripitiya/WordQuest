const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const cors = require('cors');

const app = express();

// Connect to MySQL database via Sequelize
connectDB();

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Route
app.use('/api/words', require('./routes/api/words'));
app.use('/api/dictionory', require('./routes/api/dictionory'));
app.use('/api/game', require('./routes/api/game'));

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});