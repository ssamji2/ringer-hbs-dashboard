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
    storeName: "국수나무 강남점",
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
    storeName: "도쿄스테이크 홍대점",
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
    storeName: "화평동왕냉면 신촌점",
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
    storeName: "국수나무 건대점",
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
    storeName: "도쿄스테이크 명동점",
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
    storeName: "화평동왕냉면 종로점",
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
    storeName: "국수나무 잠실점",
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
    storeName: "도쿄스테이크 강변점",
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
    storeName: "화평동왕냉면 신림점",
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
    storeName: "국수나무 사당점",
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
  const totalPages = 3;

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">매출 상세 내역</h3>
      <div className="overflow-x-auto rounded-lg border border-gray-100 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100">
              <TableHead className="font-semibold text-gray-700">매장명</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">매출</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">배달매출</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">오프라인매출</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">기타매출</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">일평균매출</TableHead>
              <TableHead className="font-semibold text-gray-700">주문발생일</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">주문활성율(%)</TableHead>
              <TableHead className="text-right font-semibold text-gray-700">주문수</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {salesData.map((row) => (
              <TableRow 
                key={row.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium text-gray-900">{row.storeName}</TableCell>
                <TableCell className="text-right font-medium text-gray-900">{formatCurrency(row.totalSales)}</TableCell>
                <TableCell className="text-right text-gray-600">{formatCurrency(row.deliverySales)}</TableCell>
                <TableCell className="text-right text-gray-600">{formatCurrency(row.offlineSales)}</TableCell>
                <TableCell className="text-right text-gray-600">{formatCurrency(row.otherSales)}</TableCell>
                <TableCell className="text-right text-gray-600">{formatCurrency(row.dailyAverage)}</TableCell>
                <TableCell className="text-gray-600">{row.orderDate}</TableCell>
                <TableCell className="text-right text-gray-600">{row.orderRate}%</TableCell>
                <TableCell className="text-right text-gray-600">{row.orderCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                className="hover:bg-gray-100"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? 'bg-primary text-white' : 'hover:bg-gray-100'}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                href="#" 
                className="hover:bg-gray-100"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  );
};