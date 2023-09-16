const mongoose = require('mongoose') // "Mongoose" library connects between "Express" web framework to the MongoDB data management

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI) // "conn" for connection
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold)
    process.exit(1) // If it's fail it will exit entire process.
  }
}

module.exports = connectDB

/* Note:
"Mongoose" has a models where we create a "schema" that includes fields of data on how the user interact between frontend and backend. 
*/