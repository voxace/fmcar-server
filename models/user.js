const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gamertag: { type: String, unique: true, required: true },
  avatar: String,
  registered: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
  salt: String,
  admin: { type: Boolean, default: false },
  active: { type: Boolean, default: false },
  token: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
