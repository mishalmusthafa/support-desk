const mongoose = require('mongoose');


const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
  product: {
    type: String,
    require: [true, 'Please select a Product'],
    enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'], //change the product from here
  },
  description: {
    type: String,
    require: [true, 'Please add the description of the issue']
  },
  status: {
    type: String,
    required: true,
    enum: ['new', 'open', 'closed'],
    default: ['new']
  }
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);


// Bring the userSchem model to the userController
