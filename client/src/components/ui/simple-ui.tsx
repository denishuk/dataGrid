import * as React from "react"
import { cn } from "@/lib/utils"

// Simple replacements for Radix UI components to remove dependencies

// Popover
interface PopoverProps { children: React.ReactNode; }
const Popover: React.FC<PopoverProps> = ({ children }) => (
  <div className="relative inline-block text-left">{children}</div>
);

const PopoverTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => (
  <div>{children}</div>
);

const PopoverContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("absolute z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5", className)}>
    {children}
  </div>
);

// Dropdown Menu
interface DropdownMenuProps { children: React.ReactNode; }
const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => (
  <div className="relative inline-block text-left">{children}</div>
);

const DropdownMenuTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => (
  <div>{children}</div>
);

const DropdownMenuContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("absolute right-0 z-50 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5", className)}>
    <div className="py-1">{children}</div>
  </div>
);

const DropdownMenuItem: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ children, onClick, className }) => (
  <button
    className={cn("flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100", className)}
    onClick={onClick}
  >
    {children}
  </button>
);

// Tooltip
interface TooltipProps { children: React.ReactNode; }
const TooltipProvider: React.FC<TooltipProps> = ({ children }) => <div>{children}</div>;
const Tooltip: React.FC<TooltipProps> = ({ children }) => <div className="relative">{children}</div>;
const TooltipTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => <div>{children}</div>;
const TooltipContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs", className)}>
    {children}
  </div>
);

// Select
interface SelectProps { value?: string; onValueChange?: (value: string) => void; children: React.ReactNode; }
const Select: React.FC<SelectProps> = ({ children }) => <div className="relative">{children}</div>;
const SelectTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <button className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm", className)}>
    {children}
  </button>
);
const SelectContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn("absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg", className)}>
    {children}
  </div>
);
const SelectItem: React.FC<{ children: React.ReactNode; value: string; className?: string }> = ({ children, className }) => (
  <div className={cn("relative cursor-default select-none py-2 pl-3 pr-9", className)}>
    {children}
  </div>
);
const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => (
  <span>{placeholder || 'Select...'}</span>
);

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
};