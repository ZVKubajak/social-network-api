import { User } from "../models/index";
import { Request, Response } from "express";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select("-__v");

    if (!user) {
      res.status(404).json({ message: "No user with this ID." });
    } else {
      res.json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const dbUserData = await User.create(req.body);
    res.json(dbUserData);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidatiors: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user with this ID." });
    }

    res.json(user);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: "No user with this ID." });
    }

    res.json(user);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};

// * -- Friend Methods -- * //

export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user with this ID." });
    }

    res.json(user);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No user with this ID." });
    }

    res.json(user);
    return;
  } catch (error) {
    res.status(500).json(error);
  }
};
