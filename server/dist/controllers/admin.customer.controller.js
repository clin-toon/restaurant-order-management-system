"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerDetailsInsightsController = exports.getCustomerInsightsController = void 0;
const admin_customer_services_1 = require("../services/admin.customer.services");
const getCustomerInsightsController = async (req, res) => {
    const {} = req.query;
    const data = await (0, admin_customer_services_1.getCustomerInsights)();
    return res.status(200).json({
        success: true,
        message: "Successfully fetched the insights",
        data,
    });
};
exports.getCustomerInsightsController = getCustomerInsightsController;
const getCustomerDetailsInsightsController = async (req, res) => {
    const { user_id } = req.query;
    const result = await (0, admin_customer_services_1.getCustomerInsightsDetails)(user_id);
    res.status(200).json({
        success: true,
        message: "Successfully fetched custome details",
        data: result,
    });
};
exports.getCustomerDetailsInsightsController = getCustomerDetailsInsightsController;
//# sourceMappingURL=admin.customer.controller.js.map