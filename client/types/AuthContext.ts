export type User = {
  id: string;
  name: string;
  role: "Admin" | "Customer";
  first_name:string,
  phone:string,
  email:string
};

export type AuthContextType = {
  user: User | null;
};