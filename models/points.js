const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PeriodSchema = new Schema({
  year: { type: Number, required: true },
  term: { type: Number, required: true },
  week: { type: Number, required: true },
  order: { type: Number },
  teacherLogins: [Schema.Types.ObjectId],
  studentLogins: [Schema.Types.ObjectId],
  averages: {
    all: Number,
    year7: Number,
    year8: Number,
    year9: Number,
    year10: Number,
    year11: Number
  }
});

// Ensure each RAP Period is unique
PeriodSchema.index({ year: 1, term: 1, week: 1 }, { unique: true });

// Get all periods in order
PeriodSchema.statics.GetAllPeriods = function(cb) {
  return this.aggregate([
    {
      $project: {
        year: "$year",
        term: "$term",
        week: "$week"
      }
    },
    {
      $sort: {
        year: -1,
        term: -1,
        week: -1
      }
    }
  ]).exec(cb);
};

// Get student logins for specified period
PeriodSchema.statics.GetStudentLoginsByPeriod = function(period, cb) {
  return this.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(period)
      }
    },
    {
      $unwind : "$studentLogins"
    },
    {
      $project: {
        _id: 0,
        studentId: "$studentLogins"
      }
    },
    {
      $lookup: {
        from: "students",
        localField: "studentId",
        foreignField: "_id",
        as: "student"
      }
    },
    {
      $project: {
        studentId: { $arrayElemAt: ["$student._id", 0] },
        studentNum: { $arrayElemAt: ["$student.student_id", 0] },
        name: { $arrayElemAt: ["$student.name", 0] },
      }
    },
    {
      $sort: {
        "name": 1
      }
    }
  ]).exec(cb);
};

// Get student logins for all periods
PeriodSchema.statics.GetAllStudentLogins = function(period, cb) {
  return this.aggregate([
    {
      $unwind : "$studentLogins"
    },
    {
      $lookup: {
        from: "students",
        localField: "studentLogins",
        foreignField: "_id",
        as: "student"
      }
    },
    {
      $project: {
        year: "$year",
        term: "$term",
        week: "$week",
        studentId: { $arrayElemAt: ["$student._id", 0] },
        name: { $arrayElemAt: ["$student.name", 0] },
      }
    },
    {
      $sort: {
        "name": 1
      }
    },
    {
      $group: {
        _id: { year: "$year", term: "$term", week: "$week"},
        students: {
          $push: {
            studentId: "$studentId",
            name: "$name"
          }
        }
      }
    },
    {
      $sort: {
        "_id.year": -1,
        "_id.term": -1,
        "_id.week": -1
      }
    }
  ]).exec(cb);
};

// Get the details of the latest period (by order)
PeriodSchema.statics.LatestPeriod = function(callback) {
  return this.findOne({ order: { $gte: 0 }})
    .sort('-order')
    .exec(callback);
};

// New Period
PeriodSchema.statics.NewPeriod = function(year, term, week, order, callback) {
  return this.findOneAndUpdate(
    { year: year, term: term, week: week },
    { $set: { year: year, term: term, week: week, order: order } },
    { upsert: true },
    callback
  );
};

// Student Login
PeriodSchema.statics.StudentLogin = function(period, student, callback) {
  console.log('Registering student login: ' + student);
  return this.update(
    { _id: period },
    { $addToSet: { studentLogins: student } },
    callback
  );
};

// Teacher Login
PeriodSchema.statics.TeacherLogin = function(period, teacher, callback) {
  console.log('Registering teacher login: ' + teacher);
  return this.update(
    { _id: period },
    { $addToSet: { teacherLogins: teacher } },
    callback
  );
};

const Period = mongoose.model("Period", PeriodSchema);

module.exports = Period;
