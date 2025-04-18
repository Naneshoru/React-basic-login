import * as React from "react";
import { cn } from "lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, icon, children, ...props }, ref) => {
    return (
      <label className='flex flex-col gap-1'>
        {label}
        <div className="input-container">
          {icon}
          <input
            type={type}
            className={cn(
              `flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
              className,
              icon ? 'pl-10' : ''
            )}
            ref={ref}
            {...props}
          />
          {children}
        </div>
      </label>
    );
  }
);
Input.displayName = "Input";

export { Input };
