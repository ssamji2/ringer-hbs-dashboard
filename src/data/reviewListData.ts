export type Review = {
  id: string;
  brand: string;
  store: string;
  date: string;
  rating: number;
  review: string;
  url: string;
};

export const positiveReviews: Review[] = [
  {
    id: "1",
    brand: "국수나무",
    store: "강남점",
    date: "2024-02-15",
    rating: 5,
    review: "면이 쫄깃하고 국물이 진해요. 직원분들도 친절하셔서 좋았습니다!",
    url: "https://example.com/review/1"
  },
  {
    id: "2",
    brand: "도쿄스테이크",
    store: "명동점",
    date: "2024-02-14",
    rating: 4.5,
    review: "스테이크가 부드럽고 맛있어요. 소스도 특별했습니다.",
    url: "https://example.com/review/2"
  },
  {
    id: "3",
    brand: "화평동왕냉면",
    store: "압구정점",
    date: "2024-02-13",
    rating: 5,
    review: "냉면 육수가 시원하고 깔끔해요. 고기도 푸짐하게 나와서 좋았어요.",
    url: "https://example.com/review/3"
  },
  {
    id: "4",
    brand: "국수나무",
    store: "홍대점",
    date: "2024-02-12",
    rating: 4.5,
    review: "가성비 좋고 맛있어요. 또 방문하고 싶은 곳입니다.",
    url: "https://example.com/review/4"
  },
  {
    id: "5",
    brand: "도쿄스테이크",
    store: "강남점",
    date: "2024-02-11",
    rating: 5,
    review: "스테이크가 두툼하고 미디움으로 잘 구워주셨어요.",
    url: "https://example.com/review/5"
  },
  {
    id: "6",
    brand: "화평동왕냉면",
    store: "서초점",
    date: "2024-02-10",
    rating: 4.5,
    review: "비빔냉면이 정말 맛있어요. 양도 많아서 좋았습니다.",
    url: "https://example.com/review/6"
  },
  {
    id: "7",
    brand: "국수나무",
    store: "신촌점",
    date: "2024-02-09",
    rating: 5,
    review: "매장이 깔끔하고 서비스가 좋아요. 음식도 맛있습니다.",
    url: "https://example.com/review/7"
  },
  {
    id: "8",
    brand: "도쿄스테이크",
    store: "삼성점",
    date: "2024-02-08",
    rating: 4.5,
    review: "스테이크 퀄리티가 좋아요. 직원분들도 친절하십니다.",
    url: "https://example.com/review/8"
  },
  {
    id: "9",
    brand: "화평동왕냉면",
    store: "잠실점",
    date: "2024-02-07",
    rating: 5,
    review: "물냉면 육수가 끝내줍니다. 항상 만족하면서 먹어요.",
    url: "https://example.com/review/9"
  },
  {
    id: "10",
    brand: "국수나무",
    store: "종로점",
    date: "2024-02-06",
    rating: 4.5,
    review: "국수가 정말 맛있어요. 사이드 메뉴도 다양해서 좋았어요.",
    url: "https://example.com/review/10"
  }
];

export const negativeReviews: Review[] = [
  {
    id: "1",
    brand: "국수나무",
    store: "강남점",
    date: "2024-02-15",
    rating: 2,
    review: "오늘은 면이 너무 퍼졌어요. 기다리는 시간도 길었습니다.",
    url: "https://example.com/review/n1"
  },
  {
    id: "2",
    brand: "도쿄스테이크",
    store: "명동점",
    date: "2024-02-14",
    rating: 2.5,
    review: "스테이크가 너무 질겼어요. 가격대비 실망스러웠습니다.",
    url: "https://example.com/review/n2"
  },
  {
    id: "3",
    brand: "화평동왕냉면",
    store: "압구정점",
    date: "2024-02-13",
    rating: 2,
    review: "육수가 너무 싱거웠어요. 양도 적은 것 같아요.",
    url: "https://example.com/review/n3"
  },
  {
    id: "4",
    brand: "국수나무",
    store: "홍대점",
    date: "2024-02-12",
    rating: 2.5,
    review: "위생 상태가 좋지 않았어요. 개선이 필요해 보입니다.",
    url: "https://example.com/review/n4"
  },
  {
    id: "5",
    brand: "도쿄스테이크",
    store: "강남점",
    date: "2024-02-11",
    rating: 2,
    review: "주문한 굽기와 다르게 나왔어요. 직원 응대도 불친절했습니다.",
    url: "https://example.com/review/n5"
  },
  {
    id: "6",
    brand: "화평동왕냉면",
    store: "서초점",
    date: "2024-02-10",
    rating: 2.5,
    review: "면이 너무 불어있었어요. 기대했던 맛이 아니었습니다.",
    url: "https://example.com/review/n6"
  },
  {
    id: "7",
    brand: "국수나무",
    store: "신촌점",
    date: "2024-02-09",
    rating: 2,
    review: "대기 시간이 너무 길었어요. 음식도 미지근했습니다.",
    url: "https://example.com/review/n7"
  },
  {
    id: "8",
    brand: "도쿄스테이크",
    store: "삼성점",
    date: "2024-02-08",
    rating: 2.5,
    review: "가격이 너무 비싼데 비해 맛이 평범했어요.",
    url: "https://example.com/review/n8"
  },
  {
    id: "9",
    brand: "화평동왕냉면",
    store: "잠실점",
    date: "2024-02-07",
    rating: 2,
    review: "매장이 전반적으로 청결하지 않았어요.",
    url: "https://example.com/review/n9"
  },
  {
    id: "10",
    brand: "국수나무",
    store: "종로점",
    date: "2024-02-06",
    rating: 2.5,
    review: "음식이 늦게 나왔는데 맛도 별로였어요.",
    url: "https://example.com/review/n10"
  }
];