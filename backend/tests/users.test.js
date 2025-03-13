const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

beforeAll(async () => {
  await User.deleteMany({});
});

describe("User Routes", () => {
  
  describe("POST /api/users/signup", () => {
    it("should signup a new user with valid credentials", async () => {
      // Arrange
      const userData = {
        name: "Charlie Davis",
        email: "charlie.davis@example.com",
        password: "HashMy#789!",
        gender: "Other",
        date_of_birth: "1995-12-10",
        address: {
          street: "789 Birch St",
          city: "Tampere",
          state: "Pirkanmaa",
          zip: "33100",
          country: "Finland"
        },
        occupation: "Graphic Designer",
        phone: "1122334455"
      };

      // Act
      const result = await api
      .post("/api/users/signup")
      .send(userData);
      
      console.log("Response status:", result.status);
      console.log("Response body:", result.body);

      // Assert
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty("token");
    });
  });

  describe("POST /api/users/login", () => {
    it("should login a user with valid credentials", async () => {
      // Arrange
      const userData = {
        email: "charlie.davis@example.com",
        password: "HashMy#789!",
      };

      // Act
      const result = await api.post("/api/users/login").send(userData);

      // Assert
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("token");
    });

    it("should return an error with invalid credentials in login", async () => {
      // Arrange
      const userData = {
        email: "charlie.davis@example.com",
        password: "InvalidPassword!",
      };

      // Act
      const result = await api.post("/api/users/login").send(userData);

      // Assert
      expect(result.status).toBe(400);
      expect(result.body).toHaveProperty("error");
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
