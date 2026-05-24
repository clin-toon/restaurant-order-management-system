"use client";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";

export default function ToastProvider() {
  useEffect(() => {
    const handleOnline = () => {
      toast.success("You are online");
    };

    const handleOffline = () => {
      toast.error("You are offline");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Toaster
      richColors
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "16px",
          padding: "16px",
        },
      }}
    />
  );
}
