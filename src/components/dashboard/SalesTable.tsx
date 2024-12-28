import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

const salesData = [
  {
    id: 1,
    storeName: "강남점",
    totalSales: 25800000,
    deliverySales: 15800000,
    offlineSales: 8500000,
    otherSales: 1500000,
    dailyAverage: 2150000,
    orderDate: "2024-01-15",
    orderRate: 92.5,
    orderCount: 385,
  },
  {
    id: 2,
    storeName: "홍대점",
    totalSales: 22500000,
    deliverySales: 14200000,
    offlineSales: 7300000,
    otherSales: 1000000,
    dailyAverage: 1875000,
    orderDate: "2024-01-15",
    orderRate: 88.2,
    orderCount: 342,
  },
  {
    id: 3,
    storeName: "신촌점",
    totalSales: 19800000,
    deliverySales: 12500000,
    offlineSales: 6300000,
    otherSales: 1000000,
    dailyAverage: 1650000,
    orderDate: "2024-01-15",
    orderRate: 85.7,
    orderCount: 298,
  },
  {
    id: 4,
    storeName: "건대점",
    totalSales: 21200000,
    deliverySales: 13800000,
    offlineSales: 6400000,
    otherSales: 1000000,
    dailyAverage: 1766667,
    orderDate: "2024-01-15",
    orderRate: 87.3,
    orderCount: 315,
  },
  {
    id: 5,
    storeName: "명동점",
    totalSales: 24500000,
    deliverySales: 14500000,
    offlineSales: 8500000,
    otherSales: 1500000,
    dailyAverage: 2041667,
    orderDate: "2024-01-15",
    orderRate: 91.8,
    orderCount: 375,
  },
  {
    id: 6,
    storeName: "종로점",
    totalSales: 20800000,
    deliverySales: 12800000,
    offlineSales: 7000000,
    otherSales: 1000000,
    dailyAverage: 1733333,
    orderDate: "2024-01-15",
    orderRate: 86.5,
    orderCount: 322,
  },
  {
    id: 7,
    storeName: "잠실점",
    totalSales: 23500000,
    deliverySales: 14200000,
    offlineSales: 8000000,
    otherSales: 1300000,
    dailyAverage: 1958333,
    orderDate: "2024-01-15",
    orderRate: 89.4,
    orderCount: 358,
  },
  {
    id: 8,
    storeName: "강변점",
    totalSales: 18900000,
    deliverySales: 11500000,
    offlineSales: 6400000,
    otherSales: 1000000,
    dailyAverage: 1575000,
    orderDate: "2024-01-15",
    orderRate: 84.2,
    orderCount: 285,
  },
  {
    id: 9,
    storeName: "신림점",
    totalSales: 19200000,
    deliverySales: 12000000,
    offlineSales: 6200000,
    otherSales: 1000000,
    dailyAverage: 1600000,
    orderDate: "2024-01-15",
    orderRate: 85.1,
    orderCount: 292,
  },
  {
    id: 10,
    storeName: "사당점",
    totalSales: 20500000,
    deliverySales: 12500000,
    offlineSales: 7000000,
    otherSales: 1000000,
    dailyAverage: 1708333,
    orderDate: "2024-01-15",
    orderRate: 86.8,
    orderCount: 315,
  },
];

const formatCurrency = (value: number) => `₩${value.toLocaleString()}`;

export const SalesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // 실제 데이터에 따라 조정

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
      <h3 className="text-lg font-semibold mb-4">매출 상세 내역</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>매장명</TableHead>
              <TableHead className="text-right">매출</TableHead>
              <TableHead className="text-right">배달매출</TableHead>
              <TableHead className="text-right">오프라인매출</TableHead>
              <TableHead className="text-right">기타매출</TableHead>
              <TableHead className="text-right">일평균매출</TableHead>
              <TableHead>주문발생일</TableHead>
              <TableHead className="text-right">주문활성율(%)</TableHead>
              <TableHead className="text-right">주문수</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.storeName}</TableCell>
                <TableCell className="text-right">{formatCurrency(row.totalSales)}</TableCell>
                <TableCell className="text-right">{formatCurrency(row.deliverySales)}</TableCell>
                <TableCell className="text-right">{formatCurrency(row.offlineSales)}</TableCell>
                <TableCell className="text-right">{formatCurrency(row.otherSales)}</TableCell>
                <TableCell className="text-right">{formatCurrency(row.dailyAverage)}</TableCell>
                <TableCell>{row.orderDate}</TableCell>
                <TableCell className="text-right">{row.orderRate}%</TableCell>
                <TableCell className="text-right">{row.orderCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  );
};