"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const foodController_1 = require("../controllers/foodController");
const cartController_1 = require("../controllers/cartController");
const auth_middlware_1 = require("../middlewares/auth.middlware");
const homeController_1 = require("../controllers/homeController");
const router = (0, express_1.Router)();
// This is a public route (anyone can see the menu)
router.get("/food", foodController_1.getAvailableFoods);
router.get("/search", foodController_1.handleFilterQuery);
router.get("/singleFood/:id", foodController_1.getDetailsofSingleItem);
router.get("/home", homeController_1.landingPageController);
// protected admin routes from here
router.get("/test", auth_middlware_1.protect, async (req, res) => {
    res.json(req.user);
});
// route to add food item to a cart
router.post("/cart/:id", auth_middlware_1.protect, cartController_1.addItemToCartController);
router.put("/cart/:id/:quantity", auth_middlware_1.protect, cartController_1.updateItemOfCartController);
router.delete("/cart/:id", auth_middlware_1.protect, cartController_1.removeFromCartController);
router.get("/cart", auth_middlware_1.protect, cartController_1.getCartDetailsOfTheUserController);
router.get("/cart/details", auth_middlware_1.protect, cartController_1.getCartItemDetailsController);
router.get("/recommend", auth_middlware_1.protect, homeController_1.getRecommendFoodsController);
router.get("/test/admin", auth_middlware_1.protect, (0, auth_middlware_1.restrictTo)("admin"), async (req, res) => {
    res.json({
        message: "Admin middlware",
    });
});
exports.default = router;
//# sourceMappingURL=food.routes.js.map