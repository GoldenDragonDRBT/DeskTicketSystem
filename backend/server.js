const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db.js');

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

app.use(express.json()); // This alow to send row "json" file
app.use(express.urlencoded({ extended: false })); // This for except the url encoded form.

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Welcome to the Support Desk API' });
// });

// Routes
app.use('/api/users', require('./routes/userRoutes.js'));
app.use('/api/tickets', require('./routes/ticketRoutes.js'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build'))); // Here setting static folder to the frontend build folder, then we loading the "index.html" file thats in that build folder.

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  ); // ".sendFile()" to send "index.html" file that gon be in the build folder of our React project.
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' });
  });
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
