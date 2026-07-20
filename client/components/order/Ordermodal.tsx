"use client";

import { useState } from "react";
import {
  X,
  MapPin,
  Phone,
  User,
  ChevronRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DeliveryMapModal from "./DeliveryMapModal";
import { placeOrder } from "@/services/order.services";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";

type Props = {
  open: boolean;
  onClose: () => void;
  user: { name: string; phone?: string };
};

export default function OrderModal({ open, onClose, user }: Props) {
  const { addToDetailsCart } = useCart();
  const [phone, setPhone] = useState(user.phone ?? "");
  const [mapOpen, setMapOpen] = useState(false);
  const [deliveryData, setDeliveryData] = useState<DeliveryPayload | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleConfirm = async () => {
    if (!deliveryData) return;
    setIsSubmitting(true);

    const orderPayload = {
      receiver_name: user.name,
      receiver_phone: user.phone,
      ...deliveryData,
    };
    const order = await placeOrder(orderPayload);

    if (order) {
      setDone(true);
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    addToDetailsCart([]);
    setDone(false);
    setDeliveryData(null);
    setPhone(user.phone ?? "");
    onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md rounded-2xl p-0 overflow-hidden gap-0">
          {/* ── Success state ── */}
          {done ? (
            <div className="flex flex-col items-center justify-center gap-4 py-14 px-8 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  Order Placed!
                </h3>
                <p className="text-sm text-stone-500 mt-1">
                  Your order is placed. We'll notify you about your order.
                </p>
              </div>
              <Link href="/orders">
                <Button
                  onClick={handleClose}
                  className="mt-2 rounded-xl bg-orange-600 hover:bg-stone-700 w-full"
                >
                  Done
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Header */}
              <DialogHeader className="px-6 pt-6 pb-4 border-b border-stone-100">
                <DialogTitle className="text-lg font-bold text-stone-900">
                  Confirm Order
                </DialogTitle>
                <p className="text-sm text-stone-400 mt-0.5">
                  Review your details before placing the order
                </p>
              </DialogHeader>

              <div className="px-6 py-5 flex flex-col gap-5">
                {/* Full name — read only */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <Input
                      value={user.name}
                      readOnly
                      className="pl-9 bg-stone-50 text-stone-500 cursor-not-allowed rounded-xl border-stone-200"
                    />
                  </div>
                </div>

                {/* Phone number */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                    />
                    <Input
                      type="tel"
                      placeholder="+977 98XXXXXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-9 rounded-xl border-stone-200 focus-visible:ring-stone-300"
                    />
                  </div>
                </div>

                {/* Delivery address */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                    Delivery Address
                  </Label>

                  {deliveryData ? (
                    /* Address confirmed — show summary */
                    <div className="flex items-start gap-3 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin size={14} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {deliveryData.landmark && (
                          <p className="text-sm font-semibold text-stone-900 truncate">
                            {deliveryData.landmark}
                          </p>
                        )}
                        <p className="text-xs text-stone-500 mt-0.5">
                          {deliveryData.latitude.toFixed(5)},{" "}
                          {deliveryData.longitude.toFixed(5)}
                        </p>
                        <a
                          href={deliveryData.location_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-emerald-600 hover:underline mt-0.5 inline-block"
                        >
                          View on map ↗
                        </a>
                      </div>
                      <button
                        onClick={() => setMapOpen(true)}
                        className="text-xs text-stone-400 hover:text-stone-700 transition-colors shrink-0"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    /* No address yet */
                    <button
                      onClick={() => setMapOpen(true)}
                      className="flex items-center gap-3 p-4 cursor-pointer bg-stone-50 border border-dashed border-stone-300 rounded-xl hover:border-stone-400 hover:bg-stone-100 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-orange-600 group-hover:bg-orange-500 cursor-pointer flex items-center justify-center transition-colors shrink-0">
                        <MapPin size={15} className="text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-sm font-semibold text-stone-800">
                          Select Delivery Address
                        </p>
                        <p className="text-xs text-stone-400 mt-0.5">
                          Pin your exact location on the map
                        </p>
                      </div>
                      <ChevronRight
                        size={15}
                        className="text-stone-400 group-hover:text-stone-600 transition-colors"
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex flex-col gap-2.5">
                <Button
                  onClick={handleConfirm}
                  disabled={!deliveryData || !phone.trim() || isSubmitting}
                  className="cursor-pointer w-full h-11 rounded-xl bg-orange-600 hover:bg-stone-700 font-semibold disabled:bg-stone-200"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Placing
                      Order…
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="w-full h-10 rounded-xl text-stone-400 hover:text-stone-700"
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Map picker modal */}
      <DeliveryMapModal
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        onConfirm={(data) => {
          setDeliveryData(data);
          setMapOpen(false);
        }}
      />
    </>
  );
}
