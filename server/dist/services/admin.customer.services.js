"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerInsightsDetails = exports.getCustomerInsights = void 0;
const db_1 = __importDefault(require("../config/db"));
const AppError_1 = require("../utils/AppError");
const getCustomerInsights = async () => {
    const query = `
        select 
            c.id, 
            c.first_name || ' ' || c.last_name as "full_name"  ,
            coalesce(sum(o.total_amount), 0) as "total_money_spent" ,
            coalesce(avg(o.total_amount),0) as "average_order_value" , 
            count(o.id) as "order_frequency" 
        from customers c 
        left join orders o 
            on c.id = o.customer_id
        group by c.id, c.first_name , c.last_name
        order by total_money_spent desc 
        limit 10;
    `;
    try {
        const result = await db_1.default.query(query);
        return result.rows;
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.AppError(error, 500);
    }
};
exports.getCustomerInsights = getCustomerInsights;
const getCustomerInsightsDetails = async (customer_id) => {
    const queryForInsights = `
        select 
            c.id, 
            c.first_name || ' ' || c.last_name as "full_name"  ,
            c.phone,
            c.email,
            c.username,
            c.created_at as "account_creation_date",
            coalesce(sum(o.total_amount), 0) as "total_money_spent" ,
            coalesce(avg(o.total_amount),0) as "average_order_value" , 
            count(o.id) as "order_frequency",
            max(o.created_at) as last_ordered_date 
        from customers c 
        left join orders o 
            on c.id = o.customer_id
        where c.id = $1
        group by c.id, c.first_name , c.last_name;
    `;
    const queryForFavFood = `
        select 
	        ft.id,
	        ft.name,
	        sum(od.quantity) as "total_times_ordered"
        from customers c join orders o  on c.id = o.customer_id 
	        join order_items od 
	        on od.order_id  = o.id 
	        join food_items ft on ft.id = od.food_item_id
	    where c.id = $1
        group by ft.id, ft.name 
        order by total_times_ordered desc, ft.name asc
        limit 3 ;
    `;
    try {
        const [insightsRes, favFoodsRes] = await Promise.all([
            db_1.default.query(queryForInsights, [customer_id]),
            db_1.default.query(queryForFavFood, [customer_id]),
        ]);
        return {
            customerDetails: insightsRes.rows[0] ?? null,
            favouriteFoods: favFoodsRes.rows,
        };
    }
    catch (error) {
        console.log(error);
        throw new AppError_1.AppError(error, 500);
    }
};
exports.getCustomerInsightsDetails = getCustomerInsightsDetails;
//# sourceMappingURL=admin.customer.services.js.map