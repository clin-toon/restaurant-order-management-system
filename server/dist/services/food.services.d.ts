export declare const getAllFoods: (page: any) => Promise<any[]>;
export declare const findFoodByFilter: (query: any, cat: any, maximumPrice: any, minimumPrice: any, is_vegetarian: any, limit: any, page: any, sort: any, sub_category: any) => Promise<{
    food_items: any[];
    total_pages: any;
}>;
export declare const findFoodById: (id: any) => Promise<any[]>;
export declare const fetchLandingPageDetails: () => Promise<any[]>;
export declare const fetchUserRecommend: (userId: any) => Promise<any[]>;
//# sourceMappingURL=food.services.d.ts.map