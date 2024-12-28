import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingDown, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TopIngredientsPriceChart } from "./TopIngredientsPriceChart";

const mockInventoryData = [
  {
    id: 1,
    name: "닭고기 (한마리)",
    category: "축산물",
    channel: "쿠팡",
    currentPrice: 8500,
    yesterdayPrice: 8700,
    weekAgoPrice: 8300,
    twoWeeksAgoPrice: 8400,
    monthAgoPrice: 8200,
    yearAgoPrice: 7800,
    trend: "down",
    isLowestPrice: true,
  },
  {
    id: 2,
    name: "돼지고기 (삼겹살 1kg)",
    category: "축산물",
    channel: "마켓대리",
    currentPrice: 15000,
    yesterdayPrice: 14800,
    weekAgoPrice: 14500,
    twoWeeksAgoPrice: 14700,
    monthAgoPrice: 14200,
    yearAgoPrice: 13500,
    trend: "up",
    isLowestPrice: false,
  },
  {
    id: 3,
    name: "소고기 (등심 1kg)",
    category: "축산물",
    channel: "쿠팡",
    currentPrice: 45000,
    yesterdayPrice: 44800,
    weekAgoPrice: 44500,
    twoWeeksAgoPrice: 44700,
    monthAgoPrice: 43200,
    yearAgoPrice: 42500,
    trend: "up",
    isLowestPrice: false,
  },
  {
    id: 4,
    name: "고등어 (1마리)",
    category: "수산물",
    channel: "마켓대리",
    currentPrice: 4500,
    yesterdayPrice: 4700,
    weekAgoPrice: 4300,
    twoWeeksAgoPrice: 4400,
    monthAgoPrice: 4200,
    yearAgoPrice: 3800,
    trend: "down",
    isLowestPrice: true,
  },
  {
    id: 5,
    name: "연어 (200g)",
    category: "수산물",
    channel: "쿠팡",
    currentPrice: 12000,
    yesterdayPrice: 12200,
    weekAgoPrice: 11800,
    twoWeeksAgoPrice: 11900,
    monthAgoPrice: 11500,
    yearAgoPrice: 11000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 6,
    name: "오징어 (1마리)",
    category: "수산물",
    channel: "마켓대리",
    currentPrice: 3500,
    yesterdayPrice: 3600,
    weekAgoPrice: 3400,
    twoWeeksAgoPrice: 3500,
    monthAgoPrice: 3300,
    yearAgoPrice: 3000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 7,
    name: "양파 (1kg)",
    category: "채소/과일",
    channel: "쿠팡",
    currentPrice: 2500,
    yesterdayPrice: 2600,
    weekAgoPrice: 2400,
    twoWeeksAgoPrice: 2500,
    monthAgoPrice: 2300,
    yearAgoPrice: 2000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 8,
    name: "감자 (1kg)",
    category: "채소/과일",
    channel: "마켓대리",
    currentPrice: 3000,
    yesterdayPrice: 3100,
    weekAgoPrice: 2900,
    twoWeeksAgoPrice: 3000,
    monthAgoPrice: 2800,
    yearAgoPrice: 2500,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 9,
    name: "당근 (1kg)",
    category: "채소/과일",
    channel: "쿠팡",
    currentPrice: 2800,
    yesterdayPrice: 2900,
    weekAgoPrice: 2700,
    twoWeeksAgoPrice: 2800,
    monthAgoPrice: 2600,
    yearAgoPrice: 2300,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 10,
    name: "사과 (1kg)",
    category: "채소/과일",
    channel: "마켓대리",
    currentPrice: 8000,
    yesterdayPrice: 8200,
    weekAgoPrice: 7800,
    twoWeeksAgoPrice: 7900,
    monthAgoPrice: 7700,
    yearAgoPrice: 7400,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 11,
    name: "라면 (5개입)",
    category: "가공",
    channel: "쿠팡",
    currentPrice: 4500,
    yesterdayPrice: 4600,
    weekAgoPrice: 4400,
    twoWeeksAgoPrice: 4500,
    monthAgoPrice: 4300,
    yearAgoPrice: 4000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 12,
    name: "김치 (1kg)",
    category: "가공",
    channel: "마켓대리",
    currentPrice: 15000,
    yesterdayPrice: 15200,
    weekAgoPrice: 14800,
    twoWeeksAgoPrice: 14900,
    monthAgoPrice: 14700,
    yearAgoPrice: 14400,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 13,
    name: "돼지갈비 (1kg)",
    category: "축산물",
    channel: "쿠팡",
    currentPrice: 18000,
    yesterdayPrice: 18200,
    weekAgoPrice: 17800,
    twoWeeksAgoPrice: 17900,
    monthAgoPrice: 17700,
    yearAgoPrice: 17400,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 14,
    name: "소갈비 (1kg)",
    category: "축산물",
    channel: "마켓대리",
    currentPrice: 55000,
    yesterdayPrice: 55200,
    weekAgoPrice: 54800,
    twoWeeksAgoPrice: 54900,
    monthAgoPrice: 54700,
    yearAgoPrice: 54400,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 15,
    name: "참치 (200g)",
    category: "수산물",
    channel: "쿠팡",
    currentPrice: 25000,
    yesterdayPrice: 25200,
    weekAgoPrice: 24800,
    twoWeeksAgoPrice: 24900,
    monthAgoPrice: 24700,
    yearAgoPrice: 24400,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 16,
    name: "새우 (500g)",
    category: "수산물",
    channel: "마켓대리",
    currentPrice: 15000,
    yesterdayPrice: 15200,
    weekAgoPrice: 14800,
    twoWeeksAgoPrice: 14900,
    monthAgoPrice: 14700,
    yearAgoPrice: 14400,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 17,
    name: "배추 (1포기)",
    category: "채소/과일",
    channel: "쿠팡",
    currentPrice: 4500,
    yesterdayPrice: 4600,
    weekAgoPrice: 4400,
    twoWeeksAgoPrice: 4500,
    monthAgoPrice: 4300,
    yearAgoPrice: 4000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 18,
    name: "무 (1개)",
    category: "채소/과일",
    channel: "마켓대리",
    currentPrice: 2500,
    yesterdayPrice: 2600,
    weekAgoPrice: 2400,
    twoWeeksAgoPrice: 2500,
    monthAgoPrice: 2300,
    yearAgoPrice: 2000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 19,
    name: "고추장 (1kg)",
    category: "가공",
    channel: "쿠팡",
    currentPrice: 8500,
    yesterdayPrice: 8600,
    weekAgoPrice: 8400,
    twoWeeksAgoPrice: 8500,
    monthAgoPrice: 8300,
    yearAgoPrice: 8000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 20,
    name: "된장 (1kg)",
    category: "가공",
    channel: "마켓대리",
    currentPrice: 7500,
    yesterdayPrice: 7600,
    weekAgoPrice: 7400,
    twoWeeksAgoPrice: 7500,
    monthAgoPrice: 7300,
    yearAgoPrice: 7000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 21,
    name: "닭다리 (1kg)",
    category: "축산물",
    channel: "쿠팡",
    currentPrice: 9500,
    yesterdayPrice: 9600,
    weekAgoPrice: 9400,
    twoWeeksAgoPrice: 9500,
    monthAgoPrice: 9300,
    yearAgoPrice: 9000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 22,
    name: "돼지목살 (1kg)",
    category: "축산물",
    channel: "마켓대리",
    currentPrice: 16000,
    yesterdayPrice: 16200,
    weekAgoPrice: 15800,
    twoWeeksAgoPrice: 15900,
    monthAgoPrice: 15700,
    yearAgoPrice: 15400,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 23,
    name: "꽁치 (1마리)",
    category: "수산물",
    channel: "쿠팡",
    currentPrice: 3500,
    yesterdayPrice: 3600,
    weekAgoPrice: 3400,
    twoWeeksAgoPrice: 3500,
    monthAgoPrice: 3300,
    yearAgoPrice: 3000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 24,
    name: "갈치 (1마리)",
    category: "수산물",
    channel: "마켓대리",
    currentPrice: 12000,
    yesterdayPrice: 12200,
    weekAgoPrice: 11800,
    twoWeeksAgoPrice: 11900,
    monthAgoPrice: 11700,
    yearAgoPrice: 11400,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 25,
    name: "오이 (1kg)",
    category: "채소/과일",
    channel: "쿠팡",
    currentPrice: 3500,
    yesterdayPrice: 3600,
    weekAgoPrice: 3400,
    twoWeeksAgoPrice: 3500,
    monthAgoPrice: 3300,
    yearAgoPrice: 3000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 26,
    name: "토마토 (1kg)",
    category: "채소/과일",
    channel: "마켓대리",
    currentPrice: 4500,
    yesterdayPrice: 4600,
    weekAgoPrice: 4400,
    twoWeeksAgoPrice: 4500,
    monthAgoPrice: 4300,
    yearAgoPrice: 4000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 27,
    name: "간장 (1.8L)",
    category: "가공",
    channel: "쿠팡",
    currentPrice: 6500,
    yesterdayPrice: 6600,
    weekAgoPrice: 6400,
    twoWeeksAgoPrice: 6500,
    monthAgoPrice: 6300,
    yearAgoPrice: 6000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 28,
    name: "참기름 (500ml)",
    category: "가공",
    channel: "마켓대리",
    currentPrice: 12000,
    yesterdayPrice: 12200,
    weekAgoPrice: 11800,
    twoWeeksAgoPrice: 11900,
    monthAgoPrice: 11700,
    yearAgoPrice: 11400,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 29,
    name: "식용유 (1.8L)",
    category: "가공",
    channel: "쿠팡",
    currentPrice: 8500,
    yesterdayPrice: 8600,
    weekAgoPrice: 8400,
    twoWeeksAgoPrice: 8500,
    monthAgoPrice: 8300,
    yearAgoPrice: 8000,
    trend: "down",
    isLowestPrice: false,
  },
  {
    id: 30,
    name: "설탕 (3kg)",
    category: "가공",
    channel: "마켓대리",
    currentPrice: 5500,
    yesterdayPrice: 5600,
    weekAgoPrice: 5400,
    twoWeeksAgoPrice: 5500,
    monthAgoPrice: 5300,
    yearAgoPrice: 5000,
    trend: "down",
    isLowestPrice: false,
  },
];

export const InventoryOverview = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = selectedCategory === "전체" 
    ? mockInventoryData 
    : mockInventoryData.filter(item => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Get top 5 ingredients by price for each channel separately
  const topIngredientsByChannel = mockInventoryData
    .sort((a, b) => b.currentPrice - a.currentPrice);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="space-y-6">
      <TopIngredientsPriceChart data={topIngredientsByChannel} />
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">식자재 가격 현황</h3>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="전체">전체</SelectItem>
              <SelectItem value="축산물">축산물</SelectItem>
              <SelectItem value="수산물">수산물</SelectItem>
              <SelectItem value="채소/과일">채소/과일</SelectItem>
              <SelectItem value="가공">가공</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>품목</TableHead>
                <TableHead>채널</TableHead>
                <TableHead>현재가격</TableHead>
                <TableHead>어제가격</TableHead>
                <TableHead>7일전</TableHead>
                <TableHead>2주전</TableHead>
                <TableHead>한달전</TableHead>
                <TableHead>1년전</TableHead>
                <TableHead>추세</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.channel}</TableCell>
                  <TableCell className={item.isLowestPrice ? "text-success-dark font-bold" : ""}>
                    ₩{item.currentPrice.toLocaleString()}
                  </TableCell>
                  <TableCell>₩{item.yesterdayPrice.toLocaleString()}</TableCell>
                  <TableCell>₩{item.weekAgoPrice.toLocaleString()}</TableCell>
                  <TableCell>₩{item.twoWeeksAgoPrice.toLocaleString()}</TableCell>
                  <TableCell>₩{item.monthAgoPrice.toLocaleString()}</TableCell>
                  <TableCell>₩{item.yearAgoPrice.toLocaleString()}</TableCell>
                  <TableCell>
                    {item.trend === "up" ? (
                      <TrendingUp className="text-warning-dark w-5 h-5" />
                    ) : (
                      <TrendingDown className="text-success-dark w-5 h-5" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Card>
    </div>
  );
};
