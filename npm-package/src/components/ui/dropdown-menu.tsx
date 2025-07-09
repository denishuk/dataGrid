import * as React from "react"
import { createPortal } from "react-dom"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

interface DropdownMenuContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerElement?: HTMLElement;
  setTriggerElement?: (element: HTMLElement) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType | null>(null);

const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [triggerElement, setTriggerElement] = React.useState<HTMLElement | undefined>();

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen, triggerElement, setTriggerElement }}>
      <div className="relative inline-block text-left w-full">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger: React.FC<{
  children: React.ReactNode;
  asChild?: boolean;
}> = ({ children, asChild }) => {
  const context = React.useContext(DropdownMenuContext);
  const triggerRef = React.useRef<HTMLElement>(null);

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      ref: triggerRef,
      'data-dropdown-trigger': true,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        context?.setIsOpen(!context.isOpen);
        // Store trigger element for positioning
        if (context?.setTriggerElement) {
          context.setTriggerElement(e.currentTarget as HTMLElement);
        }
      }
    });
  }

  return (
    <div
      ref={triggerRef}
      data-dropdown-trigger="true"
      onClick={(e) => {
        e.stopPropagation();
        context?.setIsOpen(!context.isOpen);
        // Store trigger element for positioning
        if (context?.setTriggerElement) {
          context.setTriggerElement(e.currentTarget as HTMLElement);
        }
      }}
    >
      {children}
    </div>
  );
};

const DropdownMenuContent = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
}>(({ className, children, sideOffset = 4, align = 'start', ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        context?.setIsOpen(false);
      }
    };

    if (context?.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Calculate position relative to viewport
      if (context.triggerElement) {
        const rect = context.triggerElement.getBoundingClientRect();
        setPosition({
          top: rect.bottom + sideOffset,
          left: align === 'end' ? rect.right - 192 : rect.left // 192px = w-48
        });
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [context?.isOpen, context, align, sideOffset]);

  if (!context?.isOpen) return null;

  const content = (
    <div
      ref={contentRef}
      className={cn(
        "fixed min-w-[8rem] bg-white border border-gray-800/10 overflow-hidden rounded p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95",
        className
      )}
      style={{
        top: position.top,
        left: position.left,
      }}
      {...props}
    >
      {children}
    </div>
  );

  // Use portal to render outside of table container
  return createPortal(content, document.body);
});
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

const DropdownMenuPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

const DropdownMenuSub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

const DropdownMenuRadioGroup: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

const DropdownMenuSubTrigger = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  inset?: boolean
}>(({ className, inset, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </div>
));
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

const DropdownMenuSubContent = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
}>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

const DropdownMenuItem = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
  onClick?: () => void;
}>(({ className, inset, children, onClick, ...props }, ref) => {
  const context = React.useContext(DropdownMenuContext);

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
        context?.setIsOpen(false);
      }}
      {...props}
    >
      {children}
    </div>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuCheckboxItem = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}>(({ className, children, checked, onCheckedChange, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    onClick={() => onCheckedChange?.(!checked)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {checked && <Check className="h-4 w-4" />}
    </span>
    {children}
  </div>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

const DropdownMenuRadioItem = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  value?: string;
}>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Circle className="h-2 w-2 fill-current" />
    </span>
    {children}
  </div>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, {
  children: React.ReactNode;
  className?: string;
  inset?: boolean;
}>(({ className, inset, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, {
  className?: string;
}>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-800/10", className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuShortcut: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)}>
    {children}
  </span>
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};