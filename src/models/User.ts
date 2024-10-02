import { Schema, model, Document, ObjectId } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  thoughts: ObjectId[];
  friends: ObjectId[];
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: () => Promise.resolve(false),
      message: "Email validation failed",
    },
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
