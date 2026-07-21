import { CSSProperties } from "react";

export function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`animate-pulse bg-stone-200 rounded-lg ${className}`} />
  );
}

export function SkeletonText({
  width = "w-full",
  height = "h-3",
}: {
  width?: string;
  height?: string;
}) {
  return <Skeleton className={`${width} ${height} rounded-md`} />;
}

export function SkeletonCircle({ size = "w-10 h-10" }: { size?: string }) {
  return <Skeleton className={`${size} rounded-full`} />;
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden ${className}`}
    />
  );
}
