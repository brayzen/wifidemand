// First run this file in node, then copy, the go to Mongo Shell:
// var = arr;  arr.forEach(function(obj){db.customers.insert(obj)})

var Faker = require('faker');

locRefArr = ['Fairplay', 'GeorgeTown', 'Alma', 'Breckenridge', 'Leadville']

var arr = [];
for (var i = 1; i < 500; i++){
    arr.push({
      locRef: locRefArr[Math.floor(Math.random() * 6)],
      email: Faker.internet.email(),
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      street: Faker.address.streetAddress(),
      city: Faker.address.city(),
      state: Faker.address.state(),
      zip: Faker.address.zipCode(),
      phone: Faker.phone.phoneNumber(),
      choice: Math.ceil(Math.random() * 3),
      createdAt: Date.now()
    });
}

console.log(arr);
