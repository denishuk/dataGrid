import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "peer h-4 w-4 shrink-0 rounded border border-gray-300 text-indigo-600 focus:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary text-primary-foreground" : "bg-white",
        className
      )}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      {checked && (
        <div className="flex items-center justify-center text-current">
          <Check className="h-4 w-4" />
        </div>
      )}
    </button>
  )
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
