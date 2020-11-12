const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  CompanyName: {
    type: String,
  },
  CompanyStreet: {
    type: String,
  },
  CompanyZip: {
    type: String,
  },
  CompanyCity: {
    type: String,
  },
  CompanyVat: {
    type: String,
  },
  CompanyPhone: {
    type: String,
  },

  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Invoice',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
