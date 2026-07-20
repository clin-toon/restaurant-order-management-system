"use client";
import SuccessUI from "@/components/Signup/SuccessUI";
import Link from "next/link";
import { useState } from "react";
import { getPasswordStrength, validateSignup } from "@/utils/signUpValidation";
import { FormState, TouchedState, Field } from "@/types/SignUpForm";
import { cn } from "@/lib/utils";
import { UtensilsCrossed, Eye, EyeOff, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormField from "@/components/Signup/FormField";
import { registerUser } from "@/services/auth.services";
import { toast } from "sonner";

export default function Page() {
  const [values, setValues] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phone: "",
  });

  const [touched, setTouched] = useState<TouchedState>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const errors = validateSignup(values);
  const strength = getPasswordStrength(values.password);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (field: Field, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: Field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isValid) {
      setIsLoading(true);
      const res = await registerUser(values);

      if (!res.success) {
        setIsLoading(false);
        return toast.error(res.error);
      }
      setIsLoading(false);

      toast.success(res.message);
      setSubmitted(true);
    } else {
      setIsLoading(false);
      toast.error("Please solve errors. ");
    }
  };

  const inputClass = (field: Field) =>
    cn(
      "h-10 rounded-xl border bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 focus-visible:ring-1 focus-visible:ring-orange-400 focus-visible:border-orange-400 transition-colors",
      touched[field] && errors[field]
        ? "border-red-300 bg-red-50/40 focus-visible:ring-red-400 focus-visible:border-red-400"
        : touched[field] && !errors[field]
          ? "border-emerald-300 bg-emerald-50/30"
          : "border-stone-200",
    );

  if (submitted) {
    return <SuccessUI />;
  }

  return (
    <div className=" flex mb-4">
      <div className="flex-1 lg:w-1/2 flex items-center justify-center bg-white  overflow-y-auto ">
        <div className="w-full max-w-md border-stone-200 shadow-sm rounded-2xl p-8">
          {/* Mobile logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2 w-fit">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50">
              <UtensilsCrossed
                className="w-4 h-4 text-orange-500"
                strokeWidth={1.75}
              />
            </div>
            <span className="text-sm font-semibold text-stone-900 tracking-tight">
              Chiya Vibes
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
              Create your account
            </h1>
            <p className="text-sm text-stone-400 mt-1">
              Already have one?{" "}
              <Link
                href="/login"
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            {/* First + Last */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                id="firstName"
                label="First Name"
                error={errors.firstName}
                touched={touched.firstName}
              >
                <Input
                  required
                  id="firstName"
                  placeholder="Jane"
                  value={values.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  onBlur={() => handleBlur("firstName")}
                  className={inputClass("firstName")}
                />
              </FormField>

              <FormField
                id="lastName"
                label="Last Name"
                error={errors.lastName}
                touched={touched.lastName}
              >
                <Input
                  id="lastName"
                  required
                  placeholder="Doe"
                  value={values.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  onBlur={() => handleBlur("lastName")}
                  className={inputClass("lastName")}
                />
              </FormField>
            </div>

            {/* Email */}
            <FormField
              id="email"
              label="Email"
              error={errors.email}
              touched={touched.email}
            >
              <Input
                required
                id="email"
                type="email"
                placeholder="jane@example.com"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                className={inputClass("email")}
              />
            </FormField>

            {/* Username */}
            <FormField
              id="username"
              label="Username"
              error={errors.username}
              touched={touched.username}
            >
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300 text-sm select-none">
                  @
                </span>
                <Input
                  required
                  id="username"
                  placeholder="jane_doe"
                  value={values.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  onBlur={() => handleBlur("username")}
                  className={cn(inputClass("username"), "pl-7")}
                />
                {touched.username && !errors.username && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-500" />
                )}
              </div>
            </FormField>

            {/* Password */}
            <FormField
              id="password"
              label="Password"
              error={errors.password}
              touched={touched.password}
            >
              <div className="relative">
                <Input
                  required
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={values.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  onBlur={() => handleBlur("password")}
                  className={cn(inputClass("password"), "pr-10")}
                  maxLength={15}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Strength bar */}
              {values.password && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1 flex-1 rounded-full transition-all duration-300",
                          i <= strength.score ? strength.color : "bg-stone-100",
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400">
                    {strength.label}
                  </span>
                </div>
              )}
            </FormField>

            {/* Phone */}
            <FormField
              id="phone"
              label="Phone Number"
              error={errors.phone}
              touched={touched.phone}
            >
              <Input
                required
                id="phone"
                type="tel"
                placeholder="10-digit number"
                value={values.phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  handleChange("phone", digits);
                }}
                onBlur={() => handleBlur("phone")}
                className={inputClass("phone")}
                maxLength={10}
              />
              {touched.phone && !errors.phone && (
                <p className="text-xs text-emerald-500 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Looks good
                </p>
              )}
            </FormField>

            {/* Submit */}
            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              className={`${isLoading && "opacity-90 cursor-not-allowed "} cursor-pointer w-full h-10 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium shadow-none transition-colors mt-2`}
            >
              {isLoading && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              )}
              {isLoading ? "Creating your account..." : "Create Account"}
            </Button>

            {/* Terms */}
            <p className="text-xs text-stone-400 text-center leading-relaxed">
              By signing up you agree to our{" "}
              <Link
                href="/terms"
                className="text-stone-600 hover:text-stone-800 underline underline-offset-2"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-stone-600 hover:text-stone-800 underline underline-offset-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
