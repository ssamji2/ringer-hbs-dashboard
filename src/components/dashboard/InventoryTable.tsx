import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingDown, TrendingUp } from "lucide-react";
import { type InventoryItem } from "@/types/inventory";

type InventoryTableProps = {
  data: InventoryItem[];
};

export const InventoryTable = ({ data }: InventoryTableProps) => {
  // Group items by name to show all channels side by side
  const groupedItems = data.reduce((acc, item) => {
    if (!acc[item.name]) {
      acc[item.name] = {
        name: item.name,
        category: item.category,
        channels: {}
      };
    }
    acc[item.name].channels[item.channel] = item;
    return acc;
  }, {} as Record<string, { name: string; category: string; channels: Record<string, InventoryItem> }>);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>품목</TableHead>
          <TableHead>쿠팡</TableHead>
          <TableHead>마켓대리</TableHead>
          <TableHead>쿠거</TableHead>
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
        {Object.values(groupedItems).map((group) => (
          <TableRow key={group.name}>
            <TableCell className="font-medium">{group.name}</TableCell>
            <TableCell>{group.channels["쿠팡"]?.currentPrice.toLocaleString()}</TableCell>
            <TableCell>{group.channels["마켓대리"]?.currentPrice.toLocaleString()}</TableCell>
            <TableCell>{group.channels["쿠거"]?.currentPrice.toLocaleString()}</TableCell>
            <TableCell>
              {Math.min(
                ...Object.values(group.channels).map(item => item.currentPrice)
              ).toLocaleString()}
            </TableCell>
            <TableCell>
              {Math.min(
                ...Object.values(group.channels).map(item => item.yesterdayPrice)
              ).toLocaleString()}
            </TableCell>
            <TableCell>
              {Math.min(
                ...Object.values(group.channels).map(item => item.weekAgoPrice)
              ).toLocaleString()}
            </TableCell>
            <TableCell>
              {Math.min(
                ...Object.values(group.channels).map(item => item.twoWeeksAgoPrice)
              ).toLocaleString()}
            </TableCell>
            <TableCell>
              {Math.min(
                ...Object.values(group.channels).map(item => item.monthAgoPrice)
              ).toLocaleString()}
            </TableCell>
            <TableCell>
              {Math.min(
                ...Object.values(group.channels).map(item => item.yearAgoPrice)
              ).toLocaleString()}
            </TableCell>
            <TableCell>
              {Object.values(group.channels).some(item => item.trend === "up") ? (
                <TrendingUp className="text-warning-dark w-5 h-5" />
              ) : (
                <TrendingDown className="text-success-dark w-5 h-5" />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};