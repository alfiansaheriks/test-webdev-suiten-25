import { Button } from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  const canPrevious = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className={`flex items-center justify-start py-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canPrevious}
        className="min-w-[100px] border-none shadow-none hover:bg-transparent bg-transparent"
      >
        <ChevronLeft className="h-10 w-10" />
        Previous
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canNext}
        className="min-w-[100px] border-none shadow-none hover:bg-transparent bg-transparent"
      >
        Next
        <ChevronRight className="h-10 w-10" />
      </Button>
    </div>
  );
}
