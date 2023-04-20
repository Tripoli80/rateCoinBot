import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  telegram_id: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  basecurrency: {
    type: String,
    default: "usd",
  },
  favoritecoins: {
    type: Array,
    default: [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
      },
    ],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
