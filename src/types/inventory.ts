export type PriceHistory = {
  currentPrice: number;
  yesterdayPrice: number;
  weekAgoPrice: number;
  twoWeeksAgoPrice: number;
  monthAgoPrice: number;
  yearAgoPrice: number;
  trend: "up" | "down";
  isLowestPrice: boolean;
};

export type InventoryItem = {
  id: number;
  name: string;
  category: string;
  channel: string;
} & PriceHistory;