const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const {
  connectDB,
  disconnectDB,
} = require("../utils/mongoose");

describe("login.ejs", () => {
  const user = {
    id: "a",
    password: "b",
  };

  beforeAll(async () => {
    await connectDB();

    await User.updateOne({
      id: user.id,
    }, user, {
      upsert: true,
    });
  });

  afterAll(async () => {
    await disconnectDB();
  });

  it("should redirect to login page when not logged in", async () => {
    await request(app)
      .get("/")
      .expect(302);
  });

  it("should redirect to main page when logged in", async () => {
    await request(app)
      .post("/login")
      .send({
        id: "a",
        password: "b",
      })
      .redirects("/")
      .expect(200);
  })

  it("should back to login page when failed to log in", async () => {
    await request(app)
      .post("/login")
      .send({
        id: "adfqetqwodghado",
        password: "dghquworhgoqwrhto"
      })
      .redirects("/login");
  });
});