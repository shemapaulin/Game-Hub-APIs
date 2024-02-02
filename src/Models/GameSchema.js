import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    gameName: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
  },
  { timestamps: false }
);

const gameStrc = mongoose.model("games", gameSchema);

export default gameStrc;
