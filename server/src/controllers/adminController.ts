import type { Request, Response } from "express";
import { foodItemSchema } from "../validators/admin/menu.schema";
import {
  createNewItemService,
  deleteFoodItemService,
  toogleStatusOfFoodService,
} from "../services/admin.menu.services";
import {
  deleteOrderService,
  getTheCustomerOrderDetails,
} from "../services/admin.order.services";
import { AppError } from "../utils/AppError";
import { uploadToCloudinary } from "../utils/utils";
import type { AuthRequest } from "../types/express";
import { OrderStatusSchema } from "../validators/admin/order.schema";
import {
  updateOrderStatusService,
  getTheSpecificOrderDetails,
} from "../services/admin.order.services";
import {
  getAllTheContactQurey,
  updateTheStatus,
} from "../services/admin.contact.services";
import { success } from "zod";

/* 
This controller expects name,
description, price, category, is_available, is_vegetarian
form fields from the front end 
*/

export const createNewMenuItem = async (req: AuthRequest, res: Response) => {
  console.log("Request came");
  const validatedData = foodItemSchema.parse(req.body);
  if (!req.file) {
    return res.status(400).json({ message: "Please upload image file" });
  }

  try {
    const cloudRes = await uploadToCloudinary(req.file.buffer);

    const foodItemCreatedObject = await createNewItemService(
      validatedData,
      cloudRes.secure_url, // Use the fresh URL from the manual upload
    );

    return res.status(201).json({
      success: true,
      message: "Food item created successfully",
      data: foodItemCreatedObject,
    });
  } catch (error: any) {
    console.log(error);
    // This catches errors from Cloudinary upload or the Service
    throw new AppError(error.message || "Internal Server Error", 500);
  }
};

export const toogleStatusOfFood = async (req: AuthRequest, res: Response) => {
  const id = req.params.id;
  const status = req.query?.status;
  if (id === undefined) throw new AppError("Id parameter is required", 400);
  const result = await toogleStatusOfFoodService(id, status);
  return res.status(200).json({
    success: true,
    message: `Successfully changed the status to ${status}`,
    data: result,
  });
};

/*
    order specific routes
*/

export const updateStatusOfOrder = async (req: AuthRequest, res: Response) => {
  const validatedData = OrderStatusSchema.parse(req.params);
  const { id, status } = validatedData;
  try {
    const result = await updateOrderStatusService(id, status);
    return res.status(200).json({
      success: true,
      message: `Successfully changed the status to ${status}`,
      data: result,
    });
  } catch (error: any) {
    throw new AppError(error, 500);
  }
};

export const getAllTheContactDetails = async (
  req: AuthRequest,
  res: Response,
) => {
  const contactDetails = await getAllTheContactQurey();
  return res.status(200).json({
    success: true,
    message: "Successfully fetched all the contact query",
    data: contactDetails,
  });
};

export const updateTheStatusOfContactDetails = async (
  req: AuthRequest,
  res: Response,
) => {
  const { id } = req.params;

  const result = await updateTheStatus(id);

  return res.status(200).json({
    success: true,
    message: "Successfully updated the status to responded ",
    data: result?.contact,
  });
};

export const getAllTheOrderDetails = async (
  req: AuthRequest,
  res: Response,
) => {
  const sortBy = req.query?.sortby || "desc";
  const searchValue = req.query?.query;
  const orderStatus = req.query?.order_status;
  const paymentStatus = req.query?.payment_status;

  let dynaimcSortVal;

  if (sortBy === "latest") {
    dynaimcSortVal = "desc";
  } else {
    dynaimcSortVal = "asc";
  }

  const orders = await getTheCustomerOrderDetails(
    orderStatus,
    paymentStatus,
    searchValue,
    dynaimcSortVal,
  );

  return res.status(200).json({
    success: true,
    orders,
  });
};

export const getSpecificOrderDetails = async (
  req: AuthRequest,
  res: Response,
) => {
  const { id } = req.params;

  const order = await getTheSpecificOrderDetails(id);

  return res.status(200).json({
    success: true,
    message: "Successfully fetched the order details of the id",
    data: order,
  });
};

export const deleteTheSpecificOrder = async (
  req: AuthRequest,
  res: Response,
) => {
  const { orderId } = req.params;

  const result = deleteOrderService(orderId);
  return res.status(204).json({
    success: true,
    message: "Deleted succesfully ",
  });
};

export const updateTheFoodItemController = async (
  req: AuthRequest,
  res: Response,
) => {
  const { id } = req.params;
};

export const deleteFoodItemController = async (
  req: AuthRequest,
  res: Response,
) => {
  const { id } = req.params;

  const deletedItem = await deleteFoodItemService(id);
  return res.status(200).json({
    success: true,
    message: "Deleted food item successfully",
    data: deletedItem,
  });
};
