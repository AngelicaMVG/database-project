const { Model } = require("objection");

class Days extends Model {
  static get tableName() {
    return "days";
  }
  static get relationMappings() {
    const Week = require("./Week.js");

    return {
      week: {
        relation: Model.BelongsToOneRelation,
        modelClass: Week,
        join: {
          from: "days.weekId",
          to: "weeks.id"
        }
      }
    };
  }
}

module.exports = Days;
