"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderModal from "./Ordermodal";
import { useAuth } from "@/context/AuthContext/AuthContext";

export default function CreateOrderButton() {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="mt-4 cursor-pointer w-full h-11 rounded-xl bg-orange-600 hover:bg-stone-700 font-semibold"
      >
        <ShoppingBag size={15} />
        Create Order
      </Button>

      {user && (
        <OrderModal
          open={open}
          onClose={() => setOpen(false)}
          user={{ name: user.first_name, phone: user?.phone }}
        />
      )}
    </>
  );
}
