"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface HintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export const Hint = ({ label, children, side, align }: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          {/* Ensure only one child is passed to TooltipTrigger */}
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="bg-black text-white text-xs font-medium px-2 py-1 rounded-md border border-white/5 shadow-sm"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};