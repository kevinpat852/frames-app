const mongoose = require('mongoose');

const woodSchema = mongoose.Schema({
  frameTitle: {type: String, required: true},
  frameType: {type: String, required: true},
  frameColor: {type: String, required: true},
  frameWidth: {type: String, required: true},
  frameHeight: {type: String, required: true},
  framePrice: {type: String, required: true},
  framePic: {type: String, required: true}
});

module.exports = mongoose.model('Wood', woodSchema);
