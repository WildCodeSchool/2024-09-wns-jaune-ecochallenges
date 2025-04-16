import { cn } from '@/lib/utils';

interface PillProps {
  children: React.ReactNode;
  className?: string;
}

export const Pill = ({ children, className, ...props }: PillProps) => {
  return (
    <div
      data-testid="pill"
      className={cn(
        'text-text-primary bg-primary/50 border-primary/70 flex h-[24px] w-auto items-center justify-center overflow-hidden rounded-lg border-1 p-1 text-sm shadow-sm sm:p-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
