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
exports.getDetailsofSingleItem = exports.handleFilterQuery = exports.getAvailableFoods = void 0;
const foodService = __importStar(require("../services/food.services"));
const AppError_1 = require("../utils/AppError");
const getAvailableFoods = async (req, res) => {
    const page = req.query?.page || 1;
    const foods = await foodService.getAllFoods(page);
    res.status(200).json({
        status: "success",
        results: foods.length,
        data: foods,
    });
};
exports.getAvailableFoods = getAvailableFoods;
const handleFilterQuery = async (req, res) => {
    const cat = req.query?.category;
    const query = req.query?.query;
    const minimumPrice = req.query?.minPrice;
    const maximiumPrice = req.query?.maxPrice;
    const is_vegetarian = req.query?.isVeg;
    const limit = req.query?.limit || 12;
    const page = req.query?.page;
    const sort = req.query?.sort || null;
    const sc = req.query?.sub_category || null;
    const foods = await foodService.findFoodByFilter(query, cat, maximiumPrice, minimumPrice, is_vegetarian, limit, page, sort, sc);
    let total_pages;
    if (Number(foods.total_pages) / 12 < 1) {
        total_pages = 1;
    }
    else {
        total_pages = Math.ceil(Number(foods.total_pages) / 12);
    }
    res.status(200).json({
        success: true,
        count: total_pages,
        data: foods.food_items,
    });
};
exports.handleFilterQuery = handleFilterQuery;
const getDetailsofSingleItem = async (req, res) => {
    const { id } = req.params;
    const foods = await foodService.findFoodById(id);
    if (foods.length === 0) {
        throw new AppError_1.AppError("Invalid food id", 400);
    }
    res.status(200).json({
        success: true,
        count: foods.length,
        data: foods,
    });
};
exports.getDetailsofSingleItem = getDetailsofSingleItem;
//# sourceMappingURL=foodController.js.map