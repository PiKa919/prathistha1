import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  name: string;
  icon: string;
  type: "single" | "team"; // Restrict to these values
  event: "aurum" | "verve"; // Restrict to these values
  enabled: boolean;
  price: string; // Added price field
}

const EventSchema: Schema<IEvent> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    type: { type: String, enum: ["single", "team"], required: true },
    event: { type: String, enum: ["aurum", "verve"], required: true },
    enabled: { type: Boolean, default: true },
    price: { type: String, required: true }, // Added price field
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

const Event: Model<IEvent> = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);

export default Event;
