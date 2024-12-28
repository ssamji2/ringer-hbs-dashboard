import { TrendingDown, TrendingUp } from "lucide-react";

type PriceDisplayProps = {
  currentPrice: number;
  yesterdayPrice: number;
  weekAgoPrice: number;
  twoWeeksAgoPrice: number;
  monthAgoPrice: number;
  yearAgoPrice: number;
  trend: "up" | "down";
};

export const PriceDisplay = ({
  currentPrice,
  yesterdayPrice,
  weekAgoPrice,
  twoWeeksAgoPrice,
  monthAgoPrice,
  yearAgoPrice,
  trend,
}: PriceDisplayProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-center gap-2 font-bold">
        ₩{currentPrice.toLocaleString()}
        {trend === "up" ? (
          <TrendingUp className="text-warning-dark w-4 h-4" />
        ) : (
          <TrendingDown className="text-success-dark w-4 h-4" />
        )}
      </div>
      <div className="text-xs text-muted-foreground space-x-2">
        <span>₩{yesterdayPrice.toLocaleString()}</span>
        <span>₩{weekAgoPrice.toLocaleString()}</span>
        <span>₩{twoWeeksAgoPrice.toLocaleString()}</span>
        <span>₩{monthAgoPrice.toLocaleString()}</span>
        <span>₩{yearAgoPrice.toLocaleString()}</span>
      </div>
    </div>
  );
};