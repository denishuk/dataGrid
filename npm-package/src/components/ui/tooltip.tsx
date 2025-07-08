"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative">{children}</div>
);

const TooltipTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => (
  <div>{children}</div>
);

const TooltipContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute -top-8 left-1/2 transform -translate-x-1/2 z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
