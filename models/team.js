const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Scheme
const TeacherSchema = new Schema({
  name: {
    type: String,
    index: { unique: true }
  },
  username: {
    type: String,
    lowercase: true
  },
  access: Number,
  faculty: String
});

// Create New Teacher
TeacherSchema.statics.NewTeacher = function(teacher, callback) {
  return this.findOneAndUpdate(
    { name: teacher },
    { $set: { name: teacher } },
    { upsert: true, new: true },
    callback
  );
};

// Create or Update Teacher from all Data
TeacherSchema.statics.NewTeacherFull = function(teacher, callback) {
  return this.findOneAndUpdate(
    { _id: teacher.teacher._id },
    {
      $set: {
        name: teacher.teacher.name,
        username: teacher.teacher.username,
        access: teacher.teacher.access,
        faculty: teacher.teacher.faculty
      }
    },
    { upsert: true, new: true },
    callback
  );
};

// Get a list of all teacher's names
TeacherSchema.statics.GetAllTeacherNames = function(cb) {
  return this.aggregate([
    {
      $project: {
        name: "$name"
      }
    },
    {
      $sort: {
        name: 1
      }
    }
  ]).exec(cb);
};

// Get all teacher data
TeacherSchema.statics.GetAllTeacherData = function(cb) {
  return this.find({}, cb);
};

// Create model
const Teacher = mongoose.model("Teacher", TeacherSchema);

// Export to use in other files
module.exports = Teacher;
