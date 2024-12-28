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
  // ... 더 많은 mock 데이터
];

export const InventoryOverview = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const filteredData = selectedCategory === "전체" 
    ? mockInventoryData 
    : mockInventoryData.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
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
              {filteredData.map((item) => (
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
      </Card>
    </div>
  );
};