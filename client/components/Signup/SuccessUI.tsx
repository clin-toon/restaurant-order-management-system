import React from "react";
import { Check } from "lucide-react";
import Link from "next/link";

const SuccessUI = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-50">
          <Check className="w-6 h-6 text-orange-500" strokeWidth={2} />
        </div>
        <h2 className="text-xl font-semibold text-stone-900">You're in!</h2>
        <p className="text-sm text-stone-400 leading-relaxed">
          Welcome to Chiya Vibes. Your account has been created successfully.
        </p>
        <Link
          href="/login"
          className="mt-2 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
        >
          Go to sign in →
        </Link>
      </div>
    </div>
  );
};

export default SuccessUI;
