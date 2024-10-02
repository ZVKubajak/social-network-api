import { Schema, model, Document, ObjectId } from "mongoose";

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: [];
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    // * get: (timestamp: Date) => timestamp.toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: {
    // *
  }
});

const Thought = model('Thought', thoughtSchema);