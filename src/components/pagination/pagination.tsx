// reference: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
import { useMemo } from 'react';
import {
  LeftArrow,
  PaginationContainer,
  PaginationItem,
  RightArrow,
} from './pagination.styled';

const DOTS = -1;

const range = (start: number, end: number) => {
  let length = end - start + 1;
  /*
    Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  siblingCount = 1,
}: PaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  const lastPage = paginationRange[paginationRange.length - 1];

  const handlePrevious = () => {
    onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <PaginationContainer>
      <PaginationItem disabled={currentPage === 1} onClick={handlePrevious}>
        <LeftArrow />
      </PaginationItem>
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <PaginationItem
              data-testid="pagination-item-dots"
              disabled
              key={`${pageNumber}-${i}`}
              onClick={() => onPageChange(Number(pageNumber))}
            >
              ...
            </PaginationItem>
          );
        }

        return (
          <PaginationItem
            data-testid="pagination-item-number"
            selected={currentPage === pageNumber}
            key={pageNumber}
            onClick={() => onPageChange(Number(pageNumber))}
          >
            {pageNumber}
          </PaginationItem>
        );
      })}
      <PaginationItem disabled={currentPage === lastPage} onClick={handleNext}>
        <RightArrow />
      </PaginationItem>
    </PaginationContainer>
  );
};
