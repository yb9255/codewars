const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const {
  connectDB,
  disconnectDB,
} = require("../utils/mongoose");

describe("register.ejs", () => {
  const user = {
    id: "a",
    password: "b",
  };

  const newUserInfo = {
    id: "adfqetqwodghado",
    password: "dghquworhgoqwrhto"
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
    await User.findOneAndRemove({ id: newUserInfo.id });
    await disconnectDB();
  });

  it("should respond 200 when succeeded in signing up", async () => {
    await request(app)
      .get("/register")
      .expect(200);
  });

  it("should be rejected when try to use occupied id", async () => {
    await request(app)
      .post("/register")
      .send({
        id: "a",
        password: "b",
      })
      .expect(400);
  })

  it("should back to login page when failed to log in", async () => {
    await request(app)
      .post("/register")
      .send(newUserInfo)
      .expect(200);

    const newUser = await User.findOne({ id: newUserInfo.id });
    expect(newUser.id).toBe(newUserInfo.id);
  });
});