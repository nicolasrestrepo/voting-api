const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({

  name: {
    type: String
  },
  description: {
    type: String
  },
  timePublished: {
    type: String
  },
  category: {
    type: String
  },
  photo: {
    type: String
  },
  percentageUp: {
    type: Number
  }
})

module.exports = mongoose.model('Candidate', candidateSchema);