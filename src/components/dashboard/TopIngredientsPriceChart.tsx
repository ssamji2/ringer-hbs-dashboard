import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

type PriceData = {
  time: string;
  [key: string]: string | number;
};

const INGREDIENT_COLORS = {
  "양파": "#8B5CF6",  // 보라색
  "대파": "#10B981",  // 녹색
  "무": "#F97316",    // 주황색
  "배추": "#0EA5E9",  // 파란색
  "감자": "#D946EF",  // 분홍색
  "당근": "#F43F5E",  // 빨간색
  "마늘": "#14B8A6",  // 청록색
  "생강": "#EAB308",  // 노란색
  "고구마": "#EC4899", // 분홍색
  "양배추": "#6366F1", // 인디고
};

const CHART_COLORS = {
  쿠팡: {
    gradient: ["#0EA5E9", "#8B5CF6"],
    background: "from-blue-50 to-violet-50",
  },
  마켓대리: {
    gradient: ["#F97316", "#D946EF"],
    background: "from-orange-50 to-pink-50",
  },
  쿠거: {
    gradient: ["#10B981", "#6366F1"],
    background: "from-emerald-50 to-indigo-50",
  }
};

const generateRandomPriceChange = (basePrice: number) => {
  const changePercent = (Math.random() - 0.5) * 0.02;
  return Math.round(basePrice * (1 + changePercent));
};

const PriceChart = ({ 
  data,
  channel
}: { 
  data: { name: string; currentPrice: number; channel: string; }[];
  channel: string;
}) => {
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const channelData = data.filter(item => item.channel === channel)
    .sort((a, b) => b.currentPrice - a.currentPrice)
    .slice(0, 5);

  useEffect(() => {
    const initialData: PriceData = {
      time: new Date().toLocaleTimeString(),
    };
    channelData.forEach((ingredient) => {
      initialData[ingredient.name] = ingredient.currentPrice;
    });
    setPriceHistory([initialData]);

    const interval = setInterval(() => {
      setPriceHistory((prev) => {
        const newData: PriceData = {
          time: new Date().toLocaleTimeString(),
        };
        channelData.forEach((ingredient) => {
          const lastPrice = prev[prev.length - 1][ingredient.name] as number;
          newData[ingredient.name] = generateRandomPriceChange(lastPrice);
        });
        return [...prev.slice(-10), newData];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [data, channel]);

  const colors = CHART_COLORS[channel as keyof typeof CHART_COLORS];

  return (
    <div className="space-y-4">
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={priceHistory}
            margin={{ top: 60, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.4} />
            <XAxis 
              dataKey="time" 
              stroke="#6B7280"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis
              stroke="#6B7280"
              tickFormatter={(value) => `₩${value.toLocaleString()}`}
              domain={['auto', 'auto']}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => [`₩${value.toLocaleString()}`, "가격"]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
              labelStyle={{ color: '#6B7280' }}
            />
            {channelData.map((ingredient) => {
              const color = INGREDIENT_COLORS[ingredient.name as keyof typeof INGREDIENT_COLORS];
              return (
                <Line
                  key={ingredient.name}
                  type="monotone"
                  dataKey={ingredient.name}
                  stroke={color}
                  strokeWidth={2}
                  dot={{ 
                    fill: color,
                    strokeWidth: 2,
                    r: 4 
                  }}
                  activeDot={{ 
                    r: 6,
                    fill: color
                  }}
                  name={ingredient.name}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center items-center px-4 mt-4">
        {channelData.map((ingredient) => {
          const color = INGREDIENT_COLORS[ingredient.name as keyof typeof INGREDIENT_COLORS];
          return (
            <div 
              key={ingredient.name}
              className="flex items-center gap-2"
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-gray-600">
                {ingredient.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const TopIngredientsPriceChart = ({ 
  data 
}: { 
  data: { name: string; currentPrice: number; channel: string; }[] 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className={`p-6 bg-gradient-to-br ${CHART_COLORS.쿠팡.background} shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">쿠팡 TOP 5 식자재 가격 동향</h3>
        <PriceChart data={data} channel="쿠팡" />
      </Card>
      
      <Card className={`p-6 bg-gradient-to-br ${CHART_COLORS.마켓대리.background} shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">마켓대리 TOP 5 식자재 가격 동향</h3>
        <PriceChart data={data} channel="마켓대리" />
      </Card>

      <Card className={`p-6 bg-gradient-to-br ${CHART_COLORS.쿠거.background} shadow-sm hover:shadow-md transition-shadow duration-200`}>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">쿠거 TOP 5 식자재 가격 동향</h3>
        <PriceChart data={data} channel="쿠거" />
      </Card>
    </div>
  );
};