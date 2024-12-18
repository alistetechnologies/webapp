import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function InputWithLabel({
  name,
  label,
  placeholder,
  type = 'text',
  ...props
}) {
  return (
    <div className='grid w-full max-w-sm items-center gap-1.5'>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
