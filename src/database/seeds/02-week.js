const fakeWeeks = () => {
  const weeks = [];
  for (var i = 1; i <= 5; i++) {
    for (var j = 1; j <= 15; j++) {
      weeks.push({
        studentId: i,
        week: j
      });
    }
  }
  return weeks;
};

// const fake = [
//   {
//     week: 1,
//     studentId: 1
//   },
//   {
//     week: 2,
//     studentId: 1
//   },
//   {
//     week: 3,
//     studentId: 1
//   },
//   {
//     week: 4,
//     studentId: 1
//   },
//   {
//     week: 5,
//     studentId: 1
//   },
//   {
//     week: 1,
//     studentId: 2
//   },
//   {
//     week: 2,
//     studentId: 2
//   },
//   {
//     week: 3,
//     studentId: 2
//   },
//   {
//     week: 4,
//     studentId: 2
//   },
//   {
//     week: 5,
//     studentId: 2
//   }
// ];

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('weeks')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('weeks').insert(fakeWeeks());
    });
};
