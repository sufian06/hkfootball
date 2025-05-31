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
    oponentTeamName: { type: String },
    oponentTeamGoals: { type: Number, required: true },
    homeTeamGoals: { type: Number, required: true },

    scorers: [scorerSchema],
  },
  { timestamps: true }
);

const MatchModel =
  mongoose.models.Match || mongoose.model("Match", matchSchema);

export default MatchModel;
