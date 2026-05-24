import { useState } from "react";
import { registerUser } from "@/services/auth.services";
import { validateSignup } from "@/utils/signUpValidation";

export function useSignup() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const errors = validateSignup(values); // reuse your function

  const handleChange = (field: string, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      username: true,
      password: true,
      phone: true,
    });

    if (Object.keys(errors).length > 0) return;

    try {
      setLoading(true);
      await registerUser(values);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    values,
    errors,
    touched,
    submitted,
    loading,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}