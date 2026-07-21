"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTheStatus = exports.getTheContactStatus = exports.getAllTheContactQurey = exports.insertTheContactData = void 0;
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = require("../utils/AppError");
const insertTheContactData = async (body) => {
    const { first_name, last_name, phone, message, message_type } = body;
    const query = `INSERT INTO contacts(first_name , last_name , phone , message , message_type, status)
        values($1, $2, $3, $4,$5, $6)
    `;
    try {
        const res = await db_1.default.query(query, [
            first_name,
            last_name,
            phone,
            message,
            message_type,
            "pending",
        ]);
        return true;
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.AppError(error, 500);
    }
};
exports.insertTheContactData = insertTheContactData;
const getAllTheContactQurey = async () => {
    const query = "SElECT * FROM contacts order by created_at desc";
    const details = await db_1.default.query(query);
    return details.rows;
};
exports.getAllTheContactQurey = getAllTheContactQurey;
const getTheContactStatus = async (email) => {
    const query = "SELECT * from contacts where email = $1";
    try {
        const result = await db_1.default.query(query, [email]);
        return {
            count: result.rows.length,
            contact: result.rows,
        };
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.AppError(error, 500);
    }
};
exports.getTheContactStatus = getTheContactStatus;
const updateTheStatus = async (id) => {
    const query = `UPDATE contacts set status = 'replied' where c_id = $1
    returning c_id , first_name , last_name, phone, status, message
  `;
    try {
        const result = await db_1.default.query(query, [id]);
        return { count: result.rowCount, contact: result?.rows };
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.AppError(error, 500);
    }
};
exports.updateTheStatus = updateTheStatus;
//# sourceMappingURL=admin.contact.services.js.map