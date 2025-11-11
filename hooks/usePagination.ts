import { useState, useCallback } from "react";

interface UsePaginationProps {
  initialPage?: number;
  initialPageSize?: number;
  totalItems?: number;
}

interface UsePaginationReturn {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  getPaginationProps: () => {
    page: number;
    pageSize: number;
    from: number;
    to: number;
  };
}

export function usePagination({
  initialPage = 1,
  initialPageSize = 10,
  totalItems: initialTotalItems = 0,
}: UsePaginationProps = {}): UsePaginationReturn {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalItems, setTotalItems] = useState(initialTotalItems);

  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToPage = useCallback(
    (pageNum: number) => {
      setPage(Math.min(Math.max(1, pageNum), totalPages));
    },
    [totalPages]
  );

  const handleSetPageSize = useCallback((size: number) => {
    setPageSize(size);
    setPage(1);
  }, []);

  const getPaginationProps = useCallback(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    return { page, pageSize, from, to };
  }, [page, pageSize]);

  return {
    page,
    pageSize,
    totalItems,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setPageSize: handleSetPageSize,
    setTotalItems,
    getPaginationProps,
  };
}
