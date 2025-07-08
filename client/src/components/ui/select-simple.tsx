import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  defaultValue?: string;
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, children, defaultValue }) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const [isOpen, setIsOpen] = React.useState(false);
  
  const currentValue = value !== undefined ? value : internalValue;
  
  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {React.cloneElement(children as React.ReactElement, {
        value: currentValue,
        onValueChange: handleValueChange,
        isOpen,
        setIsOpen
      })}
    </div>
  );
};

const SelectTrigger = React.forwardRef<HTMLButtonElement, any>(
  ({ className, children, isOpen, setIsOpen, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => setIsOpen?.(!isOpen)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
);

const SelectContent: React.FC<any> = ({ className, children, isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className={cn(
      "absolute z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
      className
    )}>
      <div className="p-1">
        {children}
      </div>
    </div>
  );
};

const SelectItem: React.FC<any> = ({ className, children, value: itemValue, onValueChange }) => (
  <div
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
      className
    )}
    onClick={() => onValueChange?.(itemValue)}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Check className="h-4 w-4" />
    </span>
    {children}
  </div>
);

const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => (
  <span className="block truncate">{placeholder || 'Select...'}</span>
);

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
}