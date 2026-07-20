import { MapPin, ExternalLink, Navigation } from "lucide-react";

type Props = {
  landmark: string;
  latitude: number;
  longitude: number;
  locationUrl: string;
};

export function OrderDeliveryCard({
  landmark,
  latitude,
  longitude,
  locationUrl,
}: Props) {
  const embedSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-stone-50">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center">
            <MapPin size={14} className="text-stone-600" />
          </div>
          <h2 className="text-sm font-bold text-stone-900">Delivery Address</h2>
        </div>
        <a
          href={locationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ExternalLink size={12} />
          Open in Maps
        </a>
      </div>

      {/* Map iframe */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <iframe
          key={`${latitude}-${longitude}`}
          src={embedSrc}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title="Delivery location"
          className="absolute inset-0"
        />
      </div>

      {/* Address details */}
      <div className="px-6 py-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center shrink-0 mt-0.5">
          <Navigation size={13} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-stone-900">{landmark}</p>
          <p className="text-xs text-stone-400 font-mono mt-0.5">
            {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </p>
        </div>
      </div>
    </div>
  );
}
