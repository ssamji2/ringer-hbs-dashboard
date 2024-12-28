import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { StoreReviewTable } from "./StoreReviewTable";

const positiveReviewData = [
  { date: "09.16 월 ~", count: 36 },
  { date: "09.23 월 ~", count: 172 },
  { date: "09.30 월 ~", count: 239 },
  { date: "10.07 월 ~", count: 174 },
  { date: "10.14 월 ~", count: 167 },
  { date: "10.21 월 ~", count: 36 },
];

const negativeReviewData = [
  { date: "09.16 월 ~", count: 2 },
  { date: "09.23 월 ~", count: 10 },
  { date: "09.30 월 ~", count: 9 },
  { date: "10.07 월 ~", count: 3 },
  { date: "10.14 월 ~", count: 5 },
  { date: "10.21 월 ~", count: 0 },
];

const ratingDistribution = [
  { rating: "5.0", count: 31, brand: "국수나무" },
  { rating: "4.9", count: 28, brand: "국수나무" },
  { rating: "4.8", count: 25, brand: "국수나무" },
  { rating: "4.7", count: 23, brand: "국수나무" },
  { rating: "4.6", count: 20, brand: "국수나무" },
  { rating: "5.0", count: 35, brand: "도쿄스테이크" },
  { rating: "4.9", count: 30, brand: "도쿄스테이크" },
  { rating: "4.8", count: 28, brand: "도쿄스테이크" },
  { rating: "5.0", count: 33, brand: "화평동왕냉면" },
  { rating: "4.9", count: 29, brand: "화평동왕냉면" },
  { rating: "4.8", count: 26, brand: "화평동왕냉면" },
];

export const ReviewOverview = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
          <TabsTrigger
            value="all"
            className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 pb-2"
          >
            전체 리뷰 현황
          </TabsTrigger>
          <TabsTrigger
            value="byStore"
            className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 pb-2"
          >
            매장별 리뷰
          </TabsTrigger>
          <TabsTrigger
            value="byMenu"
            className="border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none px-6 pb-2"
          >
            메뉴별 리뷰
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">최근 30일간의 평점 및 리뷰현황</h2>
              <p className="text-sm text-gray-500">(24.09.22 ~ 24.10.21)</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6">
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold">4.8</h3>
                  <p className="text-sm text-gray-500">평균 평점</p>
                  <p className="text-xs text-gray-400">- 지난 30일 대비</p>
                </div>
              </Card>
              <Card className="p-6">
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold">849</h3>
                  <p className="text-sm text-gray-500">리뷰 수</p>
                  <p className="text-xs text-success">+0.1% 지난 30일 대비</p>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">전체 평점별 매장 분포도</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={ratingDistribution}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="rating" type="category" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#7C3AED" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">긍정 리뷰 수 추이</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={positiveReviewData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#7C3AED"
                        fill="#7C3AED"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">부정 리뷰 수 추이</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={negativeReviewData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#EF4444"
                        fill="#EF4444"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="byStore" className="mt-6">
          <StoreReviewTable />
        </TabsContent>

        <TabsContent value="byMenu" className="mt-6">
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">메뉴별 리뷰 데이터 준비 중</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};