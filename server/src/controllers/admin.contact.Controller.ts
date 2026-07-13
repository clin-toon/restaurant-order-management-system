import type { Request, Response } from "express";
import { insertTheContactData } from "../services/admin.contact.services";

export const handleContactSubmitController = async (
  req: Request,
  res: Response,
) => {
  const result = await insertTheContactData(req.body);

  if (result) {
    return res.status(201).json({
      success: true,
      message: "Submitted your form successfully",
    });
  } else {
    return res.status(500).json({ success: false, message: result });
  }
};
