import { useState } from "react";

interface usePaginationOptions<T> {
  totalCount: number
  pageSize: number
  siblingCount?: number
}

export const DOTS = -1

export const usePagination = <T>({ totalCount, pageSize }: usePaginationOptions<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const lastPage = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, lastPage)))
  }

  const handleNext = () => {
    handlePageChange(currentPage + 1)
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1)
  };

  return { handleNext, handlePrevious, handlePageChange, currentPage, lastPage, startIndex, endIndex };
}