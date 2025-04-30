import { faker } from "@faker-js/faker";

// const { faker } = require("@faker-js/faker");

function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

function createRandomUserTwo() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
  };
}

export { createRandomUser, createRandomUserTwo };
