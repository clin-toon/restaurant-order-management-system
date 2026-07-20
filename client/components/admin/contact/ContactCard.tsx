import React from "react";
import { ContactQuery } from "@/types/admin.types";
import { ContactStatus } from "@/types/admin.types";
import { Clock, CheckCheck, Phone, Calendar } from "lucide-react";
import { TYPE_COLORS } from "@/types/admin.types";
import { Avatar } from "./Avatar";
import { formatDate, formatTime } from "@/lib/utils";

const STATUS_CONFIG: Record<
  ContactStatus,
  {
    label: string;
    icon: React.ReactNode;
    bg: string;
    text: string;
    border: string;
  }
> = {
  pending: {
    label: "Pending",
    icon: <Clock size={11} />,
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
  },
  replied: {
    label: "Replied",
    icon: <CheckCheck size={11} />,
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
  },
};

const ContactCard = ({ query, idx }: { query: ContactQuery; idx: number }) => {
  const status = STATUS_CONFIG[query.status];
  const typeStyle =
    TYPE_COLORS[query.message_type] ??
    "bg-stone-100 text-stone-600 border-stone-200";

  return (
    <div className="group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      {/* Status accent line */}
      <div
        className={`h-0.5 w-full ${query.status === "replied" ? "bg-gradient-to-r from-emerald-400 to-teal-500" : "bg-gradient-to-r from-amber-400 to-orange-400"}`}
      />

      <div className="p-5 flex flex-col gap-4">
        {/* Top row */}
        <div className="flex items-start gap-3">
          <Avatar first={query.first_name} last={query.last_name} idx={idx} />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <p className="text-sm font-bold text-stone-900 leading-tight">
                  {query.first_name} {query.last_name}
                </p>
                {query.phone ? (
                  <div className="flex items-center gap-1 mt-0.5">
                    <Phone size={10} className="text-stone-400" />
                    <p className="text-xs text-stone-400 font-mono">
                      {query.phone}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-stone-300 mt-0.5">No phone</p>
                )}
              </div>

              {/* Badges */}
              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.bg} ${status.text} ${status.border}`}
                >
                  {status.icon}
                  {status.label}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeStyle}`}
                >
                  {query.message_type}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-stone-100 rounded-full" />
          <p className="text-sm text-stone-600 leading-relaxed pl-3.5 line-clamp-3">
            {query.message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-stone-400">
            <Calendar size={11} />
            <span className="text-xs">{formatDate(query.created_at)}</span>
            <span className="text-stone-200">·</span>
            <span className="text-xs">{formatTime(query.created_at)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="h-7 px-3 rounded-lg text-xs font-semibold text-stone-500 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 hover:border-stone-300 transition-all">
              View
            </button>
            {query.status === "pending" && (
              <button className="h-7 px-3 rounded-lg text-xs font-bold text-white bg-stone-900 hover:bg-stone-700 transition-colors">
                Mark Replied
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
