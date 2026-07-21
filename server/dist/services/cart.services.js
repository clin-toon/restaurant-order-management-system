"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCartDetails = exports.getDetailsOfTheCartOfUser = exports.removeItemFromCart = exports.editQuantityOfItemInCart = exports.checkIfItemExistsInCart = exports.addItemToCart = void 0;
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = require("../utils/AppError");
/*
This service creates a new recrod of cart
into the cart tbles by taking
food detials as a parameter

*/
const addItemToCart = async (userId, foodId, quantity) => {
    const query = `INSERT INTO cart(
                cart_user , food_item_id,quantity)
                VALUES($1, $2, $3)
                RETURNING cart_user, food_item_id , quantity`;
    const itemsArr = [userId, foodId, quantity];
    const results = await db_1.default.query(query, itemsArr);
    return results.rows[0];
};
exports.addItemToCart = addItemToCart;
const checkIfItemExistsInCart = async (userId, foodId) => {
    const query = `SELECT * from cart where food_item_id = $1 and cart_user = $2`;
    const values = [foodId, userId];
    const results = await db_1.default.query(query, values);
    return results.rowCount;
};
exports.checkIfItemExistsInCart = checkIfItemExistsInCart;
const editQuantityOfItemInCart = async (userId, foodId, quantity) => {
    const query = `UPDATE cart 
    set quantity = $1 where cart_user = $2 and food_item_id = $3
      RETURNING *;
    `;
    const values = [quantity, userId, foodId];
    const results = await db_1.default.query(query, values);
    return results.rows;
};
exports.editQuantityOfItemInCart = editQuantityOfItemInCart;
const removeItemFromCart = async (userId, foodItemId) => {
    const query = `
        DELETE FROM cart 
        WHERE cart_user = $1 AND food_item_id = $2
        RETURNING *;
    `;
    const values = [userId, foodItemId];
    const result = await db_1.default.query(query, values);
    return result.rows[0];
};
exports.removeItemFromCart = removeItemFromCart;
const getDetailsOfTheCartOfUser = async (userId) => {
    const query = `
        SELECT *  FROM cart 
        WHERE cart_user = $1 
    `;
    const values = [userId];
    const result = await db_1.default.query(query, values);
    return result.rows;
};
exports.getDetailsOfTheCartOfUser = getDetailsOfTheCartOfUser;
const getUserCartDetails = async (userId) => {
    const query = `
        SELECT 
            f.id,
            f.name AS title,
            f.description,
            f.image_url,
            f.price,
            f.category,
            c.quantity,
            (f.price * c.quantity) AS total_price
        FROM cart c
        JOIN food_items f 
            ON c.food_item_id = f.id
        WHERE c.cart_user = $1
    `;
    try {
        const results = await db_1.default.query(query, [userId]);
        const cart_items = results.rows;
        const total_amount = cart_items.reduce((acc, item) => Number(item.total_price) + acc, 0);
        return { cart: cart_items, Total: `$ ` + total_amount };
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.AppError(error.message, 500);
    }
};
exports.getUserCartDetails = getUserCartDetails;
//# sourceMappingURL=cart.services.js.map