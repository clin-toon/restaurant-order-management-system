export type Field =
  | "firstName"
  | "lastName"
  | "email"
  | "username"
  | "password"
  | "phone";



export type FormState = Record<Field, any>;

export type ErrorState = Partial<Record<Field, string>>;

export type TouchedState = Partial<Record<Field, boolean>>;

export type LoginFormState = {
  email: string;
  password: string;
};

export type FieldError = {
  email?: string;
  password?: string;
};