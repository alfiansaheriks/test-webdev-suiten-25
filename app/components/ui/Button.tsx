"use client";

import { Button as ShadButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  customColor?: string;
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      icon: Icon,
      iconPosition = "left",
      children,
      customColor = "#155EEF",
      isLoading = false,
      disabled,
      style,
      ...props
    },
    ref,
  ) => {
    return (
      <ShadButton
        className={cn(
          "transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50 hover:cursor-pointer",
          className,
        )}
        variant={variant}
        size={size}
        ref={ref}
        disabled={isLoading || disabled}
        style={
          {
            "--primary": customColor,
            ...(variant === "default" && {
              "--primary-foreground": "hsl(0 0% 98%)",
            }),
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {iconPosition === "left" && Icon && <Icon className="h-4 w-4" />}
            {children}
            {iconPosition === "right" && Icon && <Icon className="h-4 w-4" />}
          </div>
        )}
      </ShadButton>
    );
  },
);

Button.displayName = "Button";

export { Button };
