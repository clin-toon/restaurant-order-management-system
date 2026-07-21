import { Label } from "../ui/label";

export default function FormField({
  id,
  label,
  error,
  touched,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  touched?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-stone-600">
        {label}
      </Label>
      {children}
      {touched && error && (
        <p className="text-xs text-red-500 flex items-center gap-1">{error}</p>
      )}
    </div>
  );
}
