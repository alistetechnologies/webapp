import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputWithLabel({
  name,
  label,
  placeholder,
  type = "text",
  ...props
}) {
  return (
    <div className="w-full max-w-s items-center gap-2 ">
      <Label htmlFor={name} className="text-lg">
        {label}
      </Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        {...props}
        className="border border-black flex-1"
      />
    </div>
  );
}
