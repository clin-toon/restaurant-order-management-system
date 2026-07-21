import type { AuthRequest } from "../types/express";
import type { Response } from "express";
export declare const createOrderController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getCustomerOrdersController: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=orderController.d.ts.map