import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { X } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasClearInput?: boolean;
  onClearClick?(): void;
  value: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasClearInput, onClearClick, type, value, ...props }, ref) => {
    return (
      <div className={cn("relative", className)}>
        <input
          type={type}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          value={value}
          {...props}
        />
        {hasClearInput && value !== "" && (
          <div className="absolute p-1 top-2 right-2 text-xs cursor-pointer" onClick={onClearClick}>
            <X size={16}/>
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
