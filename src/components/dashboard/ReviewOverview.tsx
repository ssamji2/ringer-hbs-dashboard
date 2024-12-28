import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockReviewData = {
  positiveReviews: [
    { date: "2024-01-03", "국수나무": 4.5, "도쿄스테이크": 4.2, "화평동왕냉면": 4.3 },
    { date: "2024-01-04", "국수나무": 4.6, "도쿄스테이크": 4.3, "화평동왕냉면": 4.4 },
    { date: "2024-01-05", "국수나무": 4.4, "도쿄스테이크": 4.4, "화평동왕냉면": 4.2 },
    { date: "2024-01-06", "국수나무": 4.7, "도쿄스테이크": 4.5, "화평동왕냉면": 4.5 },
    { date: "2024-01-07", "국수나무": 4.5, "도쿄스테이크": 4.3, "화평동왕냉면": 4.4 },
    { date: "2024-01-08", "국수나무": 4.6, "도쿄스테이크": 4.4, "화평동왕냉면": 4.3 },
  ],
};

export const ReviewOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">평균 평점</h3>
          <p className="text-2xl font-bold mt-2">4.5</p>
          <span className="text-sm text-success-dark">+0.2</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">전체 리뷰 수</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
          <span className="text-sm text-success-dark">+15%</span>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-500">부정 리뷰 수</h3>
          <p className="text-2xl font-bold mt-2">23</p>
          <span className="text-sm text-warning-dark">+2</span>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">브랜드별 평점 추이</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockReviewData.positiveReviews}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="국수나무"
                stroke="#2C3E50"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="도쿄스테이크"
                stroke="#E74C3C"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="화평동왕냉면"
                stroke="#27AE60"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};