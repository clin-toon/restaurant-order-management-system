import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ViewDetailsLink({ orderId }: { orderId: string }) {
  return (
    <Link
      href={`order/details/${orderId}`}
      className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
    >
      View Details
      <ChevronRight size={13} />
    </Link>
  );
}
