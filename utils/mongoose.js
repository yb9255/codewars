require("dotenv").config()

const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL);
}

async function disconnectDB () {
  await mongoose.disconnect();
}

mongoose.connection.once("open", () => {
  console.log("MongoDB has connected");
});
mongoose.connection.on("error", err => console.log(err));

module.exports = {
  connectDB,
  disconnectDB,
};
