import { forwardRef, type InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onClearClick(): void;
  value: string;
}

const InputWithClear = forwardRef<HTMLInputElement, Props>(
  ({ onClearClick, value, ...props }, ref) => {
    return (
      <div className="relative">
        <Input value={value} {...props} ref={ref} />
        {value !== "" && (
          <div
            className="absolute p-1 top-2 right-2 text-xs cursor-pointer"
            onClick={onClearClick}
          >
            <X size={16} />
          </div>
        )}
      </div>
    );
  },
);
InputWithClear.displayName = "InputWithClear";

export default InputWithClear;
