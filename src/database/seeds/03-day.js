// const dataRows = [
//   {
//     day: 1,
//     homework: true,
//     attendance: true,
//     weekId: 1
//   },
//   {
//     day: 2,
//     homework: true,
//     attendance: true,
//     weekId: 1
//   },
//   {
//     day: 3,
//     homework: true,
//     attendance: true,
//     weekId: 1
//   },
//   {
//     day: 4,
//     homework: true,
//     attendance: true,
//     weekId: 1
//   },
//   {
//     day: 5,
//     homework: true,
//     attendance: true,
//     weekId: 1
//   },
//   {
//     day: 1,
//     homework: true,
//     attendance: true,
//     weekId: 2
//   },
//   {
//     day: 2,
//     homework: true,
//     attendance: true,
//     weekId: 2
//   },
//   {
//     day: 3,
//     homework: true,
//     attendance: true,
//     weekId: 2
//   },
//   {
//     day: 4,
//     homework: true,
//     attendance: true,
//     weekId: 2
//   },
//   {
//     day: 5,
//     homework: true,
//     attendance: true,
//     weekId: 2
//   },
//   {
//     day: 1,
//     homework: true,
//     attendance: true,
//     weekId: 3
//   },
//   {
//     day: 2,
//     homework: true,
//     attendance: true,
//     weekId: 3
//   },
//   {
//     day: 3,
//     homework: true,
//     attendance: true,
//     weekId: 3
//   },
//   {
//     day: 4,
//     homework: true,
//     attendance: true,
//     weekId: 3
//   },
//   {
//     day: 5,
//     homework: true,
//     attendance: true,
//     weekId: 3
//   },
//   {
//     day: 1,
//     homework: true,
//     attendance: true,
//     weekId: 4
//   },
//   {
//     day: 2,
//     homework: true,
//     attendance: true,
//     weekId: 4
//   },
//   {
//     day: 2,
//     homework: true,
//     attendance: true,
//     weekId: 4
//   },
//   {
//     day: 3,
//     homework: true,
//     attendance: true,
//     weekId: 4
//   },
//   {
//     day: 4,
//     homework: true,
//     attendance: true
//     // weekId: 5
//   },
//   {
//     day: 5,
//     homework: true,
//     attendance: true
//     // weekId: 5
//   },
//   {
//     day: 1,
//     homework: true,
//     attendance: true
//     // weekId: 6
//   },
//   {
//     day: 2,
//     homework: true,
//     attendance: true
//     // weekId: 6
//   }
// ];

const faker = require("faker");

const fakeDays = () => {
  const days = [];
  for (var i = 1; i <= 15; i++) {
    for (var j = 1; j <= 5; j++) {
      days.push({
        weekId: i,
        day: j,
        homework: faker.random.boolean(),
        attendance: faker.random.boolean()
      });
    }
    return days;
  }
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("days")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("days").insert(fakeDays());
    });
};