export declare const addItemToCart: (userId: any, foodId: any, quantity: Number) => Promise<any>;
export declare const checkIfItemExistsInCart: (userId: any, foodId: any) => Promise<number | null>;
export declare const editQuantityOfItemInCart: (userId: any, foodId: any, quantity: any) => Promise<any[]>;
export declare const removeItemFromCart: (userId: any, foodItemId: any) => Promise<any>;
export declare const getDetailsOfTheCartOfUser: (userId: any) => Promise<any[]>;
export declare const getUserCartDetails: (userId: any) => Promise<{
    cart: any[];
    Total: string;
}>;
//# sourceMappingURL=cart.services.d.ts.map