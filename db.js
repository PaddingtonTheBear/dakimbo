const Faker = require('faker');


const booleans = [true, false];

module.exports = () => {
  const db = {
    TeddyBears: [],
    TeddyBearCompanies: [],
    TeddyBearSellers: []
  };

  for (let i = 0; i < 100; i++) {
    db.TeddyBears.push({
      name: Faker.internet.userName(),
      type: Faker.hacker.noun(),
      origin: Faker.address.city(),
      age: Math.floor(Math.random() * 100),
      dateCreated: Faker.date.past(),
      dateObtained: new Date()
    });
  }

  for (let i = 0; i < 5; i++) {
    db.TeddyBearCompanies.push({
      name: Faker.company.companyName(),
      location: Faker.address.city(),
      dateCreated: Faker.date.past()
    });
  }

  for (let i = 0; i < 10; i++) {
    db.TeddyBearSellers.push({
      name: Faker.name.findName(),
      location: Faker.address.city(),
      dateCreated: Faker.date.past()
    });
  }

  return db;
}
