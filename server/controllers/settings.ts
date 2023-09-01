import { Request, Response } from "express";
import Settings from "../model/Settings";
import { SettingMode } from "../ts/types";

export const getAll = async (_req: Request, res: Response) => {
  try {
    const result = await Settings.find();

    if (!result) {
      return res.status(400).json("Setting doesn't exist");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { setting } = req.query;

  try {
    const result = await Settings.findOne({ setting });

    if (!result) {
      return res.status(400).json("Setting doesn't exist");
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const modidy = async (req: Request, res: Response) => {
  const { setting } = req.body;

  try {
    const result = await Settings.findOne({ setting });

    if (!result) {
      return res.status(400).json("Setting doesn't exist");
    }

    result.mode =
      result.mode === SettingMode.On ? SettingMode.Off : SettingMode.On;

    await result.save();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};

export const add = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    if (!name) {
      return res.status(400).json("Name is necessary");
    }
    await new Settings({
      setting: name,
      mode: SettingMode.On,
    }).save();

    return res.status(200).json("Setting has been successfully created");
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
};
