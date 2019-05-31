const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
  feedback: {type: String, required: true},
  suggestions: {type: String}
});

module.exports = mongoose.model('Survey', surveySchema);
