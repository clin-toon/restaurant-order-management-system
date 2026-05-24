
export type Field =
  | "firstName"
  | "lastName"
  | "email"
  | "username"
  | "password"
  | "phone";

export type FormState = Record<Field, string>;
export type ErrorState = Partial<Record<Field, string>>;


export function validateSignup(values: FormState): ErrorState {
  const errors: ErrorState = {};

  // First Name
  if (!values.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (values.firstName.trim().length < 2) {
    errors.firstName = "At least 2 characters.";
  }

  // Last Name
  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required.";
  } else if (values.lastName.trim().length < 2) {
    errors.lastName = "At least 2 characters.";
  }

  // Email
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }

  // Username
  if (!values.username.trim()) {
    errors.username = "Username is required.";
  } else if (values.username.length < 3) {
    errors.username = "At least 3 characters.";
  } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
    errors.username = "Only letters, numbers, and underscores.";
  }

  // Password
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "At least 8 characters.";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Include at least one uppercase letter.";
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = "Include at least one number.";
  }

  // Phone
  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\d{10}$/.test(values.phone.replace(/\D/g, ""))) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }

  return errors;
}

// ─── Password Strength (EXTRACTED FROM YOUR CODE) ─────────────────────────

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: "", color: "" };

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-red-400" };
  if (score === 2) return { score, label: "Fair", color: "bg-orange-400" };
  if (score === 3) return { score, label: "Good", color: "bg-yellow-400" };

  return { score, label: "Strong", color: "bg-emerald-500" };
}