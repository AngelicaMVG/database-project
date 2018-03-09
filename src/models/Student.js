const { Model } = require("objection");

class Student extends Model {
  static get tableName() {
    return "student";
  }

  static get relationMappings() {
    const Week = require("./Week.js");
    const Days = require("./Days.js");

    return {
      weeks: {
        relation: Model.HasManyRelation,
        modelClass: Week,
        join: {
          from: "student.id",
          to: "weeks.studentId"
        }
      },
      days: {
        relation: Model.ManyToManyRelation,
        modelClass: Days,
        join: {
          from: "student.id",
          through: {
            from: "weeks.studentId",
            to: "weeks.id"
          },
          to: "days.weekId"
        }
      }
    };
  }
}

module.exports = Student;
