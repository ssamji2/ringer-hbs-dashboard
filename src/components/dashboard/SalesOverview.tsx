import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

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
  weeklySales: {
    lastWeek: {
      weekday: 8500000,
      weekend: 3500000,
    },
    thisWeek: {
      weekday: 9200000,
      weekend: 4100000,
    }
  }
};

const weeklyComparisonData = [
  {
    period: "전주 평일",
    sales: mockData.weeklySales.lastWeek.weekday,
  },
  {
    period: "전주 주말",
    sales: mockData.weeklySales.lastWeek.weekend,
  },
  {
    period: "금주 평일",
    sales: mockData.weeklySales.thisWeek.weekday,
  },
  {
    period: "금주 주말",
    sales: mockData.weeklySales.thisWeek.weekend,
  },
];

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
        <Card className="p-4 col-span-2">
          <h3 className="text-sm font-medium text-gray-500">주간 매출</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <h4 className="text-xs text-gray-400">전주</h4>
              <div className="mt-1">
                <p className="text-sm">평일: <span className="font-bold">₩{mockData.weeklySales.lastWeek.weekday.toLocaleString()}</span></p>
                <p className="text-sm">주말: <span className="font-bold">₩{mockData.weeklySales.lastWeek.weekend.toLocaleString()}</span></p>
              </div>
            </div>
            <div>
              <h4 className="text-xs text-gray-400">금주</h4>
              <div className="mt-1">
                <p className="text-sm">평일: <span className="font-bold">₩{mockData.weeklySales.thisWeek.weekday.toLocaleString()}</span></p>
                <p className="text-sm">주말: <span className="font-bold">₩{mockData.weeklySales.thisWeek.weekend.toLocaleString()}</span></p>
              </div>
            </div>
          </div>
          <div className="h-[120px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#2C3E50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
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