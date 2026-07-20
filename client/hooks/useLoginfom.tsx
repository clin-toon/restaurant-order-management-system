"use client";

import { useState } from "react";
import { LoginFormState, FieldError } from "@/types/SignUpForm";
import { validateLoginForm } from "@/utils/auth.utils";
import { loginUser } from "@/services/auth.services";
import { toast } from "sonner";

export const useLoginForm = () => {
  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldError>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FieldError]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const data = await loginUser(form);
      console.log(data);

      if (data.success) {
        toast.success("Login successfull. ");
        window.location.reload();
      } else {
        toast.error("Invalid credentials ");
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return {
    form,
    errors,
    showPassword,
    isLoading,
    handleChange,
    handleSubmit,
    toggleShowPassword,
  };
};
