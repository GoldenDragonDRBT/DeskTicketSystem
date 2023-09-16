const express = require('express');
const colors = require('colors')
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware.jsx')
const connectDB = require('./config/db.jsx')

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB()

const app = express();

app.use(express.json()) // This alow to send row "json" file
app.use(express.urlencoded({ extended: false })) // This for except the url encoded form. 

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
});

// Routes
app.use('/api/users', require('./routes/userRoutes.jsx'));

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
