export const menuCategories = ["전체", "국수류", "스테이크류", "냉면류"];

export const menuReviews = [
  // 국수류
  { category: "국수류", menu: "해물국수", avgRating: 4.8, reviewCount: 156, positiveRate: "94%", negativeRate: "6%" },
  { category: "국수류", menu: "바지락국수", avgRating: 4.7, reviewCount: 134, positiveRate: "92%", negativeRate: "8%" },
  { category: "국수류", menu: "얼큰국수", avgRating: 4.9, reviewCount: 178, positiveRate: "96%", negativeRate: "4%" },
  { category: "국수류", menu: "비빔국수", avgRating: 4.8, reviewCount: 145, positiveRate: "95%", negativeRate: "5%" },
  
  // 스테이크류
  { category: "스테이크류", menu: "등심스테이크", avgRating: 4.9, reviewCount: 198, positiveRate: "97%", negativeRate: "3%" },
  { category: "스테이크류", menu: "안심스테이크", avgRating: 4.8, reviewCount: 167, positiveRate: "95%", negativeRate: "5%" },
  { category: "스테이크류", menu: "립아이스테이크", avgRating: 4.7, reviewCount: 145, positiveRate: "93%", negativeRate: "7%" },
  
  // 냉면류
  { category: "냉면류", menu: "물냉면", avgRating: 4.8, reviewCount: 189, positiveRate: "96%", negativeRate: "4%" },
  { category: "냉면류", menu: "비빔냉면", avgRating: 4.7, reviewCount: 156, positiveRate: "94%", negativeRate: "6%" },
  { category: "냉면류", menu: "회냉면", avgRating: 4.9, reviewCount: 134, positiveRate: "95%", negativeRate: "5%" },
];

export const getMenusByCategory = (category: string) => {
  if (category === "전체") {
    return menuReviews;
  }
  return menuReviews.filter(review => review.category === category);
};