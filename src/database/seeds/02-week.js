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

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("weeks")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("weeks").insert(fakeWeeks());
    });
};
