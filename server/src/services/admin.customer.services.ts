import pool from "../config/db";
import { AppError } from "../utils/AppError";

export const getCustomerInsights = async () => {
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
    const result = await pool.query(query);
    return result.rows;
  } catch (error: any) {
    console.log(error);
    throw new AppError(error, 500);
  }
};

export const getCustomerInsightsDetails = async (customer_id: number) => {
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
      pool.query(queryForInsights, [customer_id]),
      pool.query(queryForFavFood, [customer_id]),
    ]);

    return {
      customerDetails: insightsRes.rows[0] ?? null,
      favouriteFoods: favFoodsRes.rows,
    };
  } catch (error: any) {
    console.log(error);
    throw new AppError(error, 500);
  }
};
