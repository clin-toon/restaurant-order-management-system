"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendFoodsController = exports.landingPageController = void 0;
const food_services_1 = require("../services/food.services");
const landingPageController = async (req, res) => {
    const result = await (0, food_services_1.fetchLandingPageDetails)();
    return res.status(200).json({
        success: true,
        data: result,
        message: "Successfully fetched home page details ",
    });
};
exports.landingPageController = landingPageController;
const getRecommendFoodsController = async (req, res) => {
    const result = await (0, food_services_1.fetchUserRecommend)(req.user?.id);
    return res.status(200).json({
        success: true,
        data: result,
        message: "Successfully fetched home page details ",
    });
};
exports.getRecommendFoodsController = getRecommendFoodsController;
//# sourceMappingURL=homeController.js.map