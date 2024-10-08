import { Schema, model, Document } from "mongoose";
import { dateFormat } from "../utils/dateFormat.js";

import reactionSchema, { IReaction } from "./Reaction.js";

interface IThought extends Document {
  thoughtText: string;
  createdAt: Schema.Types.Date;
  username: string;
  reactions: IReaction[];
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: any) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      reactionSchema, // .populate()
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
    timestamps: true,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

export default Thought;
