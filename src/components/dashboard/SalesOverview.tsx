import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = {
  dailySales: [
    { date: "2024-01-01", sales: 1200000 },
    { date: "2024-01-02", sales: 1500000 },
    { date: "2024-01-03", sales: 1300000 },
    { date: "2024-01-04", sales: 1700000 },
    { date: "2024-01-05", sales: 1400000 },
    { date: "2024-01-06", sales: 1600000 },
    { date: "2024-01-07", sales: 1800000 },
    { date: "2024-01-08", sales: 1900000 },
  ],
};

export const SalesOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">어제 매출</h3>
          <p className="text-2xl font-bold mt-2">₩1,500,000</p>
          <span className="text-sm text-success-dark">+12.5%</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">오늘 매출</h3>
          <p className="text-2xl font-bold mt-2">₩1,800,000</p>
          <span className="text-sm text-success-dark">+20%</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">이번 주 매출</h3>
          <p className="text-2xl font-bold mt-2">₩12,500,000</p>
          <span className="text-sm text-success-dark">+15.3%</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">이번 달 매출</h3>
          <p className="text-2xl font-bold mt-2">₩45,000,000</p>
          <span className="text-sm text-success-dark">+18.2%</span>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">매출 추이</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.dailySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#2C3E50"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};