import pool from "../config/db";
import { AppError } from "../utils/AppError";
import type { ContactInput } from "../validators/contactValidation";

export const insertTheContactData = async (body: ContactInput) => {
  const { first_name, last_name, phone, message, message_type } = body;

  const query = `INSERT INTO contacts(first_name , last_name , phone , message , message_type, status)
        values($1, $2, $3, $4,$5, $6)
    `;

  try {
    const res = await pool.query(query, [
      first_name,
      last_name,
      phone,
      message,
      message_type,
      "pending",
    ]);
    return true;
  } catch (error: any) {
    console.log(error);
    throw new AppError(error, 500);
  }
};

export const getAllTheContactQurey = async () => {
  const query = "SElECT * FROM contacts order by created_at desc";

  const details = await pool.query(query);
  return details.rows;
};
export const getTheContactStatus = async (email: string) => {
  const query = "SELECT * from contacts where email = $1";

  try {
    const result = await pool.query(query, [email]);

    return {
      count: result.rows.length,
      contact: result.rows,
    };
  } catch (error: any) {
    console.log(error);
    throw new AppError(error, 500);
  }
};

export const updateTheStatus = async (id: any) => {
  const query = `UPDATE contacts set status = 'replied' where c_id = $1
    returning c_id , first_name , last_name, phone, status, message
  `;
  try {
    const result = await pool.query(query, [id]);

    return { count: result.rowCount, contact: result?.rows };
  } catch (error: any) {
    console.log(error);
    throw new AppError(error, 500);
  }
};
