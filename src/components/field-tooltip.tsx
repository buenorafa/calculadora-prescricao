import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { type ReactNode } from "react";

interface FieldTooltipProps {
  children: ReactNode; // apenas o conteúdo do tooltip
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export function FieldTooltip({
  children,
  side = "top",
  align = "center",
}: FieldTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <HelpCircle className="w-4 h-4 text-muted-foreground cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <div className="p-2 w-[220px] text-sm text-gray-300">{children}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
