const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // This relate this field to users objectid
      require: true,
      ref: 'User', //Intended to which collection we referring to, when we indicate to "ObjectId", So it will be user schema.
    },

    ticket: {
      type: mongoose.Schema.Types.ObjectId, // This relate this field to users objectid
      require: true,
      ref: 'Ticket', //Intended to which collection we referring to, when we indicate to "ObjectId", So it will be user schema.
    },

    text: {
      type: String,
      require: [true, 'Please add some text'],
    },

    isStaff: {
      type: Boolean,
      default: false,
    },

    staffId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);

/* Note:
An "enum" type is a special data type that enables for a variable to be a set of predefined constants. The variable must be equal to one of the values that have been predefined for it.

We implementing  "isStaff" it's because when we submit a ticket it's gonna be from the user or our site (admin) or from the "staff" (A staff portal is a website used to give members of staff access to important information. A staff portal is usually private and only available on internal networks. They might also be designed for access from an Internet-enabled computer from anywhere for the sake of convenience. To get access to the staff portal, people generally require a username and password assigned by the company’s IT department. A variety of information can be kept in staff portals, which can range from employee manuals to up-to-date information on contributions to benefits plans).
*/
