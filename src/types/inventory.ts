export type Channel = "쿠팡" | "마켓대리" | "쿠거";

export type PriceHistory = {
  id: number;
  name: string;
  category: string;
  channel: Channel;
  currentPrice: number;
  yesterdayPrice: number;
  weekAgoPrice: number;
  twoWeeksAgoPrice: number;
  monthAgoPrice: number;
  yearAgoPrice: number;
  trend: "up" | "down";
  isLowestPrice: boolean;
};

export type InventoryItem = PriceHistory;