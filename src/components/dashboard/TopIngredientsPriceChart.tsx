import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useEffect } from "react";

type PriceData = {
  time: string;
  [key: string]: string | number;
};

type TopIngredient = {
  name: string;
  currentPrice: number;
  channel: string;
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

export const TopIngredientsPriceChart = ({ 
  data 
}: { 
  data: { name: string; currentPrice: number; channel: string; }[] 
}) => {
  const [priceHistory, setPriceHistory] = useState<PriceData[]>([]);
  const topIngredients = data.slice(0, 5);

  useEffect(() => {
    // Initialize with current prices
    const initialData: PriceData = {
      time: new Date().toLocaleTimeString(),
    };
    topIngredients.forEach((ingredient) => {
      initialData[ingredient.name] = ingredient.currentPrice;
    });
    setPriceHistory([initialData]);

    // Update prices every 3 seconds
    const interval = setInterval(() => {
      setPriceHistory((prev) => {
        const newData: PriceData = {
          time: new Date().toLocaleTimeString(),
        };
        topIngredients.forEach((ingredient) => {
          const lastPrice = prev[prev.length - 1][ingredient.name] as number;
          newData[ingredient.name] = generateRandomPriceChange(lastPrice);
        });
        return [...prev.slice(-10), newData]; // Keep last 10 data points
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <Card className="p-6 bg-gradient-to-br from-violet-50 to-white">
      <h3 className="text-lg font-semibold mb-4">실시간 TOP 5 식자재 가격 동향</h3>
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
            {topIngredients.map((ingredient, index) => (
              <Line
                key={ingredient.name}
                type="monotone"
                dataKey={ingredient.name}
                stroke={CHART_COLORS[index]}
                strokeWidth={2}
                dot={false}
                name={`${ingredient.name} (${ingredient.channel})`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};