import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Review } from "@/data/reviewListData";
import { Navigation2, ShoppingBag, Package } from "lucide-react";

interface ReviewListProps {
  reviews: Review[];
  title: string;
}

const ChannelIcon = ({ channel }: { channel: Review["channel"] }) => {
  switch (channel) {
    case "N플레이스":
      return <Navigation2 className="inline-block w-4 h-4 mr-1" />;
    case "배민":
      return <ShoppingBag className="inline-block w-4 h-4 mr-1" />;
    case "쿠팡이츠":
      return <Package className="inline-block w-4 h-4 mr-1" />;
    default:
      return null;
  }
};

export const ReviewList = ({ reviews, title }: ReviewListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const getCurrentPageData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return reviews.slice(start, end);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>브랜드명</TableHead>
              <TableHead>매장명</TableHead>
              <TableHead>채널</TableHead>
              <TableHead>일자</TableHead>
              <TableHead>평점</TableHead>
              <TableHead className="w-1/3">고객 리뷰</TableHead>
              <TableHead>URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getCurrentPageData().map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.brand}</TableCell>
                <TableCell>{review.store}</TableCell>
                <TableCell>
                  <span className="flex items-center">
                    <ChannelIcon channel={review.channel} />
                    {review.channel}
                  </span>
                </TableCell>
                <TableCell>{review.date}</TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>{review.review}</TableCell>
                <TableCell>
                  <a href={review.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    리뷰 보기
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
                className="cursor-pointer"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};