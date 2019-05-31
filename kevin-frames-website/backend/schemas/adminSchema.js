const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  isAdmin: {type: Boolean, required: true},
  djoin: {type: String, required: true}
});

module.exports = mongoose.model('Admin', adminSchema);
