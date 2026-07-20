import { CheckCircle2, Circle, XCircle } from "lucide-react";
import { STEPS } from "@/data/admin-data";

type Props = { currentStatus: string };

export function OrderStatusTimeline({ currentStatus }: Props) {
  const isCancelled = currentStatus === "cancelled";
  const currentIdx = STEPS.findIndex((s) => s.key === currentStatus);

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
      <h2 className="text-sm font-bold text-stone-900 mb-5">Order Timeline</h2>

      {isCancelled ? (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <XCircle size={18} className="text-red-500 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-700">
              Order Cancelled
            </p>
            <p className="text-xs text-red-400 mt-0.5">
              This order has been cancelled
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-stone-100" />
          <div
            className="absolute left-[15px] top-4 w-0.5 bg-stone-900 transition-all duration-700"
            style={{
              height:
                currentIdx <= 0
                  ? 0
                  : `calc(${(currentIdx / (STEPS.length - 1)) * 100}% - 16px)`,
            }}
          />

          <div className="flex flex-col gap-5 relative">
            {STEPS.map((step, i) => {
              const done = i < currentIdx;
              const active = i === currentIdx;
              const future = i > currentIdx;

              return (
                <div key={step.key} className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                    ${
                      done
                        ? "bg-stone-900 border-stone-900"
                        : active
                          ? "bg-white border-stone-900 shadow-sm"
                          : "bg-white border-stone-200"
                    }`}
                  >
                    {done ? (
                      <CheckCircle2 size={14} className="text-white" />
                    ) : active ? (
                      <div className="w-2.5 h-2.5 rounded-full bg-stone-900 animate-pulse" />
                    ) : (
                      <Circle size={10} className="text-stone-200" />
                    )}
                  </div>

                  {/* Text */}
                  <div className={`pt-0.5 ${future ? "opacity-35" : ""}`}>
                    <p
                      className={`text-sm font-semibold ${active ? "text-stone-900" : done ? "text-stone-600" : "text-stone-400"}`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-stone-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
