type Props = { count: number };

export function SidebarBadge({ count }: Props) {
  if (!count) return null;
  return (
    <span
      className="ml-auto min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0"
      style={{
        background: "rgba(34,197,94,0.18)",
        color: "#22c55e",
        border: "1px solid rgba(34,197,94,0.25)",
      }}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
