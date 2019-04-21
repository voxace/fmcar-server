const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  superAdmin: { type: Schema.Types.ObjectId }
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
