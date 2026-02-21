import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BorderedContainerProps {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  showBorders?: boolean;
}

export function BorderedContainer({
  children,
  className,
  innerClassName,
  showBorders = true,
}: BorderedContainerProps) {
  return (
    <div className={cn("max-w-7xl mx-auto relative", className)}>
      {showBorders && (
        <>
          {/* Outer border - thinner */}
          <div className="absolute inset-y-0 left-0 w-px bg-border" />
          <div className="absolute inset-y-0 right-0 w-px bg-border" />
          
          {/* Inner border - thicker, with gap */}
          <div className="absolute inset-y-0 left-1.5 w-[2px] bg-border/50" />
          <div className="absolute inset-y-0 right-1.5 w-[2px] bg-border/50" />
        </>
      )}
      
      {/* Content with padding for the borders */}
      <div className={cn("px-6", innerClassName)}>
        {children}
      </div>
    </div>
  );
}

// Section wrapper with top/bottom borders
interface SectionBorderProps {
  children: ReactNode;
  className?: string;
  showTopBorder?: boolean;
  showBottomBorder?: boolean;
}

export function SectionBorder({
  children,
  className,
  showTopBorder = true,
  showBottomBorder = true,
}: SectionBorderProps) {
  return (
    <div
      className={cn(
        "relative",
        showTopBorder && "border-t border-border",
        showBottomBorder && "border-b border-border",
        className
      )}
    >
      {children}
    </div>
  );
}
