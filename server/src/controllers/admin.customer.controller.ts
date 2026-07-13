import type { Response } from "express";
import type { AuthRequest } from "../types/express";
import {
  getCustomerInsights,
  getCustomerInsightsDetails,
} from "../services/admin.customer.services";

export const getCustomerInsightsController = async (
  req: AuthRequest,
  res: Response,
) => {
  const {} = req.query;
  const data = await getCustomerInsights();
  return res.status(200).json({
    success: true,
    message: "Successfully fetched the insights",
    data,
  });
};

export const getCustomerDetailsInsightsController = async (
  req: AuthRequest,
  res: Response,
) => {
  const { user_id } = req.query;

  const result = await getCustomerInsightsDetails(user_id);
  res.status(200).json({
    success: true,
    message: "Successfully fetched custome details",
    data: result,
  });
};
