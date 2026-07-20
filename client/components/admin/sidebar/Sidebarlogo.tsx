import { UtensilsCrossed } from "lucide-react";

type Props = { collapsed: boolean };

export function SidebarLogo({ collapsed }: Props) {
  return (
    <div
      className={`flex items-center gap-3 border-b border-white/6 ${collapsed ? "px-3 py-5 justify-center" : "px-5 py-5"}`}
    >
      <div
        className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
        }}
      >
        <UtensilsCrossed size={15} className="text-white" />
      </div>
      {!collapsed && (
        <div>
          <p className="text-white font-black text-sm tracking-tight leading-none">
            CHIYA VIBES
          </p>
          <p className="text-white/35 text-[10px] mt-0.5 font-medium tracking-wide">
            Admin Console
          </p>
        </div>
      )}
    </div>
  );
}
