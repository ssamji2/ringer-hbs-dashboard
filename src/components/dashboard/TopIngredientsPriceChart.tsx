import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";

type PriceData = {
  time: string;
  [key: string]: string | number;
};

const CHART_COLORS = {
  쿠팡: {
    gradient: ["#0EA5E9", "#8B5CF6"],
    background: "from-blue-50 to-violet-50",
    stroke: "#8B5CF6"
  },
  마켓대리: {
    gradient: ["#F97316", "#D946EF"],
    background: "from-orange-50 to-pink-50",
    stroke: "#D946EF"
  },
  쿠거: {
    gradient: ["#10B981", "#6366F1"],
    background: "from-emerald-50 to-indigo-50",
    stroke: "#6366F1"
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
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={priceHistory}>
          <defs>
            <linearGradient id={`gradient-${channel}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.gradient[0]} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={colors.gradient[1]} stopOpacity={0}/>
            </linearGradient>
          </defs>
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
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-sm text-gray-600">{value}</span>}
          />
          {channelData.map((ingredient, index) => (
            <Line
              key={ingredient.name}
              type="monotone"
              dataKey={ingredient.name}
              stroke={colors.stroke}
              strokeWidth={2}
              dot={{ fill: colors.gradient[0], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: colors.gradient[0] }}
              name={ingredient.name}
              strokeOpacity={(5 - index) / 5}
              fill={`url(#gradient-${channel})`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
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