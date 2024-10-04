import { Schema, model, Document, ObjectId } from "mongoose";
import { dateFormat } from "../utils/dateFormat";

interface IThought extends Document {
  thoughtText: string;
  createdAt: Schema.Types.Date;
  username: string;
  reactions: []; // [typeof reactionSchema]
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
    reactions: {
      // * reaction model here
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

const Thought = model("Thought", thoughtSchema);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

export default Thought;