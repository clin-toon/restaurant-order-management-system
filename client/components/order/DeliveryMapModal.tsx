"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  Navigation,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type DeliveryPayload = {
  latitude: number;
  longitude: number;
  location_url: string;
  landmark: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: (data: DeliveryPayload) => void;
};

type PermissionState = "idle" | "requesting" | "granted" | "denied";

// Default — Kathmandu, Nepal
const DEFAULT_LAT = 27.7172;
const DEFAULT_LNG = 85.324;

export default function DeliveryMapModal({ open, onClose, onConfirm }: Props) {
  const [permission, setPermission] = useState<PermissionState>("idle");
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lng, setLng] = useState(DEFAULT_LNG);
  const [landmark, setLandmark] = useState("");

  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`;

  // ── Request location ──────────────────────────────────────────────────────
  const requestLocation = () => {
    setPermission("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setPermission("granted");
      },
      () => setPermission("denied"),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  // ── Reset on close ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) {
      setPermission("idle");
      setLat(DEFAULT_LAT);
      setLng(DEFAULT_LNG);
      setLandmark("");
    }
  }, [open]);

  const handleConfirm = () => {
    onConfirm({
      latitude: lat,
      longitude: lng,
      location_url: `https://maps.google.com/maps?q=${lat},${lng}`,
      landmark: landmark.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-2xl p-0 overflow-hidden gap-0">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-stone-100">
          <DialogTitle className="text-base font-bold text-stone-900 flex items-center gap-2">
            <MapPin size={16} className="text-stone-500" />
            Pin Your Delivery Location
          </DialogTitle>
          <p className="text-xs text-stone-400 mt-0.5">
            We'll use your coordinates to show your location on the map
          </p>
        </DialogHeader>

        {/* ── Idle ── */}
        {permission === "idle" && (
          <div className="flex flex-col items-center gap-5 py-14 px-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
              <Navigation size={28} className="text-stone-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Allow Location Access
              </h3>
              <p className="text-sm text-stone-400 mt-1.5 leading-relaxed max-w-xs">
                We'll use your current coordinates to show your location on the
                map.
              </p>
            </div>
            <Button
              onClick={requestLocation}
              className="cursor-pointer w-full max-w-xs rounded-xl bg-orange-600 hover:bg-stone-700 h-11 font-semibold"
            >
              <Navigation size={14} />
              Use My Location
            </Button>
          </div>
        )}

        {/* ── Requesting ── */}
        {permission === "requesting" && (
          <div className="flex flex-col items-center gap-4 py-14 px-8 text-center">
            <Loader2 size={28} className="animate-spin text-stone-400" />
            <p className="text-sm text-stone-500">Fetching your location…</p>
          </div>
        )}

        {/* ── Map view ── */}
        {(permission === "granted" || permission === "denied") && (
          <div className="flex flex-col">
            {/* Denied banner */}
            {permission === "denied" && (
              <div className="flex items-center gap-2 mx-4 mt-4 px-3 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
                <AlertCircle size={13} className="shrink-0" />
                Location access denied. Please provide us location access for
                accuate delivery of your order
              </div>
            )}

            {/* Google Maps iframe */}
            <div className="mx-4 mt-4 rounded-xl overflow-hidden border border-stone-200">
              <iframe
                key={`${lat}-${lng}`} // re-renders iframe when coords change
                src={mapSrc}
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Delivery location"
              />
            </div>

            {/* Coords */}
            <div className="flex items-center justify-center gap-1.5 mt-2.5">
              <MapPin size={11} className="text-stone-400" />
              <span className="text-xs text-stone-400 font-mono">
                {lat.toFixed(6)}, {lng.toFixed(6)}
              </span>
            </div>

            {/* Landmark */}
            <div className="px-4 mt-3">
              <Input
                placeholder="Add a landmark (e.g. Near Bhatbhateni, Blue Gate)"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="rounded-xl border-stone-200 text-sm focus-visible:ring-stone-300"
              />
            </div>

            {/* Actions */}
            <div className="px-4 py-5 flex gap-2.5">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 h-11 rounded-xl border-stone-200 text-stone-600"
              >
                Back
              </Button>
              <Button
                onClick={handleConfirm}
                className="cursor-pointer flex-1 h-11 rounded-xl bg-orange-600 hover:bg-stone-700 font-semibold"
              >
                <CheckCircle2 size={14} />
                Confirm Location
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
