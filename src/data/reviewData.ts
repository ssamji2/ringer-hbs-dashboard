export const storeReviews = [
  // 국수나무 지점들
  { brand: "국수나무", store: "국수나무 강남점", avgRating: 4.8, reviewCount: 125, positiveRate: "95%", negativeRate: "5%" },
  { brand: "국수나무", store: "국수나무 홍대점", avgRating: 4.9, reviewCount: 89, positiveRate: "97%", negativeRate: "3%" },
  { brand: "국수나무", store: "국수나무 신촌점", avgRating: 4.7, reviewCount: 156, positiveRate: "93%", negativeRate: "7%" },
  { brand: "국수나무", store: "국수나무 종로점", avgRating: 4.8, reviewCount: 112, positiveRate: "94%", negativeRate: "6%" },
  
  // 도쿄스테이크 지점들
  { brand: "도쿄스테이크", store: "도쿄스테이크 명동점", avgRating: 4.9, reviewCount: 178, positiveRate: "96%", negativeRate: "4%" },
  { brand: "도쿄스테이크", store: "도쿄스테이크 강남점", avgRating: 4.8, reviewCount: 145, positiveRate: "95%", negativeRate: "5%" },
  { brand: "도쿄스테이크", store: "도쿄스테이크 삼성점", avgRating: 4.7, reviewCount: 134, positiveRate: "92%", negativeRate: "8%" },
  
  // 화평동왕냉면 지점들
  { brand: "화평동왕냉면", store: "화평동왕냉면 압구정점", avgRating: 4.8, reviewCount: 167, positiveRate: "94%", negativeRate: "6%" },
  { brand: "화평동왕냉면", store: "화평동왕냉면 서초점", avgRating: 4.9, reviewCount: 143, positiveRate: "97%", negativeRate: "3%" },
  { brand: "화평동왕냉면", store: "화평동왕냉면 잠실점", avgRating: 4.7, reviewCount: 156, positiveRate: "93%", negativeRate: "7%" },
];

export const brands = ["국수나무", "도쿄스테이크", "화평동왕냉면"];

export const getStoresByBrand = (brand: string) => {
  return storeReviews.filter(review => review.brand === brand);
};