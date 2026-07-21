import type { Request, Response } from "express";
import type { AuthRequest } from "../types/express";
export declare const registerController: (req: Request, res: Response) => Promise<void>;
export declare const loginController: (req: Request, res: Response) => Promise<void>;
export declare const getUserDetails: (req: AuthRequest, res: Response) => Promise<void>;
export declare const handleLogOut: (req: AuthRequest, res: Response) => Promise<void>;
export declare const contactController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authController.d.ts.map