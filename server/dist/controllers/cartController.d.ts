import type { Response } from 'express';
import type { AuthRequest } from '../types/express';
export declare const addItemToCartController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateItemOfCartController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const removeFromCartController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCartDetailsOfTheUserController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCartItemDetailsController: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=cartController.d.ts.map