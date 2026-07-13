import type { Response, Request } from "express";
import {
  fetchLandingPageDetails,
  fetchUserRecommend,
} from "../services/food.services";
import type { AuthRequest } from "../types/express";

export const landingPageController = async (req: Request, res: Response) => {
  const result = await fetchLandingPageDetails();
  return res.status(200).json({
    success: true,
    data: result,
    message: "Successfully fetched home page details ",
  });
};

export const getRecommendFoodsController = async (
  req: AuthRequest,
  res: Response,
) => {
  const result = await fetchUserRecommend(req.user?.id);
  return res.status(200).json({
    success: true,
    data: result,
    message: "Successfully fetched home page details ",
  });
};
