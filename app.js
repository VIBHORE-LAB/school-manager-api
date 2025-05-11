const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory
app.use('/', schoolRoutes); // API routes

// Add this simple GET route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the School Management API!, created by Raashika Sharma!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
