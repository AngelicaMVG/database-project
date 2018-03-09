const faker = require("faker");

const fakeStudent = () => {
  const dataRows = [];
  for (var i = 0; i <= 5; i++) {
    dataRows.push({
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      imageLink: faker.image.avatar()
    });
  }
  return dataRows;
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("student")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("student").insert(fakeStudent());
    });
};
