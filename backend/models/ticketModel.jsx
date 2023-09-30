const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // This relate this field to users objectid
      require: true,
      ref: 'User' //Intended to which collection we referring to, when we indicate to "ObjectId", So it will be user schema.
    },

    product: {
      type: String,
      require: [true, 'Please select a product'],
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad']
    },

    description: {
      type: String,
      require: [true, 'Please enter a description of the issue'],
    },

    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new',
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Ticket', ticketSchema)

/* Note:
An "enum" type is a special data type that enables for a variable to be a set of predefined constants. The variable must be equal to one of the values that have been predefined for it.
*/