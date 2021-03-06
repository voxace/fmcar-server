const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    name: { type: String, unique: true, required: true },
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
    logo: String
  }
);

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
