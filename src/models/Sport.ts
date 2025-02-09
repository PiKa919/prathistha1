import { Schema, model, models } from "mongoose";

const participantSchema = new Schema({
  name: String,
  branch: String,
  year: Number,
});

const sportSchema = new Schema({
  name: { type: String, required: true },
  icon: String,
  type: { type: String, enum: ["indoor", "outdoor"], required: true },
  gender: { type: String, enum: ["boys", "girls", "mixed"], required: true },
  category: { type: String, enum: ["single", "double", "team"], required: true },
  winner: participantSchema,
  runnerUp: participantSchema
});

export const Sport = models.Sport || model("Sport", sportSchema);
