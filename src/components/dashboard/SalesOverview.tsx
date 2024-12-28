import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { OrderChannelSales } from "./OrderChannelSales";
import { SalesTable } from "./SalesTable";

const mockData = {
  dailySales: {
    "국수나무": [
      { date: "2024-01-01", sales: 8500000 },
      { date: "2024-01-02", sales: 9200000 },
      { date: "2024-01-03", sales: 3200000 },
      { date: "2024-01-04", sales: 9800000 },
      { date: "2024-01-05", sales: 8400000 },
      { date: "2024-01-06", sales: 7600000 },
      { date: "2024-01-07", sales: 8800000 },
      { date: "2024-01-08", sales: 9100000 },
    ],
    "도쿄스테이크": [
      { date: "2024-01-01", sales: 7800000 },
      { date: "2024-01-02", sales: 8500000 },
      { date: "2024-01-03", sales: 2800000 },
      { date: "2024-01-04", sales: 9500000 },
      { date: "2024-01-05", sales: 7900000 },
      { date: "2024-01-06", sales: 8200000 },
      { date: "2024-01-07", sales: 8900000 },
      { date: "2024-01-08", sales: 8700000 },
    ],
    "화평동왕냉면": [
      { date: "2024-01-01", sales: 7200000 },
      { date: "2024-01-02", sales: 7800000 },
      { date: "2024-01-03", sales: 2500000 },
      { date: "2024-01-04", sales: 9200000 },
      { date: "2024-01-05", sales: 7500000 },
      { date: "2024-01-06", sales: 7800000 },
      { date: "2024-01-07", sales: 8300000 },
      { date: "2024-01-08", sales: 8100000 },
    ]
  },
  weeklySales: {
    lastWeek: {
      weekday: 8500000,
      weekend: 3500000,
    },
    thisWeek: {
      weekday: 9200000,
      weekend: 4100000,
    }
  },
  monthlySales: {
    lastMonth: {
      weekday: 35000000,
      weekend: 15000000,
    },
    thisMonth: {
      weekday: 38000000,
      weekend: 17000000,
    }
  }
};

const formatCurrency = (value: number) => `₩${value.toLocaleString()}`;
const formatGraphValue = (value: number) => Math.floor(value / 10000);

const weeklyComparisonData = [
  {
    period: "전주 평일",
    sales: formatGraphValue(mockData.weeklySales.lastWeek.weekday),
  },
  {
    period: "전주 주말",
    sales: formatGraphValue(mockData.weeklySales.lastWeek.weekend),
  },
  {
    period: "금주 평일",
    sales: formatGraphValue(mockData.weeklySales.thisWeek.weekday),
  },
  {
    period: "금주 주말",
    sales: formatGraphValue(mockData.weeklySales.thisWeek.weekend),
  },
];

const monthlyComparisonData = [
  {
    period: "전월 평일",
    sales: formatGraphValue(mockData.monthlySales.lastMonth.weekday),
  },
  {
    period: "전월 주말",
    sales: formatGraphValue(mockData.monthlySales.lastMonth.weekend),
  },
  {
    period: "금월 평일",
    sales: formatGraphValue(mockData.monthlySales.thisMonth.weekday),
  },
  {
    period: "금월 주말",
    sales: formatGraphValue(mockData.monthlySales.thisMonth.weekend),
  },
];

const CHART_COLORS = {
  primary: "#8B5CF6",
  secondary: "#D946EF",
  gradient: ["#0EA5E9", "#8B5CF6"],
};

export const SalesOverview = () => {
  const [selectedStore, setSelectedStore] = useState<string>("국수나무");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-white">
          <h3 className="text-sm font-medium text-gray-500">어제 매출</h3>
          <p className="text-2xl font-bold mt-2">{formatCurrency(1500000)}</p>
          <span className="text-sm text-success-dark">+12.5%</span>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-white">
          <h3 className="text-sm font-medium text-gray-500">오늘 매출</h3>
          <p className="text-2xl font-bold mt-2">{formatCurrency(1800000)}</p>
          <span className="text-sm text-success-dark">+20%</span>
        </Card>
        <Card className="p-4 col-span-2 bg-gradient-to-br from-violet-50 to-white">
          <h3 className="text-sm font-medium text-gray-500">주간 매출</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <h4 className="text-xs text-gray-400">전주</h4>
              <div className="mt-1">
                <p className="text-sm">평일: <span className="font-bold">{formatCurrency(mockData.weeklySales.lastWeek.weekday)}</span></p>
                <p className="text-sm">주말: <span className="font-bold">{formatCurrency(mockData.weeklySales.lastWeek.weekend)}</span></p>
              </div>
            </div>
            <div>
              <h4 className="text-xs text-gray-400">금주</h4>
              <div className="mt-1">
                <p className="text-sm">평일: <span className="font-bold">{formatCurrency(mockData.weeklySales.thisWeek.weekday)}</span></p>
                <p className="text-sm">주말: <span className="font-bold">{formatCurrency(mockData.weeklySales.thisWeek.weekend)}</span></p>
              </div>
            </div>
          </div>
          <div className="h-[120px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="period" stroke="#6B7280" />
                <YAxis 
                  stroke="#6B7280"
                  tickFormatter={(value) => `${value}`}
                  label={{ value: '만원', angle: -90, position: 'insideLeft', offset: 0 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}만원`, "매출"]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                  }}
                />
                <Bar dataKey="sales" fill={CHART_COLORS.primary}>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-4 col-span-2 bg-gradient-to-br from-pink-50 to-white">
        <h3 className="text-sm font-medium text-gray-500">월간 매출</h3>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <h4 className="text-xs text-gray-400">전월</h4>
            <div className="mt-1">
              <p className="text-sm">평일: <span className="font-bold">{formatCurrency(mockData.monthlySales.lastMonth.weekday)}</span></p>
              <p className="text-sm">주말: <span className="font-bold">{formatCurrency(mockData.monthlySales.lastMonth.weekend)}</span></p>
            </div>
          </div>
          <div>
            <h4 className="text-xs text-gray-400">금월</h4>
            <div className="mt-1">
              <p className="text-sm">평일: <span className="font-bold">{formatCurrency(mockData.monthlySales.thisMonth.weekday)}</span></p>
              <p className="text-sm">주말: <span className="font-bold">{formatCurrency(mockData.monthlySales.thisMonth.weekend)}</span></p>
            </div>
          </div>
        </div>
        <div className="h-[120px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="period" stroke="#6B7280" />
              <YAxis 
                stroke="#6B7280"
                tickFormatter={(value) => `${value}`}
                label={{ value: '만원', angle: -90, position: 'insideLeft', offset: 0 }}
              />
              <Tooltip 
                formatter={(value) => [`${value}만원`, "매출"]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                }}
              />
              <Bar dataKey="sales" fill={CHART_COLORS.secondary}>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">매출 추이</h3>
          <Select value={selectedStore} onValueChange={setSelectedStore}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="매장 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="국수나무">국수나무</SelectItem>
              <SelectItem value="도쿄스테이크">도쿄스테이크</SelectItem>
              <SelectItem value="화평동왕냉면">화평동왕냉면</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={mockData.dailySales[selectedStore].map(item => ({
                ...item,
                sales: formatGraphValue(item.sales)
              }))}
            >
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS.gradient[0]} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={CHART_COLORS.gradient[1]} stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis 
                stroke="#6B7280"
                domain={[0, 1000]}
                tickFormatter={(value) => `${value}`}
                label={{ value: '만원', angle: -90, position: 'insideLeft', offset: 0 }}
              />
              <Tooltip
                formatter={(value) => [`${value}만원`, "매출"]}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="url(#salesGradient)"
                strokeWidth={3}
                dot={{ fill: CHART_COLORS.gradient[0], strokeWidth: 2 }}
                activeDot={{ r: 6, fill: CHART_COLORS.gradient[0] }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <OrderChannelSales />
      <SalesTable />
    </div>
  );
};
