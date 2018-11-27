const Faker = require('faker');

const booleans = [true, false];

module.exports = () => {
  const db = {
    Products: [],
    Companies: [],
    Sellers: []
  };

  for (let i = 0; i < 100; i++) {
    db.Products.push({
      name: Faker.internet.userName(),
      type: Faker.hacker.noun(),
      origin: Faker.address.city(),
      age: Math.floor(Math.random() * 100),
      dateCreated: Faker.date.past(),
      dateObtained: new Date()
    });
  }

  for (let i = 0; i < 5; i++) {
    db.Companies.push({
      name: Faker.company.companyName(),
      location: Faker.address.city(),
      dateCreated: Faker.date.past()
    });
  }

  for (let i = 0; i < 10; i++) {
    db.Sellers.push({
      name: Faker.name.findName(),
      location: Faker.address.country(),
      dateCreated: Faker.date.past()
    });
  }

  return db;
}
