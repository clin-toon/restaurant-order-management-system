"use client";

import { Eye, EyeOff, Loader2, AlertCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useLoginForm } from "@/hooks/useLoginfom";
import Link from "next/link";

export default function LoginForm() {
  const {
    form,
    errors,
    showPassword,
    isLoading,
    handleChange,
    handleSubmit,
    toggleShowPassword,
  } = useLoginForm();

  return (
    <div className=" bg-stone-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm border-stone-200 shadow-sm rounded-2xl">
        <CardHeader className="pb-0 pt-8 px-8">
          <div className="w-10 h-10 bg-orange-500 rounded-xl mb-5 flex items-center justify-center">
            <User className="text-white" />
          </div>
          <h1 className="text-xl font-semibold text-stone-900 tracking-tight">
            Sign in
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Welcome back. Enter your details below.
          </p>
        </CardHeader>

        <CardContent className="px-8 pt-6 pb-8">
          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-stone-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className={
                  errors.email
                    ? "border-red-400 bg-red-50 focus-visible:ring-red-400"
                    : ""
                }
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} className="shrink-0" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-stone-700">
                  Password
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-xs text-stone-400 hover:text-stone-600 h-auto p-0"
                >
                  Forgot password?
                </Button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className={`pr-10 ${errors.password ? "border-red-400 bg-red-50 focus-visible:ring-red-400" : ""}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={toggleShowPassword}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-stone-400 hover:text-stone-600 hover:bg-transparent"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} className="shrink-0" />
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full mt-6 bg-orange-500 hover:bg-orange-700 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          {/* Footer */}
          <p className="text-center text-xs text-stone-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-stone-700 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
