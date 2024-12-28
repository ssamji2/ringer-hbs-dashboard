import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const channelSalesData = [
  {
    channel: "포스",
    sales: 15800000,
  },
  {
    channel: "배민",
    sales: 12500000,
  },
  {
    channel: "쿠팡이츠",
    sales: 9800000,
  },
  {
    channel: "N주문",
    sales: 7500000,
  },
];

const CHART_COLORS = {
  bar: "#8B5CF6",
};

export const OrderChannelSales = () => {
  const formatValue = (value: number) => `₩${(value / 10000).toLocaleString()}만`;

  return (
    <Card className="p-6 bg-gradient-to-br from-violet-50 to-white">
      <h3 className="text-lg font-semibold mb-4">주문 채널별 매출</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={channelSalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="channel" stroke="#6B7280" />
            <YAxis
              stroke="#6B7280"
              tickFormatter={(value) => `${value / 10000}만`}
              label={{ value: '만원', angle: -90, position: 'insideLeft', offset: 0 }}
            />
            <Tooltip
              formatter={(value: number) => [formatValue(value), "매출"]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
              }}
            />
            <Bar dataKey="sales" fill={CHART_COLORS.bar} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};