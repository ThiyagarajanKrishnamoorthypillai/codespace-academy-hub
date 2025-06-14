const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, default: null },
  isAdmin: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now } // ✅ Add this line

});

module.exports = mongoose.model('User', userSchema);
