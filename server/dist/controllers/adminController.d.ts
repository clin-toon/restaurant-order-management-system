import type { Response } from "express";
import type { AuthRequest } from "../types/express";
export declare const createNewMenuItem: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const toogleStatusOfFood: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateStatusOfOrder: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllTheContactDetails: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTheStatusOfContactDetails: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllTheOrderDetails: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getSpecificOrderDetails: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteTheSpecificOrder: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTheFoodItemController: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteFoodItemController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=adminController.d.ts.map