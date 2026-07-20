export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getTier(spent: number) {
  if (spent >= 5000)
    return { label: "Platinum", bg: "bg-slate-100", text: "text-slate-600" };
  if (spent >= 2000)
    return { label: "Gold", bg: "bg-amber-50", text: "text-amber-700" };
  if (spent >= 500)
    return { label: "Silver", bg: "bg-stone-100", text: "text-stone-500" };
  return { label: "New", bg: "bg-emerald-50", text: "text-emerald-700" };
}
