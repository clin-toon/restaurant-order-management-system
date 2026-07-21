"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoodItemService = exports.toogleStatusOfFoodService = exports.createNewItemService = void 0;
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = require("../utils/AppError");
const createNewItemService = async (food_details, imageUrl) => {
    const { name, description, price, category, is_available, is_vegetarian } = food_details;
    const query = `INSERT INTO food_items
                (name, description , price , category , is_available , is_vegetarian, image_url)
                VALUES ($1, $2, $3, $4, $5,$6,$7)
                 RETURNING id, name,description,price,category,is_available,is_vegetarian,image_url, created_at;
                `;
    const values = [
        name,
        description,
        price,
        category,
        is_available,
        is_vegetarian,
        imageUrl,
    ];
    try {
        const result = await db_1.default.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.AppError(error, 500);
    }
};
exports.createNewItemService = createNewItemService;
const toogleStatusOfFoodService = async (foodid, status) => {
    try {
        const query = `
        UPDATE food_items 
        SET is_available = $1 
        WHERE id = $2
        RETURNING name, price, category, is_available
    `;
        const values = [status, foodid];
        const result = await db_1.default.query(query, values);
        if (result.rowCount === 0) {
            throw new AppError_1.AppError("Food item with that ID was not found", 404);
        }
        return result.rows[0];
    }
    catch (error) {
        // If it's already an AppError (the 404 we threw above), re-throw it
        if (error instanceof AppError_1.AppError)
            throw error;
        throw new AppError_1.AppError("Database update failed", 500);
    }
};
exports.toogleStatusOfFoodService = toogleStatusOfFoodService;
const deleteFoodItemService = async (food_item_id) => {
    const query = `
        DELETE FROM food_items where id = $1
        RETURNING id, , price, category, is_available
    `;
    try {
        const result = await db_1.default.query(query, [food_item_id]);
        if (result.rowCount === 0) {
            throw new AppError_1.AppError("Food item with that ID was not found", 404);
        }
        return result.rows[0];
    }
    catch (error) {
        console.log(error);
    }
};
exports.deleteFoodItemService = deleteFoodItemService;
//# sourceMappingURL=admin.menu.services.js.map