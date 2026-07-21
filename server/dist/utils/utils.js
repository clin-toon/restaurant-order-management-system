"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTheSearchStringUUID = exports.uploadToCloudinary = exports.signToken = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("./AppError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
/**
 * Hashes a plain text password using bcrypt.
 * @param password - The raw password from req.body
 * @returns The hashed string
 */
/*
 * Hash Password
 * Convets plain password into hash and returns it
 */
const hashPassword = async (password) => {
    try {
        const saltRounds = 10; // Standard security level
        return await bcrypt_1.default.hash(password, saltRounds);
    }
    catch (error) {
        throw new AppError_1.AppError("Error securing password", 500);
    }
};
exports.hashPassword = hashPassword;
/**
 * Compares a plain password with a hash from the DB.
 */
const comparePassword = async (password, hash) => {
    return await bcrypt_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1d"; // Token valid for 1 day
/*
 * Function that signs jwt to the valid user
 */
const signToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};
exports.signToken = signToken;
const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({ folder: "restaurant_menu" }, (error, result) => {
            if (result)
                resolve(result);
            else
                reject(error);
        });
        stream.end(fileBuffer);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const makeTheSearchStringUUID = (str) => {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let newStr = "";
    for (let index = 0; index < 32; index++) {
        let ranNum = nums[Math.floor(Math.random() * 10)];
        let ranalpha = str.charAt(Math.floor(Math.random() * str.length));
        let num = Math.floor(Math.random() * 2);
        let len = newStr.length;
        if (len === 8 || len === 12 || len === 16 || len === 20) {
            newStr += "-";
        }
        else {
            if (num === 1) {
                newStr += ranalpha;
            }
            else {
                newStr += ranNum;
            }
        }
    }
    return newStr;
};
exports.makeTheSearchStringUUID = makeTheSearchStringUUID;
//# sourceMappingURL=utils.js.map