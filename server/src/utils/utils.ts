import bcrypt from "bcrypt";
import { AppError } from "./AppError";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary";

/**
 * Hashes a plain text password using bcrypt.
 * @param password - The raw password from req.body
 * @returns The hashed string
 */

/*
 * Hash Password
 * Convets plain password into hash and returns it
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10; // Standard security level
    return await bcrypt.hash(password, saltRounds);
  } catch (error) {
    throw new AppError("Error securing password", 500);
  }
};

/**
 * Compares a plain password with a hash from the DB.
 */
export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1d"; // Token valid for 1 day

/*
 * Function that signs jwt to the valid user
 */
export const signToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const uploadToCloudinary = (fileBuffer: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "restaurant_menu" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      },
    );
    stream.end(fileBuffer);
  });
};

export const makeTheSearchStringUUID = (str: string): string => {
  const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let newStr = "";

  for (let index = 0; index < 32; index++) {
    let ranNum = nums[Math.floor(Math.random() * 10)];
    let ranalpha = str.charAt(Math.floor(Math.random() * str.length));
    let num = Math.floor(Math.random() * 2);
    let len = newStr.length;
    if (len === 8 || len === 12 || len === 16 || len === 20) {
      newStr += "-";
    } else {
      if (num === 1) {
        newStr += ranalpha;
      } else {
        newStr += ranNum;
      }
    }
  }

  return newStr;
};
