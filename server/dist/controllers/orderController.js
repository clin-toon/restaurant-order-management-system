"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerOrdersController = exports.createOrderController = void 0;
const order_services_1 = require("../services/order.services");
const AppError_1 = require("../utils/AppError");
const createOrderController = async (req, res) => {
    try {
        const result = await (0, order_services_1.createOrderService)(req.user?.id, req.body);
        if (result) {
            return res.status(201).json({
                success: true,
                message: "Order created successfully",
                data: result
            });
        }
    }
    catch (error) {
        throw new AppError_1.AppError(error, 500);
    }
};
exports.createOrderController = createOrderController;
const getCustomerOrdersController = async (req, res) => {
    try {
        const userId = req.user?.id;
        const orders = await (0, order_services_1.getUserOrdersService)(userId);
        res.status(200).json({
            success: true,
            message: "Successfully fetched order details",
            count: orders.length,
            data: orders
        });
    }
    catch (error) {
        throw new AppError_1.AppError(error, 500);
    }
};
exports.getCustomerOrdersController = getCustomerOrdersController;
//# sourceMappingURL=orderController.js.map