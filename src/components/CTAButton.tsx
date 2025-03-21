
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps extends ButtonProps {
  icon?: React.ReactNode;
  highlight?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  children, 
  className, 
  icon, 
  highlight = false,
  ...props 
}) => {
  return (
    <Button
      className={cn(
        "relative px-6 py-6 h-auto transition-all duration-300 text-base font-medium",
        highlight && "animate-pulse shadow-lg",
        className
      )}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
      {highlight && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
        </span>
      )}
    </Button>
  );
};

export default CTAButton;
