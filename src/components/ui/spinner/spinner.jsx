import { cn } from '@/lib/utils';

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24',
};

const variants = {
  light: 'text-white',
  primary: 'text-slate-600',
};

export const Spinner = ({
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={cn(
          'animate-spin',
          sizes[size],
          variants[variant],
          className
        )}
      >
        <path d='M21 12a9 9 0 1 1-6.219-8.56' />
      </svg>
      <span className='sr-only'>Loading</span>
    </>
  );
};
