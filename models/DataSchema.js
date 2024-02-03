const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  reserveEmail: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'prefer not to say'], // Встановлюємо список можливих значень
    required: true
  },

  address: {
    streetAddress: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    region: {
      type: String,
      required: true
    },
    postalCode: {
      type: Number,
      required: true
    }
  }
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;
