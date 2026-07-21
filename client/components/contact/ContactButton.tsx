"use client";

import { submitContactForm } from "@/services/auth.services";
import { Loader2 } from "lucide-react";

import { useState } from "react";

import { toast } from "sonner";

const ContactButton = ({
  payload,
  validateForm,
}: {
  payload: any;
  validateForm: () => boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const handleContact = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      setLoading(true);

      const res = await submitContactForm(payload);

      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      disabled={loading}
      onClick={handleContact}
      className={`${loading && "cursor-not-allowed "}flex items-center justify-center gap-2 bg-orange-500 cursor-pointer hover:bg-stone-700 active:scale-[0.98] text-white text-sm font-semibold h-11 rounded-xl transition-all duration-150 mt-1`}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Sending your message...
        </>
      ) : (
        "Send Message"
      )}
    </button>
  );
};

export default ContactButton;
