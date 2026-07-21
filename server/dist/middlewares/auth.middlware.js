"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = require("../utils/AppError");
const protect = async (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    try {
        // Extract token from the header
        const token = req.cookies.accessToken;
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Log in required",
            });
        }
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // 3. Check if user still exists in DB (Security Best Practice)
        const userResult = await db_1.default.query("SELECT id, first_name, email, phone , role FROM customers WHERE id = $1", [decoded?.id]);
        if (userResult.rowCount === 0) {
            throw new AppError_1.AppError("The user belonging to this token no longer exists.", 401);
        }
        req.user = userResult.rows[0];
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({ message: error.message });
        }
        else {
            return res.status(401).json({ message: error });
        }
    }
};
exports.protect = protect;
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            throw new AppError_1.AppError("You do not have the necessary permissions to perform this action.", 403);
        }
        next();
    };
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=auth.middlware.js.map