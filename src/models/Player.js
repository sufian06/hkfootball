import { default as mongoose } from "mongoose";

const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    matches: { type: Number, default: 0 },
    goals: { type: Number, default: 0 },
    jersyNumber: { type: Number, required: true },
    position: { type: String, required: true },
    goalConceded: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    avatar: { type: String, default: "" },
    coverImage: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const PlayerModel =
  mongoose.models.Player || mongoose.model("Player", PlayerSchema);

export default PlayerModel;
