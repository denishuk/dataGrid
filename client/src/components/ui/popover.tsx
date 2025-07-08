import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const PopoverContext = React.createContext<PopoverContextType | null>(null);

const Popover: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block w-full">
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

const PopoverTrigger: React.FC<{
  children: React.ReactNode;
  asChild?: boolean
}> = ({ children, asChild }) => {
  const context = React.useContext(PopoverContext);

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: () => context?.setIsOpen(!context.isOpen)
    });
  }

  return (
    <div onClick={() => context?.setIsOpen(!context.isOpen)}>
      {children}
    </div>
  );
};

const PopoverContent = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom' | 'left' | 'right';
  sideOffset?: number;
}>(({ className, children, align = 'center', side = 'bottom', sideOffset = 4, ...props }, ref) => {
  const context = React.useContext(PopoverContext);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        context?.setIsOpen(false);
      }
    };

    if (context?.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [context?.isOpen, context]);

  if (!context?.isOpen) return null;

  const sideClass = side === 'top' ? 'bottom-full mb-1' :
                    side === 'left' ? 'right-full mr-1' :
                    side === 'right' ? 'left-full ml-1' : 'top-full mt-1';

  const alignClass = align === 'start' ? 'left-0' :
                     align === 'end' ? 'right-0' : 'left-1/2 -translate-x-1/2';

  return (
    <div
      ref={contentRef}
      className={cn(
        "absolute z-50 w-72 rounded-md bg-popover p-4 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        sideClass,
        alignClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };