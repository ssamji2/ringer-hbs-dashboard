import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";

type PriceData = {
  time: string;
  [key: string]: string | number;
};

const CHART_COLORS = [
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#6366F1",
];

const generateRandomPriceChange = (basePrice: number) => {
  const changePercent = (Math.random() - 0.5) * 0.02; // -1% to +1% change
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
  const channelData = data.filter(item => item.channel === channel).slice(0, 5);

  useEffect(() => {
    // Initialize with current prices
    const initialData: PriceData = {
      time: new Date().toLocaleTimeString(),
    };
    channelData.forEach((ingredient) => {
      initialData[ingredient.name] = ingredient.currentPrice;
    });
    setPriceHistory([initialData]);

    // Update prices every 3 seconds
    const interval = setInterval(() => {
      setPriceHistory((prev) => {
        const newData: PriceData = {
          time: new Date().toLocaleTimeString(),
        };
        channelData.forEach((ingredient) => {
          const lastPrice = prev[prev.length - 1][ingredient.name] as number;
          newData[ingredient.name] = generateRandomPriceChange(lastPrice);
        });
        return [...prev.slice(-10), newData]; // Keep last 10 data points
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [data, channel]);

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={priceHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            stroke="#6B7280"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            stroke="#6B7280"
            tickFormatter={(value) => `₩${value.toLocaleString()}`}
            domain={['auto', 'auto']}
          />
          <Tooltip
            formatter={(value: number) => [`₩${value.toLocaleString()}`, "가격"]}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
            }}
          />
          <Legend />
          {channelData.map((ingredient, index) => (
            <Line
              key={ingredient.name}
              type="monotone"
              dataKey={ingredient.name}
              stroke={CHART_COLORS[index]}
              strokeWidth={2}
              dot={false}
              name={ingredient.name}
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 bg-gradient-to-br from-violet-50 to-white">
        <h3 className="text-lg font-semibold mb-4">쿠팡 TOP 5 식자재 가격 동향</h3>
        <PriceChart data={data} channel="쿠팡" />
      </Card>
      
      <Card className="p-6 bg-gradient-to-br from-rose-50 to-white">
        <h3 className="text-lg font-semibold mb-4">마켓대리 TOP 5 식자재 가격 동향</h3>
        <PriceChart data={data} channel="마켓대리" />
      </Card>
    </div>
  );
};