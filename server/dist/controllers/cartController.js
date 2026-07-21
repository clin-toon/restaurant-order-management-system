"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartItemDetailsController = exports.getCartDetailsOfTheUserController = exports.removeFromCartController = exports.updateItemOfCartController = exports.addItemToCartController = void 0;
const cartService = __importStar(require("../services/cart.services"));
const AppError_1 = require("../utils/AppError");
const addItemToCartController = async (req, res) => {
    const user_id = req.user?.id;
    const food_item_id = req.params.id;
    if (!food_item_id) {
        throw new AppError_1.AppError("Please provide a food_id", 400);
    }
    const check = await cartService.checkIfItemExistsInCart(user_id, food_item_id);
    if (check > 0) {
        throw new AppError_1.AppError("Provided fodd item is already added in the cart", 400);
    }
    const quantity = 1;
    try {
        const result = await cartService.addItemToCart(user_id, food_item_id, quantity);
        return res.status(201).json({
            status: 'success',
            message: "Item added to cart ",
            data: result
        });
    }
    catch (error) {
        throw new AppError_1.AppError(error, 500);
    }
};
exports.addItemToCartController = addItemToCartController;
const updateItemOfCartController = async (req, res) => {
    const user_id = req.user?.id;
    const { id, quantity } = req.params;
    try {
        const results = await cartService.editQuantityOfItemInCart(user_id, id, quantity);
        return res.status(200).json({
            success: true,
            data: results
        });
    }
    catch (error) {
        throw new AppError_1.AppError(error, 400);
    }
};
exports.updateItemOfCartController = updateItemOfCartController;
const removeFromCartController = async (req, res) => {
    // 1. Get user_id from your Auth Middleware
    const user_id = req.user?.id;
    const food_id = req.params.id;
    if (!food_id) {
        throw new AppError_1.AppError("Food item ID is required", 400);
    }
    // 3. Call the service
    const deletedItem = await cartService.removeItemFromCart(user_id, food_id);
    // 4. Check if the item existed
    if (!deletedItem) {
        throw new AppError_1.AppError("Item not found in cart", 404);
    }
    // 5. Success Response
    return res.status(200).json({
        status: 'success',
        message: "Item removed from cart successfully",
        data: deletedItem // Optional: show what was deleted
    });
};
exports.removeFromCartController = removeFromCartController;
const getCartDetailsOfTheUserController = async (req, res) => {
    const user_id = req.user?.id;
    const cartItems = await cartService.getDetailsOfTheCartOfUser(user_id);
    return res.status(200).json({
        status: 'success',
        message: "Fetched the cart details of the user",
        count: cartItems.length,
        data: cartItems
    });
};
exports.getCartDetailsOfTheUserController = getCartDetailsOfTheUserController;
const getCartItemDetailsController = async (req, res) => {
    const user_id = req.user?.id;
    const data = await cartService.getUserCartDetails(user_id);
    const total = data.Total;
    return res.status(200).json({
        status: "success",
        message: "Fetched the cart details successfully",
        cart: data.cart,
        total
    });
};
exports.getCartItemDetailsController = getCartItemDetailsController;
//# sourceMappingURL=cartController.js.map