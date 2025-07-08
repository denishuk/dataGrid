import * as React from "react"

import { cn } from "@/lib/utils"

const Popover: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative inline-block text-left">{children}</div>
);

const PopoverTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => (
  <div>{children}</div>
);

const PopoverContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-2 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
