import {
  createCustomer,
  isUserAlreadyRegistered,
  loginUser,
  registerContactInfo,
} from "../services/user.services";
import type { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { signToken } from "../utils/utils";
import type { AuthRequest } from "../types/express";
import { getTheContactStatus } from "../services/admin.contact.services";

export const registerController = async (req: Request, res: Response) => {
  const { email } = req.body;

  const exists = await isUserAlreadyRegistered(email, "customers");
  if (exists) throw new AppError("User exists ", 409);

  const newCustomer = await createCustomer(req.body);

  res.status(201).json({
    status: "success",
    message: "Account has been created successfully",
    data: { user: newCustomer },
  });
};

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 1. Authenticate user via service
  const user = await loginUser(email, password);

  // 2. Generate Token (Payload usually contains ID and Role)
  const token = signToken({
    id: user.id,
    role: user.role,
    name: user.first_name,
  });

  // 3. Send Response
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Log in successful",
  });
};

export const getUserDetails = async (req: AuthRequest, res: Response) => {
  res.status(200).json({ data: req.user, success: true });
};

export const handleLogOut = async (req: AuthRequest, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.status(200).json({
    success: true,
    message: "Logged out succesfully",
  });
};

export const contactController = async (req: Request, res: Response) => {
  const result = await getTheContactStatus(req.body.email);

  const contactArray = result?.contact;

  const isAlreadyReplied = contactArray?.find(
    (item: any) => item.status === "replied",
  );

  if (
    (result?.count > 0 && result?.contact[0].status === "pending") ||
    !isAlreadyReplied
  ) {
    console.log("1st mathced ");
    return res.status(400).json({
      success: false,
      message: "Please wait until your previous contact form is resolved ",
    });
  }

  if (result?.count === 0) {
    console.log("2rd matched");
    const information = await registerContactInfo(req.body);
    return res.status(201).json({
      success: true,
      message: "Data inserted successfully",
      data: information,
    });
  }

  if (result?.count > 0 && isAlreadyReplied === undefined) {
    console.log("3rd matched");

    const information = await registerContactInfo(req.body);
    return res.status(201).json({
      success: true,
      message: "Data inserted successfully",
      data: information,
    });
  }
};
