const User = require("../server/db/schemas/user");
const randomUsers = require("./randomizeUsers");
const { connect, db } = require("../server/db/index");

async function seed() {
  await connect();
  console.log("DB is synced!");
  await User.deleteMany({});
  console.log("Collection has been cleared.");
  const users = await User.create(randomUsers);
  console.log(`Seeded ${users.length} users.`);
  // db.close()
  // console.log('Database connection is closed.')
}

async function testQuery() {
  const allUsers = await User.find({
    gender: {
      own: "Male",
      preferred: "Female"
    },
    "age.own": {
      $gte: 25,
      $lte: 35
    },
    "age.preferred.min": {
      $lte: 30
    },
    "age.preferred.max": {
      $gte: 30
    }
  }).exec();
  console.log(`Number of results: ${allUsers.length}`);
  console.log("Example User: ", allUsers[0]);
}

async function seedAndTest() {
  const start = new Date().getTime();
  await seed();
  const middle = new Date().getTime();
  await testQuery();
  const end = new Date().getTime();
  console.log(`Seeding Time: ${(middle - start) / 1000} seconds`);
  console.log(`Query Time: ${(end - middle) / 1000} seconds`);
}

// seedAndTest()
seed();
module.exports = seed;
