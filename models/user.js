const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, unique: true, required: true },
  gamertag: { type: String, unique: true, required: true },
  avatar: String,
  registered: { type: Date, default: Date.now },
  teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
