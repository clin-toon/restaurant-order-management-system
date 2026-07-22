import { LoginFormState } from "@/types/SignUpForm";
import { FormState } from "@/types/SignUpForm";
import { NextRequest } from "next/server";
import { toast } from "sonner";

const url = process.env.NEXT_PUBLIC_API;

export const registerUser = async (values: FormState) => {
  try {
    const res = await fetch(`/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      const errorData = await res
        .json()
        .catch(() => ({ message: "Request failed" }));
      return { error: errorData.message, status: res.status, success: false };
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    return { error: "Network request failed" };
  }
};

export const loginUser = async (form: LoginFormState) => {
  try {
    const res = await fetch(`/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) return await res.json();
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      return { success: false, user: null };
    }
    const data = await response.json();
    return { success: true, user: data.data };
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUser = async (req: NextRequest) => {
  if (!url) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return null;
  }

  try {
    const response = await fetch(`/auth/me`, {
      method: "GET",
      headers: {
        cookie: req.headers.get("cookie") ?? "",
        origin: req.nextUrl.origin,
        host: req.headers.get("host") ?? "",
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.data ?? null; // { id, name, email, role }
  } catch {
    return null;
  }
};

export const handleLogout = async () => {
  try {
    const res = await fetch(`/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }
    const data = await res.json();

    toast.success("Logged out successfully.");

    setTimeout(() => {
      window.location.replace("/login");
    }, 800);
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const submitContactForm = async (data: any) => {
  try {
    const response = await fetch(`/admin/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return result;
    }

    return result;
  } catch (error) {
    console.log(error);
  }
};
