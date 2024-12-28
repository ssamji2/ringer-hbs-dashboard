import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { storeReviews, brands, getStoresByBrand } from "@/data/reviewData";
import { ReviewList } from "./ReviewList";
import { positiveReviews, negativeReviews } from "@/data/reviewListData";

export const StoreReviewTable = () => {
  const [selectedBrand, setSelectedBrand] = useState("전체");
  const filteredStores = getStoresByBrand(selectedBrand);

  const filteredPositiveReviews = selectedBrand === "전체" 
    ? positiveReviews 
    : positiveReviews.filter(review => review.brand === selectedBrand);

  const filteredNegativeReviews = selectedBrand === "전체"
    ? negativeReviews
    : negativeReviews.filter(review => review.brand === selectedBrand);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">매장별 리뷰 분포</h3>
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
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">브랜드</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">매장</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">평균 평점</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">전체 리뷰수</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">긍정 리뷰비율</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">부정 리뷰비율</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStores.map((review, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{review.brand}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{review.store}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{review.avgRating}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{review.reviewCount}</td>
                <td className="px-6 py-4 text-sm text-success">{review.positiveRate}</td>
                <td className="px-6 py-4 text-sm text-warning">{review.negativeRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <ReviewList reviews={filteredPositiveReviews} title="최근 30일간의 긍정 리뷰 리스트" />
        </Card>
        <Card className="p-6">
          <ReviewList reviews={filteredNegativeReviews} title="최근 30일간의 부정 리뷰 리스트" />
        </Card>
      </div>
    </div>
  );
};