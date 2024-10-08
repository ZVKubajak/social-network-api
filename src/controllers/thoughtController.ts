import { Thought } from "../models/index";
import { Request, Response } from "express";

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select(
      "-__v"
    );

    if (!thought) {
      res.status(404).json({ message: "No thought with this ID." });
    } else {
      res.json(thought);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const dbThoughtData = await Thought.create(req.body);
    res.json(dbThoughtData);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidatiors: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought with this ID." });
    }

    res.json(thought);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      return res.status(404).json({ message: "No thought with this ID." });
    }

    res.json(thought);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};

// * -- Reaction Methods -- * //

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought with this ID." });
    }

    res.json(thought);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought with this ID." });
    }

    res.json(thought);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};
