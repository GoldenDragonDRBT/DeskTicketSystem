const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware.jsx')

const PORT = process.env.PORT || 5000;

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
