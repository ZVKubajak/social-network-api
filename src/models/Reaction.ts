import mongoose, { Schema, Document } from "mongoose";
import { dateFormat } from "../utils/dateFormat.js";

export interface IReaction extends Document {
  reactionId: Schema.Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: Schema.Types.Date;
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: any) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    timestamps: true,
  }
);

export default reactionSchema;
