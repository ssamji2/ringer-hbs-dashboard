export type Review = {
  id: string;
  brand: string;
  store: string;
  menu?: string;
  date: string;
  rating: number;
  review: string;
  url: string;
  channel: "N플레이스" | "배민" | "쿠팡이츠";
};