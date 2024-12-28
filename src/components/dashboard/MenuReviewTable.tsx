import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { menuCategories, menuReviews, getMenusByCategory } from "@/data/menuReviewData";
import { ReviewList } from "./ReviewList";
import { positiveReviews, negativeReviews } from "@/data/reviewListData";

export const MenuReviewTable = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const filteredMenus = getMenusByCategory(selectedCategory);

  // 메뉴 카테고리에 따른 리뷰 필터링
  const getReviewsByCategory = (reviews: typeof positiveReviews) => {
    if (selectedCategory === "전체") return reviews;
    
    // 메뉴 카테고리에 해당하는 브랜드들 찾기
    const brandsInCategory = new Set(
      menuReviews
        .filter(menu => menu.category === selectedCategory)
        .map(menu => {
          if (menu.category === "국수류") return "국수나무";
          if (menu.category === "스테이크류") return "도쿄스테이크";
          if (menu.category === "냉면류") return "화평동왕냉면";
          return "";
        })
    );

    return reviews.filter(review => brandsInCategory.has(review.brand));
  };

  const filteredPositiveReviews = getReviewsByCategory(positiveReviews);
  const filteredNegativeReviews = getReviewsByCategory(negativeReviews);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">메뉴별 리뷰 분포</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            {menuCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">카테고리</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">메뉴</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">평균 평점</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">전체 리뷰수</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">긍정 리뷰비율</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">부정 리뷰비율</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMenus.map((review, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900">{review.category}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">{review.menu}</td>
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