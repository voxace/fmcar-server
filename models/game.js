const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    name: String,
    logo: String
  }
);

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;
