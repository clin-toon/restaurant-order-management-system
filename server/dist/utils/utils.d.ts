/**
 * Hashes a plain text password using bcrypt.
 * @param password - The raw password from req.body
 * @returns The hashed string
 */
export declare const hashPassword: (password: string) => Promise<string>;
/**
 * Compares a plain password with a hash from the DB.
 */
export declare const comparePassword: (password: string, hash: string) => Promise<boolean>;
export declare const signToken: (payload: object) => string;
export declare const uploadToCloudinary: (fileBuffer: Buffer) => Promise<any>;
export declare const makeTheSearchStringUUID: (str: string) => string;
//# sourceMappingURL=utils.d.ts.map