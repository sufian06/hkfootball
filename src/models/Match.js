import mongoose, { Schema } from "mongoose";

const scorerSchema = new Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  goals: {
    type: Number,
    default: 1,
    min: 1,
  },
});

const matchSchema = new Schema(
  {
    oponentTeamName: { type: String, default: "Oponent Team" },
    oponentTeamGoals: { type: Number, required: true },
    homeTeamGoals: { type: Number, required: true },

    scorers: [
      {
        playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
        goals: Number,
      },
    ],
  },
  { timestamps: true }
);

const MatchModel =
  mongoose.models.Match || mongoose.model("Match", matchSchema);

export default MatchModel;
