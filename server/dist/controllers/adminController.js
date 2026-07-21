"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoodItemController = exports.updateTheFoodItemController = exports.deleteTheSpecificOrder = exports.getSpecificOrderDetails = exports.getAllTheOrderDetails = exports.updateTheStatusOfContactDetails = exports.getAllTheContactDetails = exports.updateStatusOfOrder = exports.toogleStatusOfFood = exports.createNewMenuItem = void 0;
const menu_schema_1 = require("../validators/admin/menu.schema");
const admin_menu_services_1 = require("../services/admin.menu.services");
const admin_order_services_1 = require("../services/admin.order.services");
const AppError_1 = require("../utils/AppError");
const utils_1 = require("../utils/utils");
const order_schema_1 = require("../validators/admin/order.schema");
const admin_order_services_2 = require("../services/admin.order.services");
const admin_contact_services_1 = require("../services/admin.contact.services");
/*
This controller expects name,
description, price, category, is_available, is_vegetarian
form fields from the front end
*/
const createNewMenuItem = async (req, res) => {
    console.log("Request came");
    const validatedData = menu_schema_1.foodItemSchema.parse(req.body);
    if (!req.file) {
        return res.status(400).json({ message: "Please upload image file" });
    }
    try {
        const cloudRes = await (0, utils_1.uploadToCloudinary)(req.file.buffer);
        const foodItemCreatedObject = await (0, admin_menu_services_1.createNewItemService)(validatedData, cloudRes.secure_url);
        return res.status(201).json({
            success: true,
            message: "Food item created successfully",
            data: foodItemCreatedObject,
        });
    }
    catch (error) {
        console.log(error);
        // This catches errors from Cloudinary upload or the Service
        throw new AppError_1.AppError(error.message || "Internal Server Error", 500);
    }
};
exports.createNewMenuItem = createNewMenuItem;
const toogleStatusOfFood = async (req, res) => {
    const id = req.params.id;
    const status = req.query?.status;
    if (id === undefined)
        throw new AppError_1.AppError("Id parameter is required", 400);
    const result = await (0, admin_menu_services_1.toogleStatusOfFoodService)(id, status);
    return res.status(200).json({
        success: true,
        message: `Successfully changed the status to ${status}`,
        data: result,
    });
};
exports.toogleStatusOfFood = toogleStatusOfFood;
/*
    order specific routes
*/
const updateStatusOfOrder = async (req, res) => {
    const validatedData = order_schema_1.OrderStatusSchema.parse(req.params);
    const { id, status } = validatedData;
    try {
        const result = await (0, admin_order_services_2.updateOrderStatusService)(id, status);
        return res.status(200).json({
            success: true,
            message: `Successfully changed the status to ${status}`,
            data: result,
        });
    }
    catch (error) {
        throw new AppError_1.AppError(error, 500);
    }
};
exports.updateStatusOfOrder = updateStatusOfOrder;
const getAllTheContactDetails = async (req, res) => {
    const contactDetails = await (0, admin_contact_services_1.getAllTheContactQurey)();
    return res.status(200).json({
        success: true,
        message: "Successfully fetched all the contact query",
        data: contactDetails,
    });
};
exports.getAllTheContactDetails = getAllTheContactDetails;
const updateTheStatusOfContactDetails = async (req, res) => {
    const { id } = req.params;
    const result = await (0, admin_contact_services_1.updateTheStatus)(id);
    return res.status(200).json({
        success: true,
        message: "Successfully updated the status to responded ",
        data: result?.contact,
    });
};
exports.updateTheStatusOfContactDetails = updateTheStatusOfContactDetails;
const getAllTheOrderDetails = async (req, res) => {
    const sortBy = req.query?.sortby || "desc";
    const searchValue = req.query?.query;
    const orderStatus = req.query?.order_status;
    const paymentStatus = req.query?.payment_status;
    let dynaimcSortVal;
    if (sortBy === "latest") {
        dynaimcSortVal = "desc";
    }
    else {
        dynaimcSortVal = "asc";
    }
    const orders = await (0, admin_order_services_1.getTheCustomerOrderDetails)(orderStatus, paymentStatus, searchValue, dynaimcSortVal);
    return res.status(200).json({
        success: true,
        orders,
    });
};
exports.getAllTheOrderDetails = getAllTheOrderDetails;
const getSpecificOrderDetails = async (req, res) => {
    const { id } = req.params;
    const order = await (0, admin_order_services_2.getTheSpecificOrderDetails)(id);
    return res.status(200).json({
        success: true,
        message: "Successfully fetched the order details of the id",
        data: order,
    });
};
exports.getSpecificOrderDetails = getSpecificOrderDetails;
const deleteTheSpecificOrder = async (req, res) => {
    const { orderId } = req.params;
    const result = (0, admin_order_services_1.deleteOrderService)(orderId);
    return res.status(204).json({
        success: true,
        message: "Deleted succesfully ",
    });
};
exports.deleteTheSpecificOrder = deleteTheSpecificOrder;
const updateTheFoodItemController = async (req, res) => {
    const { id } = req.params;
};
exports.updateTheFoodItemController = updateTheFoodItemController;
const deleteFoodItemController = async (req, res) => {
    const { id } = req.params;
    const deletedItem = await (0, admin_menu_services_1.deleteFoodItemService)(id);
    return res.status(200).json({
        success: true,
        message: "Deleted food item successfully",
        data: deletedItem,
    });
};
exports.deleteFoodItemController = deleteFoodItemController;
//# sourceMappingURL=adminController.js.map