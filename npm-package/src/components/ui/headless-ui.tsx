import React, { Fragment } from 'react';
import { Dialog, Transition, Listbox, Popover, Switch } from '@headlessui/react';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    };

    const sizes = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Dialog Components
interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const HeadlessDialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative">
    {children}
  </div>
);

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
    {children}
  </Dialog.Title>
);

export const DialogDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Dialog.Description className="mt-2 text-sm text-gray-500">
    {children}
  </Dialog.Description>
);

// Select Components using Listbox
interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  return (
    <Listbox value={value} onChange={onValueChange}>
      <div className="relative">
        {children}
      </div>
    </Listbox>
  );
};

export const SelectTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <Listbox.Button className={cn(
    'relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm',
    className
  )}>
    {children}
    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
    </span>
  </Listbox.Button>
);

export const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Transition
    as={Fragment}
    leave="transition ease-in duration-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      {children}
    </Listbox.Options>
  </Transition>
);

export const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => (
  <Listbox.Option
    className={({ active }) =>
      cn(
        'relative cursor-default select-none py-2 pl-10 pr-4',
        active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
      )
    }
    value={value}
  >
    {({ selected }) => (
      <>
        <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>
          {children}
        </span>
        {selected && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
            <Check className="h-5 w-5" aria-hidden="true" />
          </span>
        )}
      </>
    )}
  </Listbox.Option>
);

export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => (
  <span className="block truncate">{placeholder || 'Select...'}</span>
);

// Checkbox Component
interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onCheckedChange, className }) => (
  <button
    type="button"
    className={cn(
      'flex h-4 w-4 items-center justify-center rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      checked ? 'bg-blue-600 border-blue-600' : 'bg-white',
      className
    )}
    onClick={() => onCheckedChange(!checked)}
  >
    {checked && <Check className="h-3 w-3 text-white" />}
  </button>
);

// Switch Component
interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export const HeadlessSwitch: React.FC<SwitchProps> = ({ checked, onCheckedChange, className }) => (
  <Switch
    checked={checked}
    onChange={onCheckedChange}
    className={cn(
      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      checked ? 'bg-blue-600' : 'bg-gray-200',
      className
    )}
  >
    <span
      className={cn(
        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
        checked ? 'translate-x-6' : 'translate-x-1'
      )}
    />
  </Switch>
);

// Popover Component
interface PopoverProps {
  children: React.ReactNode;
}

export const HeadlessPopover: React.FC<PopoverProps> = ({ children }) => (
  <Popover className="relative">
    {children}
  </Popover>
);

// Dropdown Menu Components using Headless UI Menu
interface DropdownMenuProps {
  children: React.ReactNode;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => (
  <div className="relative inline-block text-left">
    {children}
  </div>
);

export const DropdownMenuTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ 
  children 
}) => (
  <Fragment>
    {children}
  </Fragment>
);

export const DropdownMenuContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <div className={cn(
    'absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50',
    className
  )}>
    <div className="py-1">
      {children}
    </div>
  </div>
);

export const DropdownMenuItem: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className }) => (
  <button
    className={cn(
      'group flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
      className
    )}
    onClick={onClick}
  >
    {children}
  </button>
);

export const PopoverTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ 
  children 
}) => (
  <Popover.Button as={Fragment}>
    {children}
  </Popover.Button>
);

export const PopoverContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-200"
    enterFrom="opacity-0 translate-y-1"
    enterTo="opacity-100 translate-y-0"
    leave="transition ease-in duration-150"
    leaveFrom="opacity-100 translate-y-0"
    leaveTo="opacity-0 translate-y-1"
  >
    <Popover.Panel className={cn(
      'absolute z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0',
      className
    )}>
      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="relative bg-white p-4">
          {children}
        </div>
      </div>
    </Popover.Panel>
  </Transition>
);

// Badge Component
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
    outline: 'border border-input bg-background text-foreground',
  };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

// Label Component
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';

// Separator Component
interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({ 
  orientation = 'horizontal', 
  className 
}) => (
  <div
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
  />
);