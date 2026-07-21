"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerContactInfo = exports.loginUser = exports.createCustomer = exports.isUserAlreadyRegistered = void 0;
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = require("../utils/AppError");
const utils_1 = require("../utils/utils");
const isUserAlreadyRegistered = async (email, tbl_name) => {
    try {
        const result = await db_1.default.query(`SELECT * FROM ${tbl_name} WHERE email = $1`, [email]);
        return result.rowCount;
    }
    catch (error) {
        console.error("Error fetching user by email:", error);
        throw new AppError_1.AppError(`Database error , ${error}`, 500);
    }
};
exports.isUserAlreadyRegistered = isUserAlreadyRegistered;
//creating a customer on database after successfull validation
const createCustomer = async (userData) => {
    const hashedPassword = await (0, utils_1.hashPassword)(userData.password);
    const query = `
        INSERT INTO customers (
            first_name, 
            last_name, 
            email, 
            username, 
            password, 
            phone, 
            role
        ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING id, first_name, last_name, email, username, role, created_at;
    `;
    const { firstName, lastName, email, username, phone } = userData;
    const values = [
        firstName,
        lastName,
        email,
        username,
        hashedPassword,
        phone,
        "customer",
    ];
    try {
        const result = await db_1.default.query(query, values);
        return result.rows[0];
    }
    catch (error) {
        throw new AppError_1.AppError(error, 500);
    }
};
exports.createCustomer = createCustomer;
const loginUser = async (email, pass) => {
    // Check if user exists in the database
    const result = await db_1.default.query("SELECT * FROM customers WHERE email = $1", [
        email,
    ]);
    const user = result.rows[0];
    if (!user || !(await (0, utils_1.comparePassword)(pass, user.password))) {
        throw new AppError_1.AppError("Invalid email or password", 401);
    }
    // 3. Remove password from the object before returning
    delete user.password;
    return user;
};
exports.loginUser = loginUser;
const registerContactInfo = async (contactObj) => {
    const { first_name, last_name, email, phone, message } = contactObj;
    let results;
    const query = `
        INSERT INTO contacts (
            first_name, 
            last_name, 
            email, 
            message, 
            phone ,
            status
        ) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING c_id, first_name, last_name, email, phone, message, status, created_at;
    `;
    const values = [first_name, last_name, email, message, phone, "pending"];
    results = await db_1.default.query(query, values);
    return results.rows[0];
};
exports.registerContactInfo = registerContactInfo;
//# sourceMappingURL=user.services.js.map