"use client";

import { submitContactForm } from "@/services/auth.services";
import { Loader2 } from "lucide-react";

import { useState } from "react";

import { toast } from "sonner";

const ContactButton = ({ payload }: any) => {
  const [loading, setLoading] = useState(false);
  const handleContact = async () => {
    try {
      setLoading(true);
      const res = await submitContactForm(payload);

      if (res?.success) {
        setLoading(false);
        toast.success(res?.message);
      } else {
        setLoading(false);
        toast.error(res?.message);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error);
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
