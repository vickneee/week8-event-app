const dotenv = require("dotenv");
const Event = require("./models/eventModel"); // Adjust a path as needed
const events = require("./data/events");

dotenv.config();
const connectDB = require("./config/db"); // Ensure your DB connection is set up

connectDB();

const seedEvents = async () => {
  try {
    await Event.deleteMany(); // Clear existing data
    await Event.insertMany(events);
    console.log("Events data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedEvents();
