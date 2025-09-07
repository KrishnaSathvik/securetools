import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onValueChange: (value: string) => void;
  variant?: 'default' | 'code';
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, value, onValueChange, variant = 'default', rows = 12, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full rounded-lg border border-input bg-input p-4 text-sm transition-colors",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "resize-none",
          variant === 'code' && "font-mono bg-code-bg",
          className
        )}
        rows={rows}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        ref={ref}
        spellCheck={false}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };