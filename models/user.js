const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  username: {
    type: String,
    lowercase: true,
    trim: true
  },
  gender: String,
  student_id: {
    type: Number,
    index: { unique: true }
  },
  longTermAverage: {
    type: Number,
    default: 0
  },
  cohort: {
    type: Number,
    default: 0
  },
  lastSeen: Schema.Types.ObjectId
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
