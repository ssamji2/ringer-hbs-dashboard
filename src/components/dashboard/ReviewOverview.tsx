import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { MenuReviewTable } from "./MenuReviewTable";
import { ReviewList } from "./ReviewList";
import { brands } from "@/data/reviewData";
import { positiveReviews, negativeReviews } from "@/data/reviewListData";

const getFilteredData = (data: any[], brand: string) => {
  if (brand === "전체") return data;
  return data.filter(item => item.brand === brand);
};

const positiveReviewData = [
  { date: "09.16 월 ~", count: 36, brand: "국수나무" },
  { date: "09.23 월 ~", count: 172, brand: "국수나무" },
  { date: "09.30 월 ~", count: 239, brand: "국수나무" },
  { date: "10.07 월 ~", count: 174, brand: "국수나무" },
  { date: "10.14 월 ~", count: 167, brand: "국수나무" },
  { date: "10.21 월 ~", count: 36, brand: "국수나무" },
  { date: "09.16 월 ~", count: 42, brand: "도쿄스테이크" },
  { date: "09.23 월 ~", count: 158, brand: "도쿄스테이크" },
  { date: "09.30 월 ~", count: 220, brand: "도쿄스테이크" },
  { date: "10.07 월 ~", count: 185, brand: "도쿄스테이크" },
  { date: "10.14 월 ~", count: 178, brand: "도쿄스테이크" },
  { date: "10.21 월 ~", count: 45, brand: "도쿄스테이크" },
  { date: "09.16 월 ~", count: 38, brand: "화평동왕냉면" },
  { date: "09.23 월 ~", count: 165, brand: "화평동왕냉면" },
  { date: "09.30 월 ~", count: 228, brand: "화평동왕냉면" },
  { date: "10.07 월 ~", count: 180, brand: "화평동왕냉면" },
  { date: "10.14 월 ~", count: 170, brand: "화평동왕냉면" },
  { date: "10.21 월 ~", count: 40, brand: "화평동왕냉면" },
];

const negativeReviewData = [
  { date: "09.16 월 ~", count: 2, brand: "국수나무" },
  { date: "09.23 월 ~", count: 10, brand: "국수나무" },
  { date: "09.30 월 ~", count: 9, brand: "국수나무" },
  { date: "10.07 월 ~", count: 3, brand: "국수나무" },
  { date: "10.14 월 ~", count: 5, brand: "국수나무" },
  { date: "10.21 월 ~", count: 0, brand: "국수나무" },
  { date: "09.16 월 ~", count: 3, brand: "도쿄스테이크" },
  { date: "09.23 월 ~", count: 8, brand: "도쿄스테이크" },
  { date: "09.30 월 ~", count: 7, brand: "도쿄스테이크" },
  { date: "10.07 월 ~", count: 4, brand: "도쿄스테이크" },
  { date: "10.14 월 ~", count: 6, brand: "도쿄스테이크" },
  { date: "10.21 월 ~", count: 1, brand: "도쿄스테이크" },
  { date: "09.16 월 ~", count: 2, brand: "화평동왕냉면" },
  { date: "09.23 월 ~", count: 9, brand: "화평동왕냉면" },
  { date: "09.30 월 ~", count: 8, brand: "화평동왕냉면" },
  { date: "10.07 월 ~", count: 3, brand: "화평동왕냉면" },
  { date: "10.14 월 ~", count: 4, brand: "화평동왕냉면" },
  { date: "10.21 월 ~", count: 1, brand: "화평동왕냉면" },
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

const getBrandStats = (brand: string) => {
  const filteredRatings = getFilteredData(ratingDistribution, brand);
  const avgRating = (filteredRatings.reduce((acc, curr) => acc + (parseFloat(curr.rating) * curr.count), 0) / 
    filteredRatings.reduce((acc, curr) => acc + curr.count, 0)).toFixed(1);
  
  const filteredPositive = getFilteredData(positiveReviewData, brand);
  const filteredNegative = getFilteredData(negativeReviewData, brand);
  
  const totalReviews = filteredPositive.reduce((acc, curr) => acc + curr.count, 0) +
    filteredNegative.reduce((acc, curr) => acc + curr.count, 0);

  return {
    avgRating,
    totalReviews
  };
};

export const ReviewOverview = () => {
  const [selectedBrand, setSelectedBrand] = useState("전체");
  const stats = getBrandStats(selectedBrand);

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
              <div className="flex items-center gap-4">
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="브랜드 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500">(24.09.22 ~ 24.10.21)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6">
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold">{stats.avgRating}</h3>
                  <p className="text-sm text-gray-500">평균 평점</p>
                  <p className="text-xs text-gray-400">- 지난 30일 대비</p>
                </div>
              </Card>
              <Card className="p-6">
                <div className="space-y-2">
                  <h3 className="text-4xl font-bold">{stats.totalReviews}</h3>
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
                    data={getFilteredData(ratingDistribution, selectedBrand)}
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
                    <LineChart data={getFilteredData(positiveReviewData, selectedBrand)}>
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
                    <LineChart data={getFilteredData(negativeReviewData, selectedBrand)}>
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

            <div className="space-y-6">
              <Card className="p-6">
                <ReviewList reviews={positiveReviews} title="최근 30일간의 긍정 리뷰 리스트" />
              </Card>
              <Card className="p-6">
                <ReviewList reviews={negativeReviews} title="최근 30일간의 부정 리뷰 리스트" />
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="byStore" className="mt-6">
          <StoreReviewTable />
        </TabsContent>

        <TabsContent value="byMenu" className="mt-6">
          <MenuReviewTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};
