"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
const AppError_1 = require("../utils/AppError");
const validateInput = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const errorMessage = result.error.issues[0].message;
        throw new AppError_1.AppError(errorMessage, 400);
    }
    req.body = result.data;
    next();
};
exports.validateInput = validateInput;
//# sourceMappingURL=inputValidation.js.map