const mongoose = require('mongoose');

const accessoriesSchema = mongoose.Schema({
  accessoryTitle: {type: String, required: true},
  accessoryType: {type: String, required: true},
  accessoryDescription: {type: String, required: true},
  accessoryWidth: {type: String, required: true},
  accessoryHeight: {type: String, required: true},
  accessoryPrice: {type: String, required: true},
  accessoryPic: {type: String, required: true}
});

module.exports = mongoose.model('Accessory', accessoriesSchema);
