import { AVATAR_GRADIENTS } from "@/types/admin.types";
import { initials } from "@/lib/utils";

export function Avatar({
  first,
  last,
  idx,
}: {
  first: string;
  last: string;
  idx: number;
}) {
  const grad = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
  return (
    <div
      className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-white text-xs font-black shrink-0 shadow-sm`}
    >
      {initials(first, last)}
    </div>
  );
}
