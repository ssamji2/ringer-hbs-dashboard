import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PriceDisplay } from "./PriceDisplay";
import { InventoryItem } from "@/types/inventory";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type InventoryTableProps = {
  data: InventoryItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const InventoryTable = ({ 
  data,
  currentPage,
  totalPages,
  onPageChange,
}: InventoryTableProps) => {
  // Group data by item name and category
  const groupedData = data.reduce((acc, item) => {
    const key = `${item.name}-${item.category}`;
    if (!acc[key]) {
      acc[key] = {
        name: item.name,
        category: item.category,
        channels: {}
      };
    }
    acc[key].channels[item.channel] = {
      currentPrice: item.currentPrice,
      yesterdayPrice: item.yesterdayPrice,
      weekAgoPrice: item.weekAgoPrice,
      twoWeeksAgoPrice: item.twoWeeksAgoPrice,
      monthAgoPrice: item.monthAgoPrice,
      yearAgoPrice: item.yearAgoPrice,
      trend: item.trend,
    };
    return acc;
  }, {} as Record<string, {
    name: string;
    category: string;
    channels: Record<string, {
      currentPrice: number;
      yesterdayPrice: number;
      weekAgoPrice: number;
      twoWeeksAgoPrice: number;
      monthAgoPrice: number;
      yearAgoPrice: number;
      trend: "up" | "down";
    }>;
  }>);

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>품목</TableHead>
              <TableHead className="text-center">
                쿠팡
                <div className="text-xs text-muted-foreground">현재가격 / 어제 / 7일전 / 2주전 / 한달전 / 1년전</div>
              </TableHead>
              <TableHead className="text-center">
                마켓대리
                <div className="text-xs text-muted-foreground">현재가격 / 어제 / 7일전 / 2주전 / 한달전 / 1년전</div>
              </TableHead>
              <TableHead className="text-center">
                쿠거
                <div className="text-xs text-muted-foreground">현재가격 / 어제 / 7일전 / 2주전 / 한달전 / 1년전</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.values(groupedData).map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium whitespace-nowrap">
                  {item.name}
                  <div className="text-xs text-muted-foreground">{item.category}</div>
                </TableCell>
                {['쿠팡', '마켓대리', '쿠거'].map((channel) => (
                  <TableCell key={channel} className="text-center">
                    {item.channels[channel] ? (
                      <PriceDisplay {...item.channels[channel]} />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                ))}
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
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};